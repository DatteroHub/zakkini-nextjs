import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import Provider from "./_provider";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main>{children}</main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
