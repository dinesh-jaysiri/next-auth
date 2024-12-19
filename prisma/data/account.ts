import prisma from "@/prisma/client";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({ where: { id: userId } });
  } catch {
    return null;
  }
};
