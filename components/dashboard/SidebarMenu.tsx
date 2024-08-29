"use client";

import {
  Home,
  LineChart,
  MessageSquareMore,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { SwitchLang } from "./SwitchLang";
import { useTranslations } from "next-intl";

export default function SidebarMenu() {
  const t = useTranslations("Dashboard.Menu");
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
      <nav className="grid gap-3 items-start px-5 sm:py-5">
        <div className="flex mb-4">
          <a href="/dashboard" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="zakkini icon"
              width="48"
              height="48"
              className="w-16"
            />
            <div className="ml-2 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gradient to-gradient">
              {t("appname")}
            </div>
          </a>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          <span className="">{t("dashboard")}</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="">{t("orders")}</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <Package className="h-5 w-5" />
          <span className="">{t("products")}</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <Users2 className="h-5 w-5" />
          <span className="">{t("customers")}</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <LineChart className="h-5 w-5" />
          <span className="">{t("analytics")}</span>
        </Link>
      </nav>
      <nav className="mt-auto flex justify-between gap-3 px-5 sm:pt-5">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          <span className="">{t("settings")}</span>
        </Link>
        <SwitchLang />
      </nav>
      <nav className="grid items-start gap-3">
        <div className="p-4">
          <Card>
            <CardHeader className="p-2 pt-0 sm:p-4">
              <CardTitle className="text-xl">{t("Feedback.title")}</CardTitle>
              <CardDescription>
              {t("Feedback.desc")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 sm:p-4 sm:pt-0">
              <Button size="sm" className="w-full">
                <MessageSquareMore className="mr-2 h-4 w-4" />
                {t("Feedback.cta")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </nav>
    </aside>
  );
}
