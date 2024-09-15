"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui-custom/dialog";
import { Button } from "../ui/button";
import { useModal } from "../context/ModalContext";
import { useProfile } from "@/utils/hooks/useProfile";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";
import { useTranslations } from "next-intl";
import { differenceInCalendarDays } from "date-fns";
import { ProfileInfo } from "@/lib/types";
import { Crown } from "lucide-react";

export const ProfilesModal = () => {
  const t = useTranslations("Dashboard.Menu.ProfileModal");
  const { isOpen, isPreventClose, closeModal, disablePreventClose } =
    useModal();
  const { profileInfo, setCurrentProfile } = useProfile();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const {
    allProfiles: { data: profiles, isPending },
  } = useGetProfiles();

  useEffect(() => {
    if (profileInfo) {
      setSelectedProfile(profileInfo.id);
    }
  }, [profileInfo]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        !isPreventClose && closeModal();
      }}
    >
      <DialogContent hideX={isPreventClose}>
        <DialogHeader>
          <DialogTitle>{isPreventClose ? t("title2") : t("title")}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
          {profiles?.map((p: any) => {
            const remainingDays = differenceInCalendarDays(
              new Date(p.zDay),
              new Date()
            );
            return (
              <Button
                key={p.id}
                size="icon"
                variant="secondary"
                className={`w-full h-full items-start rounded-lg hover:opacity-85 focus-visible:ring-transparent ${
                  selectedProfile == p.id
                    ? "ring-2 ring-offset-4 ring-foreground"
                    : ""
                }`}
                onClick={() => {
                  setSelectedProfile(p.id);
                  const profile: ProfileInfo = {
                    id: p.id,
                    name: p.name,
                    imgId: p.imgId,
                  };
                  setCurrentProfile(profile);
                  disablePreventClose();
                  closeModal();
                }}
              >
                <div className="grid w-full h-full gap-2 p-4">
                  <div
                    className={`relative aspect-square w-2/3 mx-auto rounded-full ${
                      p.isZakater
                        ? "border-4 border-primary"
                        : "border-2 border-gray-400"
                    }`}
                  >
                    <Image
                      src={`/avatar_${p.imgId}.png`}
                      alt="profile icon"
                      width="80"
                      height="80"
                      className={`w-full h-full ${
                        p.isZakater == undefined
                          ? "animate-pulse"
                          : p.isZakater == false
                          ? "opacity-50"
                          : ""
                      }`}
                    />
                    {p.isZakater && (
                      <div
                        className={`absolute -top-2 -right-2 rounded-full bg-primary p-2 ${
                          p.isZakater && !p.zDay ? "animate-bounce" : ""
                        }`}
                      >
                        <Crown className="h-4 w-4" color="#fff" />
                      </div>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-wrap">
                    {p.name}
                  </div>
                  <div className="grid gap-2 text-xs text-wrap justify-center mt-auto">
                    {p.isZakater != undefined && (
                      <>
                        {p.isZakater ? (
                          <div className="text-primary">{t("zakater")}</div>
                        ) : (
                          <div className="text-muted-foreground">
                            {t("nonZakater")}
                          </div>
                        )}
                      </>
                    )}
                    {p.zDay && (
                      <div className="flex gap-1">
                        <div
                          className={`${
                            remainingDays < 1
                              ? "text-red-600 animate-ping"
                              : remainingDays < 15
                              ? "text-yellow-600 animate-pulse"
                              : "text-foreground"
                          }`}
                        >
                          {p.isZakater != undefined && <>{"•"}</>}
                        </div>
                        <div
                          className={`${
                            remainingDays < 1
                              ? "text-red-600"
                              : remainingDays < 15
                              ? "text-yellow-600"
                              : "text-primary"
                          }`}
                        >
                          {remainingDays == 0
                            ? t("today")
                            : Math.abs(remainingDays)}
                        </div>
                        <div
                          className={`${
                            remainingDays < 1
                              ? "text-red-600"
                              : remainingDays < 15
                              ? "text-yellow-600"
                              : "text-foreground"
                          }`}
                        >
                          {remainingDays > 0
                            ? t("daysLeft")
                            : remainingDays < 0
                            ? t("daysAgo")
                            : ""}
                        </div>
                      </div>
                    )}
                    {(p.isZakater == undefined || (p.isZakater && !p.zDay)) && (
                      <div className="text-muted-foreground">
                        {t("incomplete")}
                      </div>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
          <Button
            size="icon"
            variant="secondary"
            className="aspect-square w-full h-full rounded-lg hover:opacity-80"
            asChild
          >
            <Link
              href="/dashboard/new-profile"
              onClick={() => {
                disablePreventClose();
                closeModal();
              }}
            >
              <div className="text-4xl text-muted-foreground">+</div>
            </Link>
          </Button>
        </div>
        <DialogFooter>
          {!isPreventClose && (
            <DialogClose asChild>
              <Button variant="secondary">{t("cta")}</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
