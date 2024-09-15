"use client";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoneyToStringWithDigits } from "@/utils/localization/helpers";
import { History } from "lucide-react";
const moment = require("moment-hijri");

export const ZakatHistory = () => {
  const locale = useLocale();
  const t = useTranslations("Zakat.History");
  moment.locale(locale);
  const { currentProfile } = useGetProfiles();

  return (
    <>
      {currentProfile &&
        currentProfile.history &&
        currentProfile.history.length && (
          <Card className="w-full">
            <CardHeader>
              <CardDescription className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                {t("title")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex">
              <div className="w-1 flex-1">
                <Table className="whitespace-nowrap">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("head1")}</TableHead>
                      <TableHead>{t("head2")}</TableHead>
                      <TableHead className="text-right">{t("head3")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProfile.history
                      ?.sort((a, b) => b.date! - a.date!)
                      .map((h) => {
                        return (
                          <TableRow key={h.date}>
                            <TableCell>
                              <div className="flex flex-col md:flex-row gap-1">
                                <div className="font-semibold">
                                  {t("gregorian", {
                                    day: h.date,
                                  })}
                                </div>
                                <div>
                                  {moment(h.date).format("(iD iMMM iYYYY)")}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {h.currencySymbol}{" "}
                              {formatMoneyToStringWithDigits(
                                h.assets?.totalAssets!
                              )}
                            </TableCell>
                            <TableCell className="font-semibold text-right">
                              {h.currencySymbol}{" "}
                              {formatMoneyToStringWithDigits(h.zakatAmount!)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
    </>
  );
};
