"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  ChartBarBig,
  HandHeart,
  Home,
  MessageSquareMore,
  PanelLeft,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BreadcrumbItemType } from "@/lib/types";
import { useTranslations } from "next-intl";
import { SwitchLang } from "./SwitchLang";
import { BreadcrumbResponsive } from "./Breadcrumb";
import { AccountDropdown } from "./AccountDropdown";

export default function HeaderMenu({
  breadcrumbItems,
  selectedMenu,
}: {
  breadcrumbItems?: BreadcrumbItemType[];
  selectedMenu?: number;
}) {
  const t = useTranslations("Dashboard.Menu");
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col sm:max-w-xs">
          <nav className="grid gap-4 text-lg font-medium">
            <div className="flex items-center mb-2">
              <a href="/dashboard">
                <Image
                  src="/logo.svg"
                  alt="zakkini icon"
                  width="48"
                  height="48"
                  className="w-16"
                />
              </a>
              <div className="ml-2 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gradient to-gradient">
                {t("appname")}
              </div>
            </div>
            <Link
              href="/dashboard"
              className={`flex items-center gap-4 px-3.5 py-2 rounded-lg ${
                selectedMenu == 1
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Home className="h-5 w-5" />
              {t("dashboard")}
            </Link>
            <Link
              href="/dashboard/nisab"
              className={`flex items-center gap-4 px-3.5 py-2 rounded-lg ${
                selectedMenu == 2
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Banknote className="h-5 w-5" />
              {t("nisab")}
            </Link>
            <Link
              href="/dashboard/assets"
              className={`flex items-center gap-4 px-3.5 py-2 rounded-lg ${
                selectedMenu == 3
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <ChartBarBig className="h-5 w-5" />
              {t("assets")}
            </Link>
            <Link
              href="/dashboard/my-zakat"
              className={`flex items-center gap-4 px-3.5 py-2 rounded-lg ${
                selectedMenu == 4
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <HandHeart className="h-5 w-5" />
              {t("zakat")}
            </Link>
          </nav>
          <nav className="mt-auto flex justify-between gap-3">
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-4 px-3.5 py-2 rounded-lg ${
                selectedMenu == 9
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Settings className="h-5 w-5" />
              {t("settings")}
            </Link>
            <SwitchLang />
          </nav>
          <nav className="grid items-start gap-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t("Feedback.title")}</CardTitle>
                <CardDescription>{t("Feedback.desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  <MessageSquareMore className="mr-2 h-4 w-4" />
                  {t("Feedback.cta")}
                </Button>
              </CardContent>
            </Card>
          </nav>
        </SheetContent>
      </Sheet>
      <BreadcrumbResponsive breadcrumbItems={breadcrumbItems} />
      <AccountDropdown />
    </header>
  );
}
