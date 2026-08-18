import { getSuppliersService } from "../services/supplier.service.js";

export const getSuppliers = async (req, res) => {
    try {
        const suppliers =
            await getSuppliersService();
        res.json({
            success: true,
            data: suppliers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};