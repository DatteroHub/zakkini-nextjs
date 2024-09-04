"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import EmptyDashboard from "../dashboard/EmptyDashboard";
import { Infobox } from "../general/Infobox";
import { ComboboxResponsive } from "./Combobox";
import {
  formatDateDistance,
  formatMoneyToString,
} from "@/utils/localization/helpers";
import {
  ArrowLeftRight,
  Info,
  Loader2,
  SquareCheckBig,
  SquarePen,
  Weight,
} from "lucide-react";
import { Button } from "../ui/button";
import { useGetNisabs } from "@/utils/hooks/useGetNisabs";
import { ComboboxItemType } from "@/lib/types";
import AnimateIn from "../animation/animate";
import { useUpdateProfile } from "@/utils/hooks/useUpdateProfile";
import { toast } from "sonner";

export const Nisab = () => {
  const t = useTranslations("Nisab");
  const { currentProfile, isNoProfiles, isAssetsConfigured } = useGetProfiles();
  const {
    nisabData: { data: nisabData, isPending: isGetPending },
    countryList,
  } = useGetNisabs({ callQuery: currentProfile });
  const [country, setCountry] = useState<ComboboxItemType | null | undefined>(
    null
  );
  const [isGold, setIsGold] = useState<boolean | undefined>(true);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate, isPending, isSuccess, isError } = useUpdateProfile("nisab", {
    country: {
      name: country?.label,
      currencySymbol: country?.value,
      currencyCode: country?.currencyCode,
    },
    metal: isGold ? "gold" : "silver",
    isZakater:
      currentProfile?.assets?.totalAssets! >=
      (isGold
        ? nisabData?.nisab[country?.currencyCode!]?.gold
        : nisabData?.nisab[country?.currencyCode!]?.silver),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsEditing(false);
      toast(t("Success.title"));
    }
    if (isError) {
      setIsEditing(false);
      toast(t("Error.title"), {
        description: t("Error.desc"),
        action: {
          label: t("Error.cta"),
          onClick: () => {},
        },
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (currentProfile && countryList) {
      const selectedCountry = countryList.find(
        (country) =>
          country.label + country.value ===
          currentProfile.country?.name! +
            currentProfile.country?.currencySymbol!
      );
      const selectedGold = currentProfile.metal === "gold";
      setCountry(selectedCountry);
      setIsGold(selectedGold);
    }
  }, [currentProfile, countryList]);

  return (
    <div className="flex flex-col w-full h-full mt-2 mb-8">
      {isNoProfiles ? (
        <EmptyDashboard />
      ) : currentProfile ? (
        <AnimateIn
          from="opacity-0 translate-y-2"
          to="opacity-100 translate-y-0"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
            <div className="flex flex-col w-full max-w-[500px] gap-8">
              <div className="grid gap-4">
                <div className="flex justify-end">
                  {isEditing ? (
                    <>
                      <Button
                        variant="link"
                        className="text-foreground"
                        onClick={() => setIsEditing(false)}
                      >
                        {t("Country.cancel")}
                      </Button>
                      <Button
                        variant="outline"
                        disabled={isPending ? true : false}
                        onClick={() => {
                          isAssetsConfigured && nisabData && mutate();
                        }}
                      >
                        {isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {t("Country.save")}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing((prev) => !prev)}
                    >
                      <SquarePen className="mr-2 h-4 w-4" />
                      {t("Country.edit")}
                    </Button>
                  )}
                </div>
                <Label>{t("Country.title")}</Label>
                <ComboboxResponsive
                  comboboxItems={countryList}
                  selectedItem={country}
                  setSelectedItem={setCountry}
                  label={t("Country.select")}
                  searchLabel={t("Country.search")}
                  notFoundLabel={t("Country.searchNotFound")}
                  width="w-full"
                  disabled={!isEditing}
                />
              </div>
              <div className="grid gap-4">
                <Label className="mb-1">
                  {t("Nisab.title", { country: country?.label })}
                </Label>
                {isGetPending || !nisabData || !country ? (
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
                          disabled={!isEditing}
                          onClick={() => setIsGold((prev) => !prev)}
                        >
                          <ArrowLeftRight className="mr-2 h-4 w-4" />
                          {isGold
                            ? t("Nisab.switchSilver")
                            : t("Nisab.switchGold")}
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center text-sm text-muted-foreground">
                      <Info className="h-4 w-4" color="#757E88" />
                      {t("Nisab.lastUpdate", {
                        time: formatDateDistance(nisabData.timestamp * 1000),
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full max-w-[500px] gap-4">
              <Label>{t("faqs")}</Label>
              <div className="grid gap-4">
                <Infobox
                  title={t("Country.infoTitle")}
                  description={t("Country.infoDesc")}
                />
                <Infobox
                  title={t("Nisab.infoTitle")}
                  description={t("Nisab.infoDesc")}
                />
                <Infobox
                  title={t("Nisab.GoldSilver.infoTitle")}
                  description={t("Nisab.GoldSilver.infoDesc")}
                />
              </div>
            </div>
          </div>
        </AnimateIn>
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};
