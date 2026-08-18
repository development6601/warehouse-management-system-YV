import React from "react";
import { useSelector } from "react-redux";
import ProfilePage from "../profile/ProfilePage";
import { getAdminProfile, getAdminUpdateProfile, getAdminUpdateAvatar } from "../../store/thunks/adminThunk/adminProfileThunk";
import { clearAdminProfileError } from "../../store/slices/adminSlice/adminProfileSlice";

const AdminProfile = () => {
    const {
        profile,
        loading,
        updateLoading,
        avatarLoading,
        error,
    } = useSelector((state) => state.adminProfile);

    return (
        <ProfilePage
            title="Admin Profile"
            role="Administrator"

            profile={profile}
            loading={loading}
            updateLoading={updateLoading}
            avatarLoading={avatarLoading}
            error={error}

            fetchProfile={getAdminProfile}
            updateProfile={getAdminUpdateProfile}
            updateAvatar={getAdminUpdateAvatar}

            clearError={clearAdminProfileError}
        />
    );
};

export default AdminProfile;
