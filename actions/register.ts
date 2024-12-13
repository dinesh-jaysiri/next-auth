"use server";

import { RegisterSchema } from "@/schemas";
import z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/client";
import { getUserByEmail } from "@/prisma/data/user";

export const registerAction = async (
  value: z.infer<typeof RegisterSchema>,
): Promise<{
  error?: string;
  success?: string;
}> => {
  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password, name, email } = validatedFields.data;

  // Check if the user already exists
  const user = await getUserByEmail(email);
  if (user) {
    return { error: "Email already in use!" };
  }

  // Hash the password and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send verification email

  return { success: "User created!" };
};
