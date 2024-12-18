"use client";
import React from "react";
import UserInfo from "@/components/UserInfo";
import { useSession } from "next-auth/react";

function Page() {
  const session = useSession();
  return <UserInfo user={session.data?.user} label={"💻 Client Component"} />;
}
export default Page;
