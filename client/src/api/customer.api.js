import axios from "./axios"


//get all customer 
export const getCustomerApi = () => {
    return axios.get("/admin/customer")
}


// single customer
export const getCustomerByIdApi = (id) => {
    return axios.get(`/admin/customer/${id}`)
}

//update customer 
export const updateCustomerApi = (id, data) => {
    return axios.put(
        `/admin/customer/${id}/edit`,
        data
    )
}

//disable customer 
export const disableCustomerApi = (id) => {
    return axios.patch(`/admin/customer/${id}/disable`)
}