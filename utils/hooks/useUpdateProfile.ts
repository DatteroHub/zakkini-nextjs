import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../actions/profile";

export const useUpdateProfile = (type: string, newData: any) => {
  return useMutation({
    mutationFn: () => updateProfile(type, newData),
  });
};
