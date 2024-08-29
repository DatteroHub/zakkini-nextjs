"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export default function EmptyDashboard() {
  const t = useTranslations("Dashboard.Empty");
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          {t("welcome")}
          <span className="ml-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gradient to-gradient">
            {t("appname")}
          </span>
        </h3>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        <Button className="mt-4" asChild>
          <Link href="/dashboard/new-profile">{t("cta")}</Link>
        </Button>
      </div>
    </div>
  );
}
