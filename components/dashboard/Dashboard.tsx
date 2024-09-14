"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { Skeleton } from "../ui/skeleton";
import EmptyDashboard from "../dashboard/EmptyDashboard";
import { ProfileNotComplete } from "./ProfileNotComplete";
import { ProfileStatus } from "../general/ProfileStatus";
import { NisabAssetsChart } from "../general/NisabAssetsChart";
import { useGetNisabs } from "@/utils/hooks/useGetNisabs";
import AnimateIn from "../animation/animate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  formatDateDistance,
  formatMoneyToString,
} from "@/utils/localization/helpers";
import { Banknote, ChartBarBig, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ZakatDay } from "../general/ZakatDay";
import { ZakatDue } from "../general/ZakatDue";

export const Dashboard = () => {
  const t = useTranslations("Dashboard");
  const [refreshKey, setRefreshKey] = useState(0);
  const {
    currentProfile,
    isNoProfiles,
    isAssetsConfigured,
    isZDayConfigured,
  } = useGetProfiles();
  const { myNisabToday, myNisabTodayTimestamp } = useGetNisabs({
    currencyCode: currentProfile?.country?.currencyCode,
  });

  return (
    <div className="flex flex-col w-full h-full mt-2 mb-8">
      {isNoProfiles ? (
        <EmptyDashboard />
      ) : currentProfile && myNisabToday ? (
        !isAssetsConfigured ||
        !isZDayConfigured ||
        !currentProfile.isZakater ? (
          <ProfileNotComplete />
        ) : (
          <AnimateIn
            from="opacity-0 translate-y-2"
            to="opacity-100 translate-y-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 lg:gap-8">
              <div className="flex flex-col w-full max-w-[500px] gap-6">
                <ProfileStatus
                  isZakater={true}
                  imgId={currentProfile.imgId!}
                  noMotion
                />
                <ZakatDay key={refreshKey} />
                <ZakatDue key={refreshKey} setRefreshKey={setRefreshKey} />
              </div>
              <div className="flex flex-col w-full max-w-[500px] gap-4">
                <NisabAssetsChart
                  nisab={myNisabToday}
                  assets={currentProfile.assets?.totalAssets!}
                  lastUpdate={currentProfile.assets?.lastUpdate!}
                />
                {myNisabTodayTimestamp && (
                  <Card>
                    <CardHeader>
                      <CardDescription className="flex items-center">
                        <Banknote className="h-5 w-5 mr-2" />
                        {t("NisabCard.title")}
                        <Button
                          variant="outline"
                          size="icon"
                          className="ml-auto"
                          asChild
                        >
                          <Link href="/dashboard/nisab">
                            <ChevronRight className="h-6 w-6" />
                          </Link>
                        </Button>
                      </CardDescription>
                      <CardTitle className="text-3xl">
                        {currentProfile.country?.currencySymbol}{" "}
                        {formatMoneyToString(myNisabToday)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      {t("NisabCard.lastUpdate", {
                        time: formatDateDistance(myNisabTodayTimestamp * 1000),
                      })}
                    </CardContent>
                  </Card>
                )}
                <Card>
                  <CardHeader>
                    <CardDescription className="flex items-center">
                      <ChartBarBig className="h-5 w-5 mr-2" />
                      {t("AssetsCard.title")}
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto"
                        asChild
                      >
                        <Link href="/dashboard/assets">
                          <ChevronRight className="h-6 w-6" />
                        </Link>
                      </Button>
                    </CardDescription>
                    <CardTitle className="text-3xl">
                      {currentProfile.country?.currencySymbol}{" "}
                      {formatMoneyToString(currentProfile.assets?.totalAssets!)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {t("AssetsCard.lastUpdate", {
                      time: formatDateDistance(
                        currentProfile.assets?.lastUpdate!
                      ),
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimateIn>
        )
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};
