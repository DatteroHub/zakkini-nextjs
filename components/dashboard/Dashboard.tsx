"use client";
import { useTranslations } from "next-intl";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { Skeleton } from "../ui/skeleton";
import EmptyDashboard from "../dashboard/EmptyDashboard";
import { ProfileNotComplete } from "./ProfileNotComplete";

export const Dashboard = () => {
  const t = useTranslations("Dashboard");
  const { currentProfile, isNoProfiles, isAssetsConfigured, isZDayConfigured } =
    useGetProfiles();

  return (
    <div className="flex flex-col w-full h-full mt-2 mb-8">
      {isNoProfiles ? (
        <EmptyDashboard />
      ) : currentProfile ? (
        !isAssetsConfigured || !isZDayConfigured ? (
          <ProfileNotComplete />
        ) : (
          <>
            <div className="grid w-full items-center gap-4">Dashboard</div>
          </>
        )
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};
