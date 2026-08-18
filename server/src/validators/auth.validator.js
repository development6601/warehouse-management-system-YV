import { z } from "zod";

export const signupSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50),

    lastName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50),

    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .toLowerCase(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100),

    role: z
        .enum(["ADMIN", "SUPPLIER", "CUSTOMER"])
        .optional(),

    password: z.string().min(1, "Password is required"),
})


export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  password: z.string().min(1, "Password is required"),
})


export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address")
        .toLowerCase(),
})

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100),

    confirmPassword: z
        .string()
        .min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1),

    newPassword: z
        .string()
        .min(8)
        .max(100),

    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});