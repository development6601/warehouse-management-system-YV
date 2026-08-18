import axios from  "./axios"

//admin
export const getAdminProfileApi = () => {
    return axios.get(
        "/admin/profile"
    );
};

export const getAdminUpdateProfileApi = (data) => {
    return axios.patch(
        "/admin/profile/update", data
    );
};

export const getAdminUpdateAvatarApi = (data) => {
    return axios.patch(
        "/admin/profile/update/avatar", data
    );
};


//supplier
export const getSupplierProfileApi = () => {
    return axios.get(
        "/supplier/profile"
    );
};

export const getSupplierUpdateProfileApi = (data) => {
    return axios.patch(
        "/supplier/profile/update", data
    );
};

export const getSupplierUpdateAvatarApi = (data) => {
    return axios.patch(
        "/supplier/profile/update/avatar", data
    );
};


//customer
export const getCustomerProfileApi = () => {
    return axios.get(
        "/customer/profile"
    );
};

export const getCustomerUpdateProfileApi = (data) => {
    return axios.patch(
        "/customer/profile/update", data
    );
};

export const getCustomerUpdateAvatarApi = (data) => {
    return axios.patch(
        "/customer/profile/update/avatar", data
    );
};
