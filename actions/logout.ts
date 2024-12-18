"use server";

import { signOut } from "@/auth";

export const logoutAction = async () => {
  // do some server executions
  await signOut();
};
