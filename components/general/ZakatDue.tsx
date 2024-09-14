"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { HandHeart, Loader2 } from "lucide-react";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  formatDateDistance,
  formatMoneyToStringWithDigits,
  formatStringToMoney,
} from "@/utils/localization/helpers";
import { ProgressCircular } from "../ui-custom/progress";
import { useInputMoney } from "@/utils/hooks/useInputMoney";
import { useUpdateProfile } from "@/utils/hooks/useUpdateProfile";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export const ZakatDue = ({
  setRefreshKey,
}: {
  setRefreshKey: Dispatch<SetStateAction<number>>;
}) => {
  const t = useTranslations("Zakat.ZDueCard");
  const {
    currentProfile,
    isAssetsConfigured,
    isZDayConfigured,
    remainingDays,
  } = useGetProfiles();
  const {
    value: inputValue,
    setValue: setInputValue,
    InputMoney,
  } = useInputMoney({
    label: t("Payment.DialogSub.label"),
    currency: currentProfile?.country?.currencySymbol,
    defaultValue: "0,00",
    focus: true,
    disabled: false,
  });
  const { mutate, isPending, isSuccess, isError } = useUpdateProfile("zakat", {
    zakatPaid: formatStringToMoney(inputValue),
  });
  const [isDialog1Open, setIsDialog1Open] = useState(false);
  const [isDialog2Open, setIsDialog2Open] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast(t("Success.title"));
      setIsDialog1Open(false);
      setIsDialog2Open(false);
      // refresh the component
      setRefreshKey((prevKey) => prevKey + 1);
    }
    if (isError) {
      toast(t("Error.title"), {
        description: t("Error.desc"),
        action: {
          label: t("Error.cta"),
          onClick: () => {},
        },
      });
    }
  }, [isSuccess, isError]);

  return (
    <>
      {remainingDays != undefined && remainingDays < 1 && (
        <Card className="w-full">
          <CardHeader>
            <CardDescription className="flex items-center">
              <HandHeart className="h-5 w-5 mr-2" />
              {t("title")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentProfile &&
            currentProfile.zakatPaid != undefined &&
            isAssetsConfigured &&
            isZDayConfigured ? (
              currentProfile.assets?.lastUpdate! < currentProfile.zDay! ? (
                <div className="grid gap-4">
                  <Label className="text-xl text-destructive">
                    {t("UpdateAssets.actionReq")}
                  </Label>
                  <div className="flex items-center max-w-72 gap-8">
                    <Separator orientation="vertical" className="w-0.5 h-48" />
                    <div className="grid gap-4">
                      <Label className="text-base text-primary">
                        {t("UpdateAssets.title")}
                      </Label>
                      <Label className="font-normal leading-tight">
                        {t("UpdateAssets.update")}
                      </Label>
                      <Label className="text-muted-foreground font-normal">
                        {t("UpdateAssets.lastUpdate", {
                          date: formatDateDistance(
                            currentProfile.assets?.lastUpdate!
                          ),
                        })}
                      </Label>
                      <Button variant="outline" className="w-fit" asChild>
                        <Link href="/dashboard/assets">
                          {t("UpdateAssets.cta")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-xl text-primary">
                      {t("Payment.title")}
                    </Label>
                    <div className="px-4 py-2 w-fit bg-primary rounded text-3xl text-white font-semibold">
                      {currentProfile.country?.currencySymbol}{" "}
                      {formatMoneyToStringWithDigits(
                        currentProfile.assets?.totalAssets! / 40
                      )}
                    </div>
                  </div>
                  <Separator className="w-full my-4 mx-auto" />
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="grid gap-4">
                      <Label className="text-lg text-foreground">
                        {t("Payment.zakatPaid")}
                      </Label>
                      <div className="flex flex-wrap gap-6 lg:gap-12">
                        <div className="grid gap-2">
                          <Label className="text-muted-foreground">
                            {t("Payment.paid")}
                          </Label>
                          <div>
                            {currentProfile.country?.currencySymbol}{" "}
                            {formatMoneyToStringWithDigits(
                              currentProfile.zakatPaid
                            )}
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-muted-foreground">
                            {t("Payment.remaining")}
                          </Label>
                          <div>
                            {currentProfile.country?.currencySymbol}{" "}
                            {formatMoneyToStringWithDigits(
                              Math.abs(
                                currentProfile.assets?.totalAssets! / 40 -
                                  currentProfile.zakatPaid
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ProgressCircular
                        value={
                          (currentProfile.zakatPaid * 4000) /
                          currentProfile.assets?.totalAssets!
                        }
                        activeColor="#217682"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-6">
                    <Dialog
                      open={isDialog1Open}
                      onOpenChange={setIsDialog1Open}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="py-6"
                          onClick={() => {
                            setInputValue(formatMoneyToStringWithDigits(0));
                          }}
                        >
                          {t("Payment.ctaPaidSub")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            {t("Payment.DialogSub.title")}
                          </DialogTitle>
                          <DialogDescription>
                            {t("Payment.DialogSub.desc")}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">{InputMoney}</div>
                        <DialogFooter>
                          <Button
                            disabled={isPending ? true : false}
                            onClick={() => {
                              formatStringToMoney(inputValue) && mutate();
                            }}
                          >
                            {isPending && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {t("Payment.DialogSub.cta")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={isDialog2Open}
                      onOpenChange={setIsDialog2Open}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="py-6"
                          onClick={() => {
                            setInputValue(
                              formatMoneyToStringWithDigits(
                                currentProfile.assets?.totalAssets! / 40
                              )
                            );
                          }}
                        >
                          {t("Payment.ctaPaidFull")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            {t("Payment.DialogFull.title")}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Label className="font-normal leading-tight">
                            {t("Payment.DialogFull.body")}
                          </Label>
                          <Label className="text-primary">
                            {t("Payment.DialogFull.label", {
                              currency: currentProfile.country?.currencySymbol,
                              total: formatMoneyToStringWithDigits(
                                currentProfile.assets?.totalAssets! / 40
                              ),
                            })}
                          </Label>
                        </div>
                        <DialogFooter>
                          <Button
                            disabled={isPending ? true : false}
                            onClick={() => {
                              formatStringToMoney(inputValue) && mutate();
                            }}
                          >
                            {isPending && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {t("Payment.DialogFull.cta")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )
            ) : (
              <Skeleton className="w-full h-60" />
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};
