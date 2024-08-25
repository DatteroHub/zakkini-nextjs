"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const SignOutButton = () => {
  const { data: session, status } = useSession();
  
  return (
    <>
      <div>Ciao {session?.user?.name ?? session?.user?.email}</div>
      <div className="flex gap-2 m-4 justify-end">
        <Button
          variant="secondary"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </Button>
      </div>
    </>
  );
};

export default SignOutButton;
