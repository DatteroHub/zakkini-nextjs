"use client";

import {
  Banknote,
  ChartBarBig,
  HandHeart,
  Home,
  MessageSquareMore,
  Settings,
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
import { ProfileButton } from "./ProfileButton";

export default function SidebarMenu({
  selectedMenu,
}: {
  selectedMenu?: number;
}) {
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
        <ProfileButton />
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:text-foreground ${
            selectedMenu == 1
              ? "bg-accent text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="">{t("dashboard")}</span>
        </Link>
        <Link
          href="/dashboard/nisab"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:text-foreground ${
            selectedMenu == 2
              ? "bg-accent text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Banknote className="h-5 w-5" />
          <span className="">{t("nisab")}</span>
        </Link>
        <Link
          href="/dashboard/assets"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:text-foreground ${
            selectedMenu == 3
              ? "bg-accent text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <ChartBarBig className="h-5 w-5" />
          <span className="">{t("assets")}</span>
        </Link>
        <Link
          href="/dashboard/my-zakat"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:text-foreground ${
            selectedMenu == 4
              ? "bg-accent text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <HandHeart className="h-5 w-5" />
          <span className="">{t("zakat")}</span>
        </Link>
      </nav>
      <nav className="mt-auto flex justify-between gap-3 px-5 sm:pt-5">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:text-foreground ${
            selectedMenu == 9
              ? "bg-accent text-foreground"
              : "text-muted-foreground"
          }`}
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
              <CardDescription>{t("Feedback.desc")}</CardDescription>
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
