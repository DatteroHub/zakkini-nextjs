import { formatDistance } from "date-fns";
import { useLocale } from "next-intl";
import { dateLocales } from "./config";

export function formatDateDistance(date: number) {
  const locale = useLocale();
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: dateLocales[locale],
  });
}
