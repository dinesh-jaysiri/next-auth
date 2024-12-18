import React, { PropsWithChildren } from "react";
import { logoutAction } from "@/actions/logout";

function LogoutButton({ children }: PropsWithChildren) {
  const onClick = () => {
    logoutAction();
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
}

export default LogoutButton;
