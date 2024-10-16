import { ProfileInfo } from "@/lib/types";
import { setProfile, clearProfile } from "../redux/profileSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { setProfileIdCookie, removeProfileIdCookie } from "../helpers/cookie";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);

  const setCurrentProfile = (p: ProfileInfo) => {
    dispatch(setProfile({ id: p.id, name: p.name, imgId: p.imgId }));
    setProfileIdCookie(p.id);
  };

  const clearCurrentProfile = () => {
    dispatch(clearProfile());
    removeProfileIdCookie();
  };

  return { profileInfo, setCurrentProfile, clearCurrentProfile };
};
