import { auth, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          try {
            await signOut({ redirectTo: "/auth/login", redirect: true });
          } catch (error) {
            if (isRedirectError(error)) {
              throw error;
            }
            throw error;
          }
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
