import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentProfileId, getProfiles } from "../actions/profile";
import { UserProlfileType } from "@/lib/zod";

export const useGetProfiles = () => {
  const [currentProfileId, setCurrentProfileId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const getProfileId = async () => {
      const id = await getCurrentProfileId();
      setCurrentProfileId(id);
    };
    getProfileId();
  }, []);

  const allProfiles = useQuery({
    queryKey: ["get_profiles"],
    queryFn: () => getProfiles(),
  });

  const currentProfile: UserProlfileType = useMemo(() => {
    if (allProfiles.data && !allProfiles.isPending) {
      if (currentProfileId) {
        return (
          allProfiles.data.find((p: any) => p.id === currentProfileId) || null
        );
      } else if (allProfiles.data.length > 0) {
        // if not preselected return first one TODO improve multiple
        return allProfiles.data[0];
      }
    } else {
      return null;
    }
  }, [allProfiles.data, allProfiles.isPending, currentProfileId]);

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
      return currentProfile.hDay && currentProfile.isZakater !== undefined;
    } else {
      return false;
    }
  }, [currentProfile]);

  return {
    allProfiles,
    currentProfile,
    isNoProfiles,
    isAssetsConfigured,
    isZDayConfigured,
  };
};
