"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  doSignUp,
  resendEmailVerification,
} from "@/utils/actions/authentication";
import { useState } from "react";
import { emailSchema, passwordSchema } from "@/lib/zod";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Check, CircleAlert } from "lucide-react";
import useCountdown from "@/utils/hooks/useCountdown";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showFieldsError, setShowFieldsError] = useState(false);
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);
  const [isEmailResent, setIsEmailResent] = useState(false);
  const [signUpError, setSignUpError] = useState(
    null as null | { title: string; desc: string }
  );
  const { timeLeft: counter, startCountdown } = useCountdown(59);

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
      <div className="flex items-center justify-center py-8">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid justify-items-center mb-3">
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
          <div className="grid gap-2 text-center mb-2">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Create a Dattero account
            </p>
          </div>
          {showSignupSuccess ? (
            <>
              <Alert>
                <Check className="h-4 w-4" color="#16a34a" />
                <AlertTitle className="text-green-600">
                  Account created successfully
                </AlertTitle>
              </Alert>
              <label className="text-sm">
                We've sent a verification link to your email. Please verify your
                email to log in.
              </label>
              <div className="flex items-center gap-8 mt-12">
                {isEmailResent ? (
                  <div className="text-sm">Email resent. Check your inbox.</div>
                ) : (
                  <div className="text-sm">
                    <div>Didn't receive any email?</div>
                    <button
                      className={`underline mt-1.5 ${
                        counter > 0
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                      onClick={async () => {
                        const res = await resendEmailVerification();
                        switch (res) {
                          case "success":
                            setIsEmailResent(true);
                            break;
                          default:
                            startCountdown();
                        }
                      }}
                      disabled={counter > 0 ? true : false}
                    >
                      Send again
                    </button>{" "}
                    (in 00:{String(counter).padStart(2, "0")})
                  </div>
                )}
                <Button className="ml-auto" asChild>
                  <Link href="/login">Go to login</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              {signUpError && (
                <Alert variant="destructive">
                  <CircleAlert className="h-4 w-4" />
                  <AlertTitle>{signUpError.title}</AlertTitle>
                  <AlertDescription>{signUpError.desc}</AlertDescription>
                </Alert>
              )}
              <form
                action={async (formData) => {
                  if (
                    !name.length ||
                    !emailSchema.safeParse(email).success ||
                    !passwordSchema.safeParse(password).success ||
                    password !== confirmPassword ||
                    !termsChecked
                  ) {
                    setShowFieldsError(true);
                  } else {
                    const res = await doSignUp(formData);
                    switch (res) {
                      case "success":
                        setSignUpError(null);
                        setShowSignupSuccess(true);
                        startCountdown();
                        break;
                      case "auth/email-already-in-use":
                        setSignUpError({
                          title: "User already exists",
                          desc: "Please try with a different email or reset your password.",
                        });
                        break;
                      default:
                        setSignUpError({
                          title: "Unable to Sign Up",
                          desc: "Account not created, please retry.",
                        });
                    }
                  }
                }}
              >
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user-name">Name</Label>
                    <Input
                      id="user-name"
                      name="user-name"
                      placeholder="Ali Rajab"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={
                        name.length > 1
                          ? "border-green-500"
                          : !name.length && showFieldsError
                          ? "border-red-500"
                          : undefined
                      }
                    />
                    {!name.length && showFieldsError ? (
                      <div className="text-sm text-red-400">
                        Name is required.
                      </div>
                    ) : undefined}
                  </div>
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
                          : emailSchema.safeParse(email).success
                          ? "border-green-500"
                          : undefined
                      }
                    />
                    {!emailSchema.safeParse(email).success &&
                    showFieldsError ? (
                      <div className="text-sm text-red-400">
                        {emailSchema
                          .safeParse(email)
                          .error?.issues?.map((e) => {
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
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={
                        !passwordSchema.safeParse(password).success &&
                        showFieldsError
                          ? "border-red-500"
                          : passwordSchema.safeParse(password).success
                          ? "border-green-500"
                          : undefined
                      }
                    />
                    <div className="text-sm text-red-400">
                      {!passwordSchema.safeParse(password).success &&
                      showFieldsError
                        ? passwordSchema
                            .safeParse(password)
                            .error?.issues?.map((e) => {
                              return (
                                <>
                                  {e.message} <br />
                                </>
                              );
                            })
                        : ""}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="passwordConfirm">Confirm password</Label>
                    <Input
                      id="passwordConfirm"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={
                        confirmPassword.length &&
                        password !== confirmPassword &&
                        showFieldsError
                          ? "border-red-500"
                          : passwordSchema.safeParse(password).success &&
                            password === confirmPassword
                          ? "border-green-500"
                          : undefined
                      }
                    />
                    <div className="text-sm text-red-400">
                      {confirmPassword.length &&
                      password !== confirmPassword &&
                      showFieldsError
                        ? "The passwords do not match."
                        : ""}
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    <Checkbox
                      id="show-password"
                      onCheckedChange={(value) =>
                        setShowPassword(value == true)
                      }
                    />
                    <label
                      htmlFor="show-password"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show password
                    </label>
                  </div>
                  <div className="items-top flex space-x-2 mt-2">
                    <Checkbox
                      id="terms"
                      onCheckedChange={(value) =>
                        setTermsChecked(value == true)
                      }
                      className={
                        !termsChecked && showFieldsError
                          ? "border-destructive"
                          : undefined
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions
                      </label>
                      <p className="text-xs text-muted-foreground">
                        You agree to our{" "}
                        <Link href="#" className="underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="underline">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                  <Button type="submit" className="mt-3 w-full">
                    Create account
                  </Button>
                </div>
              </form>
              <div className="mt-3 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
