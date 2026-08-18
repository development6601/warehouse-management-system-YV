import express from "express";

import { getProductStockHistory } from "../controllers/stockHistory.controller.js";

const router = express.Router();

router.get(
    "/products/:id/stock-history",
    getProductStockHistory
);


export default router;