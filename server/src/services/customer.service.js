import User from "../models/User.js"

export const getCustomerService = async () => {
    return await User.find({
        role: "CUSTOMER"
    })
    .select("-password")
    .sort({ createdAt: -1 });
};

export const getCustomerByIdService = async (id) => {
    const customer = await User.findOne({
        _id: id,
        role: "CUSTOMER"
    }).select("-password");

    if (!supplier) {
        throw new Error("customer not found");
    }
    return customer;
};