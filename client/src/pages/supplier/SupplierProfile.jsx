import React from "react";
import { useSelector } from "react-redux";
import ProfilePage from "../profile/ProfilePage";
import {getSupplierProfile,getSupplierUpdateProfile,getSupplierUpdateAvatar} from "../../store/thunks/supplierThunk/supplierProfileThunk";
import {clearSupplierProfileError} from "../../store/slices/supplierSlice/supplierprofileSlice";

const SupplierProfile = () => {
    const {
        profile,
        loading,
        updateLoading,
        avatarLoading,
        error,
    } = useSelector((state) => state.supplierProfile);

    return (
        <ProfilePage
            title="Supplier Profile"
            role="Supplier"

            profile={profile}
            loading={loading}
            updateLoading={updateLoading}
            avatarLoading={avatarLoading}
            error={error}

            fetchProfile={getSupplierProfile}
            updateProfile={getSupplierUpdateProfile}
            updateAvatar={getSupplierUpdateAvatar}

            clearError={clearSupplierProfileError}
        />
    );
};

export default SupplierProfile;
