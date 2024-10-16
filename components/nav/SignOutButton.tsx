import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
//import { useProfile } from "@/utils/hooks/useProfile";

const SignOutButton = async () => {
  const session = await auth();
  //const { clearCurrentProfile } = useProfile();
  return (
    <>
      <div>Ciao {session?.user?.name ?? session?.user?.email}</div>
      <div className="flex m-4 justify-end">
        <form
          action={async () => {
            "use server";
            //clearCurrentProfile();
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
