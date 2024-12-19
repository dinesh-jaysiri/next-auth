"use server";

import z from "zod";
import { SettingsSchema } from "@/schemas";
import { auth } from "@/auth";
import { getUserById } from "@/prisma/data/user";
import prisma from "@/prisma/client";

export const settingsAction = async (
  values: z.infer<typeof SettingsSchema>,
) => {
  const { user } = await auth();

  if (!user) return { error: "Unauthorized" };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "unauthorized" };

  await prisma.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: "Settings updated!" };
};
