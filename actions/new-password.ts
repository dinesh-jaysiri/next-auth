"use server";

import { getPasswordRestTokenByToken } from "@/prisma/data/passwordResetToken";
import { getUserByEmail } from "@/prisma/data/user";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/client";
import z from "zod";
import { NewPasswordSchema } from "@/schemas";

export const newPasswordAction = async (
  value: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  console.log(token);
  if (!token) return { error: "Missing token!" };

  const validatedFields = NewPasswordSchema.safeParse(value);

  if (!validatedFields.success) return { error: "Invalid password!" };

  const { password } = validatedFields.data;
  const passwordResetToken = await getPasswordRestTokenByToken(token);

  if (!passwordResetToken) return { error: "Invalid token!" };

  const expired = new Date(passwordResetToken.expires) < new Date();

  if (expired) return { error: "Token expired!" };

  const user = await getUserByEmail(passwordResetToken.email);

  if (!user) return { error: "User does not exits!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      await prisma.passwordResetToken.delete({
        where: { id: passwordResetToken.id },
      });
    });

    return { success: "Password updated!" };
  } catch {
    return { error: "Something went wrong!" };
  }
};
