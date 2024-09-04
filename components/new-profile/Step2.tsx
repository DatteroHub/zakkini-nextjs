"use client";
import { Dispatch, SetStateAction, useMemo, useEffect } from "react";
import { ComboboxItemType } from "@/lib/types";
import { Label } from "../ui/label";
import { ComboboxResponsive } from "../nisab/Combobox";
import { Infobox } from "../general/Infobox";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ArrowLeftRight, Info, Weight } from "lucide-react";
import { useGetNisabs } from "@/utils/hooks/useGetNisabs";
import {
  formatDateDistance,
  formatMoneyToString,
} from "@/utils/localization/helpers";
import { useTranslations } from "next-intl";

export default function Step2({
  country,
  setCountry,
  setNisabValue,
  isGold,
  setIsGold,
}: {
  country: ComboboxItemType | null | undefined;
  setCountry: Dispatch<SetStateAction<ComboboxItemType | null | undefined>>;
  setNisabValue: Dispatch<SetStateAction<number>>;
  isGold: boolean;
  setIsGold: Dispatch<SetStateAction<boolean>>;
}) {
  const t = useTranslations("NewProfile.Step2");
  const {
    nisabData: { data: nisabData, isPending },
    countryList,
  } = useGetNisabs({ callQuery: country });

  useEffect(() => {
    if (country && nisabData && !isPending) {
      setNisabValue(
        isGold
          ? nisabData.nisab[country.currencyCode!].gold
          : nisabData.nisab[country?.currencyCode!].silver
      );
    }
  }, [country, nisabData, isPending, isGold]);

  return (
    <div className="flex flex-col w-full md:w-[450px] gap-8">
      <div className="grid w-full items-center gap-4">
        <Label>{t("Country.title")}</Label>
        <Infobox
          title={t("Country.infoTitle")}
          description={t("Country.infoDesc")}
        />
        <ComboboxResponsive
          comboboxItems={countryList}
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
        <Label className="mb-1">
          {t("Nisab.title", { country: country?.label })}
        </Label>
        {isPending || !nisabData ? (
          <Skeleton className="w-full h-56" />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex w-full h-full items-center justify-center text-center text-lg font-bold p-2 rounded-lg border border-gray-200 bg-white">
                {country?.value}{" "}
                {isGold
                  ? formatMoneyToString(
                      nisabData.nisab[country?.currencyCode!].gold
                    )
                  : formatMoneyToString(
                      nisabData.nisab[country?.currencyCode!].silver
                    )}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Infobox
                title={t("Nisab.infoTitle")}
                description={t("Nisab.infoDesc")}
              />
              <Infobox
                title={t("Nisab.GoldSilver.infoTitle")}
                description={t("Nisab.GoldSilver.infoDesc")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
