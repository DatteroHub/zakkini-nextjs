import { formatDistance } from "date-fns";
import { useLocale } from "next-intl";
import { dateLocales, defaultMoneyLocale } from "./config";

export function formatDateDistance(date: number) {
  const locale = useLocale();
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: dateLocales[locale],
  });
}

export function formatMoneyToString(money: number) {
  return money.toLocaleString(defaultMoneyLocale);
}

export function formatMoneyToStringWithDigits(money: number) {
  return money.toLocaleString(defaultMoneyLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatStringToMoney(money: string) {
  // TODO based on defaultMoneyLocale = "it-IT"
  const normalizedString = money.replace(/\./g, "");
  const numberString = normalizedString.replace(",", ".");
  const parsedNumber = parseFloat(numberString);
  return !isNaN(parsedNumber) ? parsedNumber : 0;
}
