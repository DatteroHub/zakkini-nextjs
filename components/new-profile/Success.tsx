"use client";
import { Check } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";

export const Success = () => {
  const t = useTranslations("NewProfile.Success");
  return (
    <div className="flex flex-col w-full md:w-[450px] gap-8">
      <div className="grid w-full items-center gap-4">
        <Alert>
          <Check className="h-4 w-4" color="#217682" />
          <AlertTitle className="text-primary">{t("title")}</AlertTitle>
        </Alert>
        <label className="text-sm text-muted-foreground">{t("desc")}</label>
      </div>
      <div className="flex justify-around w-full md:w-[450px]">
        <Button variant="outline" asChild>
          <Link href="/dashboard/">{t("ctaSkip")}</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/assets">{t("ctaContinue")}</Link>
        </Button>
      </div>
    </div>
  );
};
