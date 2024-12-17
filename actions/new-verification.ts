"use server";
import { getVerificationTokenByToken } from "@/prisma/data/verficationToken";
import { getUserByEmail } from "@/prisma/data/user";
import prisma from "@/prisma/client";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { emailVerified: new Date(), email: existingToken.email },
      });

      await prisma.verificationToken.delete({
        where: { id: existingToken.id },
      });
    });

    return { success: "Email verified!" };
  } catch {
    return { error: "An error occurred while verifying the email." };
  }
};
