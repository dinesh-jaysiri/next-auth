"use server";

import { LoginSchema } from "@/schemas";
import z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const loginAction = async (
  value: z.infer<typeof LoginSchema>,
): Promise<
  | {
      error?: string;
      success?: string;
    }
  | undefined
> => {
  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
