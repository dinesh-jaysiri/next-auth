import React from "react";
import { auth } from "@/auth";
import UserInfo from "@/components/UserInfo";

async function Page(props) {
  const session = await auth();
  return <UserInfo user={session?.user} label={"☁️ Server Component"} />;
}

export default Page;
