"use client";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ComboboxItemType } from "@/lib/types";
import { Label } from "../ui/label";
import { ComboboxResponsive } from "../general/Combobox";
import { Infobox } from "../general/Infobox";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ArrowLeftRight, Info, Weight } from "lucide-react";
import { detailedCurrencies, orderedCurrencies } from "@/lib/currencies";
import { useGetNisabs } from "@/utils/hooks/useGetNisabs";
import { formatDateDistance } from "@/utils/localization/helpers";
import { useTranslations } from "next-intl";

export default function Step2({
  country,
  setCountry,
  isGold,
  setIsGold,
}: {
  country: ComboboxItemType | null;
  setCountry: Dispatch<SetStateAction<ComboboxItemType | null>>;
  isGold: boolean;
  setIsGold: Dispatch<SetStateAction<boolean>>;
}) {
  const t = useTranslations("NewProfile.Step2");
  const { data: nisabData, isPending } = useGetNisabs(country);

  const items: ComboboxItemType[] = useMemo(() => {
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

  const formatPrice = (price: number) => {
    // TODO add support to other locals
    return price.toLocaleString("de-DE");
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="grid w-full items-center gap-4">
        <Label htmlFor="name">{t("Country.title")}</Label>
        <Infobox
          title={t("Country.infoTitle")}
          description={t("Country.infoDesc")}
        />
        <ComboboxResponsive
          comboboxItems={items}
          selectedItem={country}
          setSelectedItem={setCountry}
          label={t("Country.select")}
          searchLabel={t("Country.search")}
          notFoundLabel={t("Country.searchNotFound")}
          width="w-full"
        />
      </div>
      <div
        className={`grid w-full items-center gap-4 ${
          !country ? "invisible" : ""
        }`}
      >
        <Label htmlFor="name">
          {t("Nisab.title", { country: country?.label })}
        </Label>
        {isPending || !nisabData ? (
          <Skeleton className="w-full h-56" />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex w-full h-full items-center justify-center text-center text-lg font-bold p-2 rounded-lg border-1 border-gray-200">
                {country?.value}{" "}
                {isGold
                  ? formatPrice(nisabData.nisab[country?.currencyCode!].gold)
                  : formatPrice(nisabData.nisab[country?.currencyCode!].silver)}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Weight className="mr-2 h-4 w-4" />
                  {isGold ? t("Nisab.inGold") : t("Nisab.inSilver")}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsGold((prev) => !prev)}
                >
                  <ArrowLeftRight className="mr-2 h-4 w-4" />
                  {isGold ? t("Nisab.switchSilver") : t("Nisab.switchGold")}
                </Button>
              </div>
            </div>
            <div className="flex gap-2 items-center text-sm text-muted-foreground">
              <Info className="h-4 w-4" color="#757E88" />
              {t("Nisab.lastUpdate", {
                time: formatDateDistance(nisabData.timestamp * 1000),
              })}
            </div>
            <Infobox
              title={t("Nisab.infoTitle")}
              description={t("Nisab.infoDesc")}
            />
          </>
        )}
      </div>
    </div>
  );
}
