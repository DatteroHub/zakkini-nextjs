"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { useInputMoney } from "@/utils/hooks/useInputMoney";
import {
  formatDateDistance,
  formatMoneyToString,
  formatMoneyToStringWithDigits,
  formatStringToMoney,
} from "@/utils/localization/helpers";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import EmptyDashboard from "../dashboard/EmptyDashboard";
import { Button } from "../ui/button";
import { Loader2, SquarePen } from "lucide-react";
import { useUpdateProfile } from "@/utils/hooks/useUpdateProfile";
import { toast } from "sonner";
import AnimateIn from "../animation/animate";
import { useGetNisabs } from "@/utils/hooks/useGetNisabs";

export const Assets = () => {
  const t = useTranslations("Assets");
  const { currentProfile, isNoProfiles, isAssetsConfigured } = useGetProfiles();
  const { myNisabToday } = useGetNisabs({
    currencyCode: currentProfile?.country?.currencyCode,
  });
  const INPUT_1_INDEX = 0;
  const [assetsArray, setAssetsArray] = useState<string[]>(["0,00"]);
  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const { value: value1, InputMoney: InputMoney1 } = useInputMoney({
    label: t("moneyLabel"),
    currency: currentProfile?.country?.currencySymbol,
    defaultValue: assetsArray[INPUT_1_INDEX],
    focus: true,
    disabled: !isEditing,
  });
  const { mutate, isPending, isSuccess, isError } = useUpdateProfile("assets", {
    totalAssets,
    isZakater: myNisabToday! <= totalAssets,
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
    if (currentProfile && !isAssetsConfigured) {
      setIsEditing(true);
    }
    if (currentProfile && isAssetsConfigured) {
      setTotalAssets(currentProfile.assets?.totalAssets!);
    }
  }, [currentProfile, isAssetsConfigured]);

  useEffect(() => {
    if (value1) {
      const newAssetsArray = assetsArray.map((val, i) => {
        return i === INPUT_1_INDEX ? value1 : val;
      });
      setAssetsArray(newAssetsArray);
      setTotalAssets(formatStringToMoney(value1));
    }
  }, [value1]);

  return (
    <div className="flex flex-col w-full h-full mt-2 mb-8">
      {isNoProfiles ? (
        <EmptyDashboard />
      ) : currentProfile ? (
        <AnimateIn
          from="opacity-0 translate-y-2"
          to="opacity-100 translate-y-0"
          className="flex flex-col h-full gap-4"
        >
          <div className="flex justify-between items-center">
            {currentProfile.assets?.lastUpdate && (
              <Label className="text-muted-foreground">
                {t("lastUpdate", {
                  date: formatDateDistance(currentProfile.assets?.lastUpdate),
                })}
              </Label>
            )}
            <div className="flex justify-end">
              {isEditing ? (
                <>
                  <Button
                    variant="link"
                    className="text-foreground"
                    onClick={() => setIsEditing(false)}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    variant="outline"
                    disabled={isPending ? true : false}
                    onClick={() => {
                      myNisabToday && mutate();
                    }}
                  >
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {t("save")}
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <SquarePen className="mr-2 h-4 w-4" />
                  {t("edit")}
                </Button>
              )}
            </div>
          </div>
          <div className="grid w-full items-center gap-4">{InputMoney1}</div>
          <Label className="flex justify-center text-center text-muted-foreground mt-auto">
            {myNisabToday ? (
              t("totalAssets", {
                currency: currentProfile.country?.currencySymbol,
                nisab: formatMoneyToString(myNisabToday),
                money: formatMoneyToStringWithDigits(totalAssets),
              })
            ) : (
              <Skeleton className="w-56 h-10" />
            )}
          </Label>
        </AnimateIn>
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};
