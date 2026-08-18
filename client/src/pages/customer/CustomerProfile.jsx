import React from "react";
import { useSelector } from "react-redux";
import ProfilePage from "../profile/ProfilePage";
import { getCustomerProfile, getCustomerUpdateProfile, getCustomerUpdateAvatar, } from "../../store/thunks/customerThunk/customerProfileThunk";
import { clearCustomerProfileError, } from "../../store/slices/customerSlice/customerProfileSlice";

const CustomerProfile = () => {
    const {
        profile,
        loading,
        updateLoading,
        avatarLoading,
        error,
    } = useSelector((state) => state.customerProfile);

    return (
        <ProfilePage
            title="Customer Profile"
            role="Customer"

            profile={profile}
            loading={loading}
            updateLoading={updateLoading}
            avatarLoading={avatarLoading}
            error={error}

            fetchProfile={getCustomerProfile}
            updateProfile={getCustomerUpdateProfile}
            updateAvatar={getCustomerUpdateAvatar}

            clearError={clearCustomerProfileError}
        />
    );
};

export default CustomerProfile;
