"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { dateLocales } from "@/utils/localization/config";
import { Button } from "../ui/button";
import { Infobox } from "./Infobox";
const moment = require("moment-hijri");

export const HawlDay = ({
  zDate,
  setZDate,
}: {
  zDate: Date | undefined;
  setZDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const locale = useLocale();
  const t = useTranslations("Zakat.Hawl");
  moment.locale(locale);
  const [showQ1, setShowQ1] = useState(true);
  const [calendarLabel, setCalendarLabel] = useState("");

  const yesNoBtn = (yesClick: () => void, noClick: () => void) => {
    return (
      <div className="flex justify-around">
        <Button variant="outline" onClick={noClick}>
          {t("no")}
        </Button>
        <Button onClick={yesClick}>{t("yes")}</Button>
      </div>
    );
  };

  const showCalendar = () => {
    setCalendarLabel(t("inputTitle"));
    setShowQ1(false);
  };
  const showQ2 = () => {};

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      {showQ1 && (
        <div className="grid gap-6">
          <Label>{t("q1Label")}</Label>
          {yesNoBtn(showCalendar, showQ2)}
        </div>
      )}
      {calendarLabel.length > 0 && (
        <div className="grid w-full gap-4">
          <Label className="mb-1">{calendarLabel}</Label>
          <Infobox
            title={t("infoTitle")}
            description={t("infoDesc")}
          />
          <div className="flex justify-center">
            <Calendar
              mode="single"
              locale={dateLocales[locale]}
              selected={zDate}
              onSelect={setZDate}
              className="rounded-md border w-fit"
            />
          </div>
          <Label className="text-center text-muted-foreground">
            {t("hawlDay", {
              day: zDate,
              hijri: moment(zDate).format("iDD iMMMM iYYYY"),
            })}
          </Label>
        </div>
      )}
    </div>
  );
};
