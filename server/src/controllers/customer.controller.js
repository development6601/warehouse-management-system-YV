import { getCustomerService } from "../services/customer.service.js";

export const getCustomer = async (req, res) => {
    try {
        const customer =
            await getCustomerService();
        res.json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};