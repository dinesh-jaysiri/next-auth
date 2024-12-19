import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import { PasswordResetToken } from "@prisma/client";

export const getPasswordRestTokenByToken = async (token: string) => {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: token },
    });
    return resetToken;
  } catch {
    return null;
  }
};
export const getPasswordRestTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getPasswordRestTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  try {
    const passwordResetToken = await prisma.passwordResetToken.create({
      data: { email, token, expires },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};
