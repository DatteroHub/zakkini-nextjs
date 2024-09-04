"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import EmptyDashboard from "../dashboard/EmptyDashboard";
import { ProfileNotComplete } from "../dashboard/ProfileNotComplete";
import AnimateIn from "../animation/animate";
import { ProfileStatus } from "../general/ProfileStatus";
import { Infobox } from "../general/Infobox";
import { HawlDay } from "../general/HawlDay";

export const MyZakat = () => {
  const t = useTranslations("Zakat");
  const { currentProfile, isNoProfiles, isAssetsConfigured } = useGetProfiles();
  const [zDate, setZDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col w-full h-full mt-2 mb-2">
      {isNoProfiles ? (
        <EmptyDashboard />
      ) : currentProfile ? (
        !isAssetsConfigured || !currentProfile.isZakater ? (
          <ProfileNotComplete />
        ) : (
          <div className="flex flex-col w-full h-full mt-2 mb-8">
            <AnimateIn
              from="opacity-0 translate-y-2"
              to="opacity-100 translate-y-0"
            >
              <div className="grid w-full items-center gap-4">
                <ProfileStatus isZakater={true} imgId={currentProfile.imgId!} />
                <Infobox
                  title={t("infoTitle")}
                  description={t.rich("infoDesc", { br: () => <br /> })}
                />
                <HawlDay zDate={zDate} setZDate={setZDate} />
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
