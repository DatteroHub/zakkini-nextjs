import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCurrentProfileId,
  setCurrentProfileId,
  getProfiles,
} from "../actions/profile";
import { UserProlfileType } from "@/lib/zod";
import { differenceInCalendarDays } from "date-fns";

export const useGetProfiles = () => {
  const [cookieProfileId, setCookieProfileId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const getProfileId = async () => {
      const id = await getCurrentProfileId();
      setCookieProfileId(id);
    };
    getProfileId();
  }, []);

  const allProfiles = useQuery({
    queryKey: ["get_profiles"],
    queryFn: () => getProfiles(),
  });

  const currentProfile: UserProlfileType = useMemo(() => {
    if (allProfiles.data && !allProfiles.isPending) {
      if (cookieProfileId) {
        return (
          allProfiles.data.find((p: any) => p.id === cookieProfileId) || null
        );
      } else if (allProfiles.data.length > 0) {
        // if not preselected return first one TODO improve multiple
        setCurrentProfileId(allProfiles.data[0].id);
        return allProfiles.data[0];
      }
    } else {
      return null;
    }
  }, [allProfiles.data, allProfiles.isPending, cookieProfileId]);

  const isNoProfiles = useMemo(() => {
    if (allProfiles.data && !allProfiles.isPending) {
      return allProfiles.data.length === 0;
    } else {
      return false;
    }
  }, [allProfiles.data, allProfiles.isPending]);

  const isAssetsConfigured = useMemo(() => {
    if (currentProfile) {
      return currentProfile.assets && Object.keys(currentProfile.assets).length;
    } else {
      return false;
    }
  }, [currentProfile]);

  const isZDayConfigured = useMemo(() => {
    if (currentProfile) {
      return currentProfile.zDay && currentProfile.isZakater;
    } else {
      return false;
    }
  }, [currentProfile]);

  const remainingDays = useMemo(() => {
    if (currentProfile && isZDayConfigured) {
      return differenceInCalendarDays(
        new Date(currentProfile.zDay!),
        new Date()
      );
    }
  }, [currentProfile, isZDayConfigured]);

  return {
    allProfiles,
    currentProfile,
    isNoProfiles,
    isAssetsConfigured,
    isZDayConfigured,
    remainingDays,
  };
};
