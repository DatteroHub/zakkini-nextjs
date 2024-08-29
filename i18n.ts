import { getRequestConfig } from "next-intl/server";
import deepmerge from "deepmerge";
import { getUserLocale } from "@/utils/localization/actions";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  const userMessages = (await import(`@/translations/${locale}.json`)).default;
  const defaultMessages = (await import(`@/translations/en.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    locale,
    messages,
  };
});
