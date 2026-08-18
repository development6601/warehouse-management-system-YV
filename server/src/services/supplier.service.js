import User from "../models/User.js"

export const getSuppliersService = async () => {
    return await User.find({
        role: "SUPPLIER"
    })
    .select("-password")
    .sort({ createdAt: -1 });
};

export const getSupplierByIdService = async (id) => {
    const supplier = await User.findOne({
        _id: id,
        role: "SUPPLIER"
    }).select("-password");

    if (!supplier) {
        throw new Error("Supplier not found");
    }
    return supplier;
};