import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";


export const getProfileService = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    return user;
};


export const updateProfileService = async (userId, data) => {

    const allowedFields = [
        "firstName",
        "lastName",
        "email"
    ];

    const updateData = {};

    for (const field of allowedFields) {
        if (data[field] !== undefined) {
            updateData[field] = data[field];
        }
    }

    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    return user;
};


export const updateAvatarService = async (userId, avatar) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { avatar, }, 
        { new: true, }
    ).select("-password");

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    return user;
};

