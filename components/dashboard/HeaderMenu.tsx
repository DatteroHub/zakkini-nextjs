"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  MessageSquareMore,
  Package,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
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
import { BreadcrumbResponsive } from "./Breadcrumb";
import { BreadcrumbItemType } from "@/lib/types";
import { SwitchLang } from "./SwitchLang";
import { useTranslations } from "next-intl";
import { AccountDropdown } from "./AccountDropdown";

export default function HeaderMenu({
  breadcrumbItems,
}: {
  breadcrumbItems?: BreadcrumbItemType[];
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
              className="flex items-center gap-4 px-3.5 py-2 text-foreground bg-accent rounded-lg"
            >
              <Home className="h-5 w-5" />
              {t("dashboard")}
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-3.5 py-2 text-muted-foreground rounded-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              {t("orders")}
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-3.5 py-2 text-muted-foreground rounded-lg"
            >
              <Package className="h-5 w-5" />
              {t("products")}
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-3.5 py-2 text-muted-foreground rounded-lg"
            >
              <Users2 className="h-5 w-5" />
              {t("customers")}
            </Link>
          </nav>
          <nav className="mt-auto flex justify-between gap-3">
            <Link
              href="#"
              className="flex items-center gap-4 px-3.5 py-2 text-muted-foreground rounded-lg"
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
