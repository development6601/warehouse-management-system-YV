import StockHistory from "../models/stockHistory.model.js";

// Create history
export const createStockHistoryService =
async(data)=>{
    const history = await StockHistory.create(data);
    return history;
};

// Get product history

export const getProductStockHistoryService =
async(productId)=>{

    const history =
        await StockHistory
        .find({
            product:productId
        })
        .populate(
            "updatedBy",
            "firstName lastName email"
        )
        .sort({
            createdAt:-1
        });

    return history;
};