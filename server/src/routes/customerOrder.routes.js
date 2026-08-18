import express from "express";
import { cancelCustomerOrder, createOrder, getCustomerOrders, getCustomerOrderTracking } from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { getProfile, updateAvatar, updateProfile } from "../controllers/profile.controller.js";



const router = express.Router();

router.use(
    authMiddleware,
    roleMiddleware("CUSTOMER")
);

router.post(
  "/order/create",
  createOrder
);

router.get(
  "/order/my-orders",
  getCustomerOrders
);

router.get(
    "/order/:id/tracking",
    getCustomerOrderTracking
);

router.patch(
    "/order/:id/cancel",
    cancelCustomerOrder
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