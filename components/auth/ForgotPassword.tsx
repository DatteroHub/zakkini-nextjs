/* TODO custom change pwd page */
"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { emailSchema } from "@/lib/zod";
import { sendResetPasswordEmail } from "@/utils/actions/authentication";
import { Alert, AlertTitle } from "../ui/alert";
import { Check, CircleAlert, Loader2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showFieldsError, setShowFieldsError] = useState(false);
  const [showSentSuccess, setShowSentSuccess] = useState(false);
  const [showInvalidEmail, setShowInvalidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Receive a password reset link
            </p>
          </div>
          <div className="grid gap-4">
            {showSentSuccess ? (
              <Alert>
                <Check className="h-4 w-4" color="#16a34a" />
                <AlertTitle className="text-green-600">
                  Email sent successfully
                </AlertTitle>
              </Alert>
            ) : showInvalidEmail ? (
              <Alert>
                <CircleAlert className="h-4 w-4" color="#dc2626" />
                <AlertTitle className="text-red-600">
                  Unable to find a user with this email
                </AlertTitle>
              </Alert>
            ) : null}
            <form
              className="grid gap-4"
              action={async (formData) => {
                if (!emailSchema.safeParse(email).success) {
                  setShowFieldsError(true);
                } else {
                  setLoading(true);
                  const res = await sendResetPasswordEmail(formData);
                  switch (res) {
                    case "success":
                      setShowSentSuccess(true);
                      setLoading(false);
                      break;
                    case "email_not_found":
                      setShowInvalidEmail(true);
                      setLoading(false);
                      break;
                    default:
                      break;
                  }
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
              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={showSentSuccess || loading ? true : false}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send
              </Button>
            </form>
          </div>
          <div className="mt-3 text-center text-sm">
            Back to{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
