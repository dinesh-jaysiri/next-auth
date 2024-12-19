"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = async (provider: "google" | "github") => {
    // Use callbackUrl instead of redirectTo
    await signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button onClick={() => onClick("google")} className="w-full">
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button onClick={() => onClick("github")} className="w-full">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default Social;
