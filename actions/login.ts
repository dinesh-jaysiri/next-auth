"use server";

import { LoginSchema } from "@/schemas";
import z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getUserByEmail } from "@/prisma/data/user";
import { generateVerificationToken } from "@/prisma/data/verficationToken";
import { sendVerificationEmail } from "@/lib/mail";

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

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    try {
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
      return { success: "Confirmation email sent!" };
    } catch {
      return { error: "Something went wrong!" };
    }
  }

  if (existingUser)
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.log(error);
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
