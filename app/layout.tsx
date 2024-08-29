import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ClientProvider from "@/components/provider/ClientProvider";
import ServerProvider from "@/components/provider/ServerProvider";
import { Toaster } from "@/components/ui/sonner";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: {
    template: "%s | Zakkini",
    default: "Zakkini",
  },
  description: "Manage and calculate your Zakat easily",
  metadataBase: new URL("https://nisabtoday.org"),
  keywords: [],
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ServerProvider>
          <ClientProvider>
            <main>{children}</main>
            <Toaster />
          </ClientProvider>
        </ServerProvider>
      </body>
    </html>
  );
}
