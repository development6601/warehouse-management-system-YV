import { getProfileService, updateAvatarService, updateProfileService } from "../services/profile.service.js";

export const getProfile = async (req, res) => {
    try {
        const profile = await getProfileService(req.user._id);
        return res.status(200).json({
            success: true,
            data: profile,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const profile = await updateProfileService(req.user._id, req.body);
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const updateAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;

        if (!avatar) {
            return res.status(400).json({
                success: false,
                message:
                    "Avatar is required",
            });
        }

        const profile = await updateAvatarService(req.user._id, avatar);
        return res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            data: profile,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



