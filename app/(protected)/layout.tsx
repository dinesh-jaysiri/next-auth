import React, { PropsWithChildren } from "react";
import NavBar from "@/app/(protected)/NavBar";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className=" h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-emerald-800">
      <NavBar />
      {children}
    </div>
  );
}

export default Layout;
