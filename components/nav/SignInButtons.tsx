"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const SignInButtons = () => {
  return (
    <div className="flex gap-2 m-4 justify-end">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
};

export default SignInButtons;
