"use client";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import {
  CalendarClock,
  ChevronRight,
  Hourglass,
  SquarePen,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { Skeleton } from "../ui/skeleton";
import { Progress } from "../ui-custom/progress";
const moment = require("moment-hijri");

export const ZakatDay = ({
  isZakatPage,
  setIsEditing,
}: {
  isZakatPage?: boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}) => {
  const locale = useLocale();
  const t = useTranslations("Zakat.ZDayCard");
  moment.locale(locale);
  const { currentProfile, remainingDays } = useGetProfiles();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="flex items-center">
          <CalendarClock className="h-5 w-5 mr-2" />
          {t("title")}
          {isZakatPage && setIsEditing != undefined ? (
            <Button
              variant="outline"
              className="text-foreground ml-auto"
              onClick={() => setIsEditing(true)}
            >
              <SquarePen className="mr-2 h-4 w-4" />
              {t("edit")}
            </Button>
          ) : (
            <Button variant="outline" size="icon" className="ml-auto" asChild>
              <Link href="/dashboard/my-zakat">
                <ChevronRight className="h-6 w-6" />
              </Link>
            </Button>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {currentProfile && remainingDays != undefined ? (
          <div className="grid gap-4">
            <div className="flex gap-2 items-end">
              <div
                className={`font-semibold ${
                  remainingDays == 0
                    ? "text-red-600 text-3xl"
                    : remainingDays < 0
                    ? "text-red-600 text-4xl"
                    : remainingDays < 15
                    ? "text-yellow-600 text-4xl"
                    : "text-4xl"
                }`}
              >
                {remainingDays == 0 ? t("today") : Math.abs(remainingDays)}
              </div>
              <div className="text-base text-muted-foreground">
                {remainingDays < 0
                  ? t("ago")
                  : remainingDays > 0
                  ? t("remaining")
                  : ""}
              </div>
              <div className="grid text-right ml-auto">
                <div className="font-semibold">
                  {t("gregorian", { day: currentProfile.zDay })}
                </div>
                <div className="text-sm text-muted-foreground">
                  {moment(currentProfile.zDay).format("iD iMMM iYYYY")}
                </div>
              </div>
            </div>
            <Progress
              value={(remainingDays * 100) / 354}
              className={`rotate-180 ${remainingDays < 1 ? "bg-red-600" : ""}`}
              activeColor={`${remainingDays < 15 ? "bg-yellow-600" : ""}`}
            />
          </div>
        ) : (
          <>
            <Skeleton className="w-16 h-10" />
            <Skeleton className="w-full h-12 mt-4" />
          </>
        )}
      </CardContent>
      {currentProfile && remainingDays != undefined && remainingDays < 15 ? (
        <CardFooter
          className={`pt-6 ${
            remainingDays < 1
              ? "bg-red-100 text-red-600"
              : "bg-amber-100 text-yellow-600"
          }`}
        >
          <div className="flex gap-4 items-center">
            <div className="w-8">
              <Hourglass />
            </div>
            <div className="text-sm font-medium">
              {remainingDays < 1 ? t("shouldPay") : t("comeBack")}
            </div>
          </div>
        </CardFooter>
      ) : (
        <></>
      )}
    </Card>
  );
};
