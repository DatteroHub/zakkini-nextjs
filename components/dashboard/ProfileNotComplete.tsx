"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import AnimateIn from "../animation/animate";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { NisabAssetsChart } from "../general/NisabAssetsChart";
import { useGetNisabs } from "@/utils/hooks/useGetNisabs";
import { ProfileStatus } from "../general/ProfileStatus";
import { ArrowUpRight } from "lucide-react";

export const ProfileNotComplete = () => {
  const t = useTranslations("Dashboard.NotComplete");
  const { currentProfile, isAssetsConfigured, isZDayConfigured } =
    useGetProfiles();
  const { myNisabToday } = useGetNisabs({
    currencyCode: currentProfile?.country?.currencyCode,
  });

  const Checked = ({ label }: { label: string }) => (
    <li className="flex items-center gap-2">
      <span className="rounded p-1.5 bg-primary text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span className="text-primary">{label}</span>
    </li>
  );

  return (
    <div className="flex flex-1">
      <AnimateIn from="opacity-0 translate-y-2" to="opacity-100 translate-y-0">
        {currentProfile && myNisabToday && (
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
            {isAssetsConfigured && (
              <div className="flex flex-col w-full max-w-[500px] gap-8">
                {currentProfile.isZakater ? (
                  <>
                    <ProfileStatus
                      isZakater={true}
                      imgId={currentProfile.imgId!}
                    />
                    <NisabAssetsChart
                      nisab={myNisabToday}
                      assets={currentProfile.assets?.totalAssets!}
                      lastUpdate={currentProfile.assets?.lastUpdate!}
                    />
                  </>
                ) : (
                  <>
                    <ProfileStatus
                      isZakater={false}
                      imgId={currentProfile.imgId!}
                    />
                    <NisabAssetsChart
                      nisab={myNisabToday}
                      assets={currentProfile.assets?.totalAssets!}
                      lastUpdate={currentProfile.assets?.lastUpdate!}
                    />
                  </>
                )}
              </div>
            )}
            <div className="flex flex-col w-full max-w-[500px] items-center gap-8">
              <Label className="text-base">
                {currentProfile.isZakater ? t("title") : t("titleNonZakater")}
              </Label>
              <ol className="flex flex-col items-start text-sm font-medium">
                <Checked label={t("step1")} />
                <Separator
                  orientation="vertical"
                  className="h-12 w-0.5 ml-3 bg-primary"
                />
                <Checked label={t("step2")} />
                <Separator
                  orientation="vertical"
                  className="h-12 w-0.5 ml-3 bg-primary"
                />
                {!isAssetsConfigured ? (
                  <li className="flex items-center gap-2">
                    <span className="size-6 rounded border"></span>
                    <span className="text-primary">{t("step3")}</span>
                  </li>
                ) : (
                  <Checked label={t("step3")} />
                )}
                <div className="flex items-center max-w-72 gap-8">
                  <Separator
                    orientation="vertical"
                    className={`w-0.5 ml-3 ${
                      isAssetsConfigured ? "bg-primary h-12" : "h-40"
                    }`}
                  />
                  {!isAssetsConfigured ? (
                    <div className="grid gap-4">
                      <Label className="font-normal leading-tight">
                        {t("labelAssets")}
                      </Label>
                      <Button variant="outline" className="w-fit" asChild>
                        <Link href="/dashboard/assets">{t("ctaAssets")}</Link>
                      </Button>
                    </div>
                  ) : null}
                </div>
                {!isZDayConfigured ? (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="size-6 rounded border"></span>
                      <span className="text-primary">{t("step4")}</span>
                    </li>
                    {isAssetsConfigured && (
                      <div className="flex items-center max-w-72 gap-8">
                        <Separator
                          orientation="vertical"
                          className={`w-0.5 ml-3 ${
                            currentProfile.isZakater ? "h-40" : "h-64"
                          }`}
                        />
                        <div className="grid gap-4">
                          <Label className="font-normal leading-tight">
                            {currentProfile.isZakater
                              ? t("labelZakater")
                              : t.rich("labelNonZakater", { br: () => <br /> })}
                          </Label>
                          {currentProfile.isZakater ? (
                            <Button variant="outline" className="w-fit" asChild>
                              <Link href="/dashboard/my-zakat">
                                {t("ctaZakater")}
                              </Link>
                            </Button>
                          ) : (
                            <>
                              <Label className="font-normal leading-normal text-muted-foreground">
                                {t("NisabToday.linkDesc")}
                              </Label>
                              <Button variant="outline" className="w-fit">
                                <Image
                                  src="/logo_nisab.svg"
                                  alt="nisab today icon"
                                  width="24"
                                  height="24"
                                  className="w-8 mr-2"
                                />
                                <Link
                                  href="https://nisabtoday.org"
                                  target="blank"
                                >
                                  {t("NisabToday.appname")}
                                </Link>
                                <ArrowUpRight className="ml-2 h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Checked label={t("step4")} />
                )}
              </ol>
            </div>
          </div>
        )}
      </AnimateIn>
    </div>
  );
};
