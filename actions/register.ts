"use server";

import { RegisterSchema } from "@/schemas";
import z from "zod";
import delay from "delay";

export const registerAction = async (
  value: z.infer<typeof RegisterSchema>,
): Promise<{
  error?: string;
  success?: string;
}> => {
  const validatedFields = RegisterSchema.safeParse(value);

  await delay(2000);

  if (!validatedFields) return { error: "Invalid fields!" };

  return { success: "Email sent!" };
};
