"use client";
import { useSession, signOut } from "next-auth/react";

const SettingsPage = () => {
  const session = useSession();

  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default SettingsPage;
