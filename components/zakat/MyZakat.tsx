"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { Skeleton } from "../ui/skeleton";
import EmptyDashboard from "../dashboard/EmptyDashboard";
import { ProfileNotComplete } from "../dashboard/ProfileNotComplete";
import AnimateIn from "../animation/animate";
import { ProfileStatus } from "../general/ProfileStatus";
import { Infobox } from "../general/Infobox";
import { SelectZakatDay } from "./SelectZakatDay";
import { ZakatDay } from "../general/ZakatDay";
import { ZakatDue } from "../general/ZakatDue";
import { ZakatHistory } from "./ZakatHistory";

export const MyZakat = () => {
  const t = useTranslations("Zakat");
  const [isEditing, setIsEditing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { currentProfile, isNoProfiles, isAssetsConfigured, isZDayConfigured } =
    useGetProfiles();

  return (
    <div className="flex flex-col w-full h-full mt-2 mb-2">
      {isNoProfiles ? (
        <EmptyDashboard />
      ) : currentProfile ? (
        !isAssetsConfigured || !currentProfile.isZakater ? (
          <ProfileNotComplete />
        ) : !isZDayConfigured || isEditing ? (
          <div className="flex flex-col w-full h-full mt-2 mb-8">
            <AnimateIn
              from="opacity-0 translate-y-2"
              to="opacity-100 translate-y-0"
            >
              <div className="flex flex-col w-full gap-6">
                <SelectZakatDay setIsEditing={setIsEditing}>
                  <ProfileStatus
                    isZakater={true}
                    imgId={currentProfile.imgId!}
                  />
                  <Infobox
                    title={t("infoTitle")}
                    description={t.rich("infoDesc", { br: () => <br /> })}
                  />
                </SelectZakatDay>
              </div>
            </AnimateIn>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full mt-2 mb-8">
            <AnimateIn
              from="opacity-0 translate-y-2"
              to="opacity-100 translate-y-0"
            >
              <div className="flex flex-col w-full gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
                  <div className="flex flex-col w-full max-w-[500px] items-center gap-6">
                    <ProfileStatus
                      isZakater={true}
                      imgId={currentProfile.imgId!}
                      noMotion
                    />
                    <ZakatDay
                      key={refreshKey}
                      setIsEditing={setIsEditing}
                      isZakatPage
                    />
                  </div>
                  <div className="flex flex-col w-full max-w-[500px] items-center gap-6">
                    <ZakatDue key={refreshKey} setRefreshKey={setRefreshKey} />
                  </div>
                </div>
                <ZakatHistory />
              </div>
            </AnimateIn>
          </div>
        )
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};
