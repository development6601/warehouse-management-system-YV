import express from "express"
import { signup, login, logout, refreshToken, forgotPassword, resetPassword } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.middleware.js"
import { signupSchema, loginSchema } from "../validators/auth.validator.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup",
    validate(signupSchema),
    signup
);

router.post("/login",
    validate(loginSchema),
    login
);

router.post("/refresh-token",
    refreshToken
);

router.post("/logout",
    logout
);

router.post("/forgot-password",
    forgotPassword
);


router.post("/reset-password/:token",
    resetPassword
);

export default router