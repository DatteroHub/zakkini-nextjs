import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../actions/profile";
import { UserProlfileType } from "@/lib/zod";
import { differenceInCalendarDays } from "date-fns";
import { ProfileInfo } from "@/lib/types";
import { useProfile } from "./useProfile";
import { useModal } from "@/components/context/ModalContext";
import { getProfileIdCookie } from "../helpers/cookie";

export const useGetProfiles = () => {
  const pathname = usePathname();
  const { profileInfo, setCurrentProfile } = useProfile();
  const { openModal, enablePreventClose } = useModal();
  const [currentProfileIdCookie, setCurrentProfileIdCookie] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const getProfileId = async () => {
      const id = await getProfileIdCookie();
      setCurrentProfileIdCookie(id);
    };
    getProfileId();
  }, []);

  const allProfiles = useQuery({
    queryKey: ["get_profiles"],
    queryFn: () => getProfiles(),
  });

  const currentProfile: UserProlfileType = useMemo(() => {
    if (
      allProfiles.data &&
      !allProfiles.isPending &&
      allProfiles.data.length > 0
    ) {
      const currentProfileId = profileInfo?.id;
      if (currentProfileId) {
        const selectedProfile =
          allProfiles.data.find((p: any) => p.id === currentProfileId) || null;
        return selectedProfile;
      } else if (currentProfileIdCookie != undefined) {
        const selectedProfile =
          allProfiles.data.find((p: any) => p.id === currentProfileIdCookie) ||
          null;
        if (selectedProfile) {
          const profile: ProfileInfo = {
            id: selectedProfile.id,
            name: selectedProfile.name,
            imgId: selectedProfile.imgId,
          };
          setCurrentProfile(profile);
        }
        return selectedProfile;
      } else {
        if (pathname !== "/dashboard/new-profile") {
          enablePreventClose();
          openModal();
        }
        return null;
      }
    } else {
      return null;
    }
  }, [
    allProfiles.data,
    allProfiles.isPending,
    profileInfo,
    currentProfileIdCookie,
  ]);

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
