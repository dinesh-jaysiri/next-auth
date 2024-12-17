import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(1, "Password is required").max(255),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email().max(255),
  password: z.string().min(6, "Minimum 6 characters required").max(255),
});

export const ResetSchema = z.object({
  email: z.string().email().max(255),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(1, "Password is required").max(255),
});
