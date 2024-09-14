"use client";
import Image from "next/image";
import { Crown } from "lucide-react";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";

export const ProfileStatus = ({
  isZakater,
  imgId,
  noMotion,
}: {
  isZakater: boolean;
  imgId: number;
  noMotion?: boolean;
}) => {
  const t = useTranslations("ProfileStatus");
  return (
    <>
      {isZakater ? (
        <div
          className={`flex w-full items-center gap-4 -mb-2 p-4 rounded-lg bg-white ${
            noMotion ? "border border-gray-200" : "border-2 border-primary"
          } shadow-sm`}
        >
          <div className="relative border-4 border-primary rounded-full">
            <Image
              src={`/avatar_${imgId}.png`}
              alt="zakkini icon"
              width="52"
              height="52"
              className="w-16 h-16"
            />
            <div
              className={`absolute -top-2 -right-2 rounded-full bg-primary p-2 ${
                !noMotion ? "animate-bounce" : ""
              }`}
            >
              <Crown className="h-4 w-4" color="#fff" />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <Label className="text-primary  text-lg font-semibold">
              {t("Zakater.title")}
            </Label>
            <Label className="text-muted-foreground leading-normal lg:leading-relaxed">
              {t("Zakater.desc")}
            </Label>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center gap-4 p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
          <div className="border-2 border-gray-400 rounded-full">
            <Image
              src={`/avatar_${imgId}.png`}
              alt="zakkini icon"
              width="52"
              height="52"
              className="w-16 h-16 opacity-50"
            />
          </div>
          <div className="flex flex-col flex-1">
            <Label className="text-lg font-semibold">
              {t("NonZakater.title")}
            </Label>
            <Label className="text-muted-foreground leading-normal lg:leading-relaxed">
              {t("NonZakater.desc")}
            </Label>
          </div>
        </div>
      )}
    </>
  );
};
