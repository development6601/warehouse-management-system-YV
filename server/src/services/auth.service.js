import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import crypto from "crypto";
import { generateResetToken } from "../utils/token.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js";

//signup
export const signupService = async (data) => {
    const existinguser = await User.findOne({
        email: data.email
    })

    if (existinguser) {
        throw new Error("Email already exist")
    }
    const hashedPassword = await hashPassword(
        data.password
    )
    const user = await User.create({
        ...data,
        password: hashedPassword
    })

    return user
}

//login
export const loginService = async (email, password, ipAddress) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordMatch = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }

    const payload = {
        userId: user._id,
        role: user.role,
        tokenVersion: user.tokenVersion || 1,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await RefreshToken.create({
        user: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress,
    });

    return {
        user: {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};

//Refreshtoken 
export const refreshTokenService = async (token, ipAddress) => {
    const storedToken = await RefreshToken.findOne({
        token,
        isRevoked: false,
        expiresAt: { $gt: new Date() },
    });

    if (!storedToken) {
        throw new Error("Invalid or expired refresh token");
    }

    let payload;
    try {
        payload = verifyRefreshToken(token);
    } catch (error) {
        throw new Error("Invalid or expired refresh token");
    }

    const user = await User.findById(payload.userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.isActive) {
        throw new Error("User account is disabled");
    }

    storedToken.isRevoked = true;
    storedToken.revokedAt = new Date();

    await storedToken.save();

    const newPayload = {
        userId: user._id,
        role: user.role,
        tokenVersion: user.tokenVersion || 1,
    };

    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    await RefreshToken.create({
        user: user._id,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),

        createdByIp: ipAddress,
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};


//forgot password 
export const forgotPasswordService = async (email) => {
    console.log(
        "EMAIL RECEIVED:",
        email
    );
    const user = await User.findOne({ email });
    console.log("USER:", user);
    if (!user) {
        throw new Error(
            "User not found"
        );
    }
    const { token, hashedToken } = generateResetToken();
    console.log("RAW TOKEN:", token);
    console.log("HASH TOKEN:", hashedToken);
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();
    const resetURL = `http://localhost:5173/reset-password/${token}`;
    console.log("RESET URL:", resetURL);
    return {
        message: "Reset link generated"
    };
};


//resetpassword 
export const resetPasswordService =
    async (token, password) => {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        console.log("SEARCH TOKEN:", hashedToken);

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });

        console.log("FOUND USER:", user);

        if (!user) {
            throw new Error(
                "Invalid or expired token"
            );
        }

        const newPassword = await hashPassword(password);

        console.log(
            "NEW HASH:",
            newPassword
        );

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return {
            message:
                "Password reset successfully"
        };
    };

// Logout
export const logoutService = async (token) => {

    await RefreshToken.findOneAndUpdate(
        {
            token,
            user: userId
        },
        {
            isRevoked: true,
            revokedAt: new Date()
        }
    );

    return true;

};