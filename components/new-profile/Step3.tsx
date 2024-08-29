"use client";
import {useTranslations} from 'next-intl';

export default function Step3() {
  const t = useTranslations('NewProfile.Step3');
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="grid w-full items-center gap-4">
      {t("title")}
      </div>
    </div>
  );
}
