import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProfile } from "../actions/profile";
import { ComboboxItemType } from "@/lib/types";

export const useAddProfile = (
  name: string,
  image: number,
  country: ComboboxItemType | null | undefined,
  isGold: boolean
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addProfile(name, image, country, isGold),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_profiles"] });
    },
  });
};
