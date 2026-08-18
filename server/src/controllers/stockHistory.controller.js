import { getProductStockHistoryService } from "../services/stockHistory.service.js";



export const getProductStockHistory = async (req, res) => {

    try {
        const history =
            await getProductStockHistoryService(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: history
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};