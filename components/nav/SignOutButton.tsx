import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";

const SignOutButton = async () => {
  const session = await auth();
  return (
    <>
      <div>Ciao {session?.user?.name ?? session?.user?.email}</div>
      <div className="flex m-4 justify-end">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button variant="secondary" type="submit">
            Sign Out
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignOutButton;
