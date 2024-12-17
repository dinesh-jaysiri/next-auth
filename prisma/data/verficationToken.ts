import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import { VerificationToken } from "@prisma/client";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await prisma.verificationToken.findFirst({
      where: { email },
    });
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (
  token: string,
): VerificationToken | null => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token: token },
    });
    return verificationToken;
  } catch {
    console.log("error");
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(Date.now() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: { email, token, expires },
  });

  return verificationToken;
};
