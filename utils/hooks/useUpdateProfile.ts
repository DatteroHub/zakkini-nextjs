import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../actions/profile";
import { useRouter } from "next/navigation";
import { useProfile } from "./useProfile";

export const useUpdateProfile = (type: string, newData: any) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { profileInfo } = useProfile();

  return useMutation({
    mutationFn: () => updateProfile(profileInfo?.id!, type, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_profiles"] });
      router.push(window.location.href);
      router.refresh();
    },
  });
};
