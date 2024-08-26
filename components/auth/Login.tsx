"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { emailSchema } from "@/lib/zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CircleAlert, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showFieldsError, setShowFieldsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const loginError = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/dattero-bg.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid justify-items-center mb-4">
            <a href="/">
              <Image
                src="/logo.svg"
                alt="zakkini icon"
                width="56"
                height="56"
                className="w-20"
              />
            </a>
          </div>
          <div className="grid justify-items-center gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter Dattero account credentials to login
            </p>
          </div>
          {loginError && (
            <Alert variant="destructive">
              <CircleAlert className="h-4 w-4" />
              {loginError === "CredentialsSignin" ? (
                <>
                  <AlertTitle>Invalid credentials</AlertTitle>
                  <AlertDescription>
                    Please check your credentials and retry.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertTitle>Unable to login</AlertTitle>
                  <AlertDescription>
                    Please check your credentials and retry.
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}
          <div className="grid gap-4">
            <form
              className="grid gap-4"
              action={() => {
                if (!emailSchema.safeParse(email).success || !password.length) {
                  setShowFieldsError(true);
                } else {
                  setLoading(true);
                  signIn("credentials", {
                    email,
                    password,
                    callbackUrl: callbackUrl ?? "/dashboard",
                  });
                }
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ali.rajab@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    !emailSchema.safeParse(email).success && showFieldsError
                      ? "border-red-500"
                      : undefined
                  }
                />
                {!emailSchema.safeParse(email).success && showFieldsError ? (
                  <div className="text-sm text-red-400">
                    {emailSchema.safeParse(email).error?.issues?.map((e) => {
                      return (
                        <>
                          {e.message} <br />
                        </>
                      );
                    })}
                  </div>
                ) : undefined}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    !password.length && showFieldsError
                      ? "border-red-500"
                      : undefined
                  }
                />
                <div className="text-sm text-red-400">
                  {!password.length && showFieldsError
                    ? "Password is required."
                    : ""}
                </div>
              </div>
              <Button
                className="mt-2 w-full"
                type="submit"
                disabled={loading ? true : false}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
            <div className="relative flex justify-center my-2">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
              <span className="relative z-10 bg-white px-6">or</span>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                signIn("google", { callbackUrl: callbackUrl ?? "/dashboard" })
              }
            >
              <Image
                src="/google.svg"
                alt="google icon"
                width="24"
                height="24"
                className="mr-2 h-4 w-4"
              />
              Login with Google
            </Button>
          </div>

          <div className="mt-3 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
