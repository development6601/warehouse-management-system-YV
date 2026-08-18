import axios from "./axios"


//get all supplier 
export const getSuppliersApi = () => {
    return axios.get("/admin/suppliers")
}


// single supplier
export const getSupplierByIdApi = (id) => {
    return axios.get(`/admin/suppliers/${id}`)
}

export const updateSupplierApi = (id, data) => {
    return axios.put(
        `/admin/suppliers/${id}/edit`,
        data
    )
}

//disable supplier 
export const disableSupplierApi = (id) => {
    return axios.patch(`/admin/suppliers/${id}/disable`)
}