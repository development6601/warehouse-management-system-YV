import express from "express";
import { createProduct, getProducts, getProductById, getProductsByCategory, updateProduct } from "../controllers/product.controller.js";
import { getProductStockHistory } from "../controllers/stockHistory.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import * as categoryController from "../controllers/category.controller.js";
import { getSupplierOrderById, getSupplierOrders } from "../controllers/order.controller.js";
import { getProfile, updateAvatar, updateProfile } from "../controllers/profile.controller.js";
import { getSupplierDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.use(
    authMiddleware,
    roleMiddleware("SUPPLIER")
);

router.get(
    "/dashboard",
    getSupplierDashboard
);

router.post(
    "/products/create",
    createProduct
)

router.get(
    "/products",
    getProducts
);

router.get(
    "/category/:id/products",
    getProductsByCategory
);

router.get(
    "/products/:id",
    getProductById
);

router.put(
    "/products/:id",
    updateProduct
);

router.get(
    "/products/:id/stock-history",
    getProductStockHistory
);

router.get(
    "/categories",
    categoryController.getAllCategories
);

router.get(
    "/order",
    getSupplierOrders
);

router.get(
    "/order/:id",
    getSupplierOrderById
);

router.get(
    "/profile",
    getProfile
);

router.patch(
    "/profile/update",
    updateProfile
);

router.patch(
    "/profile/update/avatar",
    updateAvatar
);




export default router;