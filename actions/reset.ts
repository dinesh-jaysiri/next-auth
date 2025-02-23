"use server";

import { ResetSchema } from "@/schemas";
import z from "zod";
import { sendPasswordResetEmail } from "@/lib/mail";
import {
  generatePasswordResetToken,
  getPasswordRestTokenByEmail,
} from "@/prisma/data/passwordResetToken";
import { getUserByEmail } from "@/prisma/data/user";
import { PasswordResetToken } from "@prisma/client";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

export const resetAction = async (
  value: z.infer<typeof ResetSchema>,
): Promise<
  | {
      error?: string;
      success?: string;
    }
  | undefined
> => {
  const validatedFields = ResetSchema.safeParse(value);

  if (!validatedFields.success) return { error: "Invalid email!" };

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  try {
    const passwordRestToken = await generatePasswordResetToken(
      existingUser.email!,
    );
    if (!passwordRestToken) {
      return { error: "Something went wrong!" };
    }
    await sendPasswordResetEmail(
      passwordRestToken.email,
      passwordRestToken.token,
    );
    return { success: "Rest password email sent!" };
  } catch {
    return { error: "Something went wrong!" };
  }
};
