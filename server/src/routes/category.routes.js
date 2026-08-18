import express from "express";
import * as categoryController from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";


const router = express.Router();

router.use(
    authMiddleware,
    roleMiddleware("ADMIN")
);


router.get(
    "/categories",
    categoryController.getAllCategories
);

router.post(
    "/categories/create",
    categoryController.createCategory
);

router.get(
    "/categories/:id",
    categoryController.getCategory
);

router.put(
    "/categories/:id/edit",
    categoryController.updateCategory
);

router.delete(
    "/categories/:id/delete",
    categoryController.deleteCategory
);

router.patch(
    "/categories/:id/status",
    categoryController.changeStatus
);

router.get(
    "/categories/:id/products",
    categoryController.getCategoryProducts
)

export default router;