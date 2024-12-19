"use server";

import z from "zod";
import { SettingsSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserByEmail, getUserById } from "@/prisma/data/user";
import prisma from "@/prisma/client";
import { generateVerificationToken } from "@/prisma/data/verficationToken";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settingsAction = async (
  values: z.infer<typeof SettingsSchema>,
) => {
  const { user } = await auth();

  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "unauthorized" };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordMatch) return { error: "incorrect password!" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  const updatedUser = await prisma.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  update();

  return { success: "Settings updated!" };
};
