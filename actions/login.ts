"use server";

import { LoginSchema } from "@/schemas";
import z from "zod";
import delay from "delay";

export const loginAction = async (
  value: z.infer<typeof LoginSchema>,
): Promise<{
  error?: string;
  success?: string;
}> => {
  const validatedFields = LoginSchema.safeParse(value);

  await delay(2000);

  if (!validatedFields) return { error: "Invalid fields!" };

  return { success: "Email sent!" };
};
