"use server";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

type Props = {
  children: React.ReactNode;
};

export default async function ServerProvider({ children }: Props) {
  const session = await auth();
  const messages = await getMessages();
  return (
    <SessionProvider session={session}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
