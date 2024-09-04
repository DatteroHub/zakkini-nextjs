import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNisabs, getNisabPerCurrency } from "@/utils/actions/nisab";
import { ComboboxItemType } from "@/lib/types";
import { detailedCurrencies, orderedCurrencies } from "@/lib/currencies";
import { useGetProfiles } from "./useGetProfiles";

export const useGetNisabs = ({
  callQuery,
  currencyCode,
}: {
  callQuery?: any;
  currencyCode?: string;
}) => {
  // All Nisabs
  const countryList: ComboboxItemType[] = useMemo(() => {
    const items: ComboboxItemType[] = [];
    for (let key in detailedCurrencies) {
      if (orderedCurrencies.includes(key)) {
        detailedCurrencies[key].countries.map((c) => {
          items.push({
            currencyCode: detailedCurrencies[key].currency_code,
            value: detailedCurrencies[key].currency_symbol,
            label: c,
          });
        });
      }
    }
    return items;
  }, []);

  const nisabData = useQuery({
    queryKey: ["get_nisabs"],
    queryFn: () => getNisabs(),
    enabled: !!callQuery,
  });

  // Single Nisab
  const [myNisabToday, setMyNisabToday] = useState<number | null>(null);
  const { currentProfile } = useGetProfiles();
  const { data, isSuccess } = useQuery({
    queryKey: ["get_single_nisab"],
    queryFn: () => getNisabPerCurrency(currencyCode!),
    enabled: !!currencyCode,
  });

  useEffect(() => {
    if (data && isSuccess && currentProfile) {
      const isGold = currentProfile.metal == "gold";
      setMyNisabToday(isGold ? data.nisab?.gold : data.nisab?.silver);
    }
  }, [data, isSuccess, currentProfile]);

  return { nisabData, myNisabToday, countryList };
};
