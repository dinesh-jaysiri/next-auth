"use server";

import { RegisterSchema } from "@/schemas";
import z from "zod";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";
import { getUserByEmail } from "@/prisma/data/user";

export const registerAction = async (
  value: z.infer<typeof RegisterSchema>,
): Promise<{
  error?: string;
  success?: string;
}> => {
  const validatedFields = await RegisterSchema.safeParse(value);

  if (!validatedFields) return { error: "Invalid fields!" };

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use!" };

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //TODO:send verification email

  return { success: "User created!" };
};
