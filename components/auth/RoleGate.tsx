"use client";
import React from "react";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import FormError from "@/components/FormError";

interface Prop {
  children: React.ReactNode;
  allowRole: UserRole;
}
function RoleGate({ children, allowRole }: Prop) {
  const session = useSession();
  const role = session.data?.user.role;

  if (role !== allowRole) {
    return (
      <FormError message="you do not have parmission to view this content!" />
    );
  }
  return <>{children}</>;
}

export default RoleGate;
