import { signupService, loginService, logoutService, refreshTokenService, forgotPasswordService, resetPasswordService } from "../services/auth.service.js";


export const signup = async (req, res) => {
    try {
        const user = await signupService(req.body)
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const result = await loginService(req.body.email, req.body.password, req.ip)

        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required",
            });
        }

        const ipAddress =
            req.ip ||
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress;

        const tokens = await refreshTokenService(
            refreshToken,
            ipAddress
        );

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            data: tokens,
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Refresh token expired or invalid",
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        console.log("FORGOT PASSWORD REQUEST:", req.body);
        const result = await forgotPasswordService(req.body.email);
        res.json({
            success: true,
            ...result
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const resetPassword = async (req, res) => {
    console.log("PARAM TOKEN:", req.params.token);
    console.log("BODY:", req.body);

    try {
        const result =
            await resetPasswordService(
                req.params.token,
                req.body.password
            );

        res.json({
            success: true,
            ...result
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        await logoutService(req.body.refreshToken);

        res.json({
            success: true,
            message: "Logout successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};