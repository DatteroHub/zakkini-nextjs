import { useMutation } from "@tanstack/react-query";
import { addProfile } from "../actions/profile";
import { ComboboxItemType } from "@/lib/types";

export const useAddProfile = (
  name: string,
  image: number,
  country: ComboboxItemType | null | undefined,
  isGold: boolean
) => {
  return useMutation({
    mutationFn: () => addProfile(name, image, country, isGold),
  });
};
