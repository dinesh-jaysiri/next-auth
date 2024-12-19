import z, { date } from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.string().max(255).optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role: z.enum([UserRole.ADMIN, UserRole.USER]).optional(),
    email: z.string().email().max(225).optional(),
    password: z.string().max(225).optional(),
    newPassword: z.string().min(6).max(16).optional(),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: " New password is required!", path: ["newPassword"] },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      return true;
    },
    { message: "password is required!", path: ["password"] },
  );
export const LoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1, "Password is required").max(225),
  code: z.string().max(225).min(6).optional(),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email().max(255),
  password: z.string().min(6, "Minimum 6 characters required").max(16),
});

export const ResetSchema = z.object({
  email: z.string().email().max(255),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(1, "Password is required").max(16),
});
