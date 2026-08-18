import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import stockHistoryRoute from "./stockHistory.route.js";
import { getSuppliers } from "../controllers/supplier.controller.js";
import { getCustomer } from "../controllers/customer.controller.js";
import { cancelOrder, editAdminOrder, getAdminOrderById, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { getProfile, updateAvatar, updateProfile } from "../controllers/profile.controller.js";
import { getAdminDashboard } from "../controllers/dashboard.controller.js";


const router = express.Router();


router.use(
    authMiddleware,
    roleMiddleware("ADMIN"),
)

router.get(
    "/dashboard",
    getAdminDashboard
);

router.get(
    "/suppliers",
    getSuppliers
);

router.get(
    "/customer",
    getCustomer
);

router.get(
    "/orders",
    getAllOrders
);

router.patch(
    "/orders/:orderId/status",
    updateOrderStatus
);

router.patch(
    "/orders/:orderId/cancel",
    cancelOrder
);

router.get(
    "/order/:id",
    getAdminOrderById
);

router.patch(
    "/order/:id/edit",
    editAdminOrder
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