import React, { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

async function AuthProvider({ children }: PropsWithChildren) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default AuthProvider;
