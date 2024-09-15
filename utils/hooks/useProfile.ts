import { ProfileInfo } from "@/lib/types";
import { setProfile } from "../redux/profileSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { setProfileIdCookie } from "../helpers/cookie";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);

  const setCurrentProfile = (p: ProfileInfo) => {
    dispatch(setProfile({ id: p.id, name: p.name, imgId: p.imgId }));
    setProfileIdCookie(p.id);
  };

  return { profileInfo, setCurrentProfile };
};
