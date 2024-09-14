"use client";
import { SetStateAction, useEffect, useMemo, useState, Dispatch } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { dateLocales } from "@/utils/localization/config";
import { Button } from "../ui/button";
import { Infobox } from "../general/Infobox";
import AnimateIn from "../animation/animate";
import { useUpdateProfile } from "@/utils/hooks/useUpdateProfile";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const moment = require("moment-hijri");

export const SelectZakatDay = ({
  setIsEditing,
  children,
}: {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const locale = useLocale();
  const t = useTranslations("Zakat.Hawl");
  moment.locale(locale);
  const [showQ, setShowQ] = useState(1);
  const [tKey, setTKey] = useState("");
  const [selectedBtn, setSelectedBtn] = useState(0);
  const today = new Date().setHours(0,0,0,0)
  const [zDate, setZDate] = useState<Date | undefined>(new Date(today));
  const { mutate, isPending, isSuccess, isError } = useUpdateProfile(
    "zakatDay",
    {
      zDay: zDate?.getTime(),
    }
  );

  useEffect(() => {
    if (isSuccess) {
      toast(t("Success.title"));
      setIsEditing(false);
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

  const showYes1 = () => {
    setTKey("Yes1.");
    setSelectedBtn(2);
  };
  const showYes2 = () => {
    setTKey("Yes2.");
    setSelectedBtn(2);
  };
  const showNo2 = () => {
    setTKey("No2.");
    setSelectedBtn(1);
  };
  const showQ2 = () => {
    setShowQ(2);
    setTKey("");
    setSelectedBtn(0);
  };

  const yesNoBtn = (yesClick: () => void, noClick: () => void) => {
    return (
      <div className="flex justify-center gap-16">
        <Button
          variant={`${selectedBtn == 1 ? "secondary" : "outline"}`}
          onClick={noClick}
        >
          {t("no")}
        </Button>
        <Button
          variant={`${selectedBtn == 2 ? "secondary" : "outline"}`}
          onClick={yesClick}
        >
          {t("yes")}
        </Button>
      </div>
    );
  };

  const dynamicInfoBox = useMemo(
    () => (
      <>
        <Label className="mb-1">{t(tKey + "labelTitle")}</Label>
        <Infobox
          title={t(tKey + "infoTitle")}
          description={t(tKey + "infoDesc")}
        />
      </>
    ),
    [tKey]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
      <div className="flex flex-col w-full max-w-[500px] items-center gap-6">
        {children}
        {showQ == 1 && (
          <div className="flex flex-col gap-8 max-w-72 min-h-44 justify-center text-center">
            <AnimateIn
              from="opacity-0 translate-y-2"
              to="opacity-100 translate-y-0"
            >
              <Label className="leading-relaxed">{t("q1Label")}</Label>
            </AnimateIn>
            {yesNoBtn(showYes1, showQ2)}
          </div>
        )}
        {showQ == 2 && (
          <div className="flex flex-col gap-8 max-w-72 min-h-44 justify-center text-center">
            <AnimateIn
              from="opacity-0 translate-y-2"
              to="opacity-100 translate-y-0"
            >
              <Label className="leading-relaxed">{t("q2Label")}</Label>
            </AnimateIn>
            {yesNoBtn(showYes2, showNo2)}
          </div>
        )}
      </div>
      <div className="flex flex-col w-full max-w-[500px] items-center gap-8">
        {tKey.length > 0 && (
          <AnimateIn
            from="opacity-0 -translate-x-2"
            to="opacity-100 translate-x-0"
          >
            <div className="grid w-full gap-4">
              {dynamicInfoBox}
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  locale={dateLocales[locale]}
                  selected={zDate}
                  onSelect={setZDate}
                  className="rounded-md border w-fit"
                />
              </div>
              <Label className="text-center text-primary mt-2">
                {t("zDay", {
                  day: zDate,
                  hijri: moment(zDate).format("iD iMMMM iYYYY"),
                })}
              </Label>
              <Label className="text-center text-muted-foreground underline mb-4">
                {t("zDayNB")}
              </Label>
              <Button
                className="w-1/2 mx-auto"
                disabled={isPending ? true : false}
                onClick={() => {
                  zDate && mutate();
                }}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("save")}
              </Button>
            </div>
          </AnimateIn>
        )}
      </div>
    </div>
  );
};
