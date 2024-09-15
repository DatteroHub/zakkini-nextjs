"use client";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGetProfiles } from "@/utils/hooks/useGetProfiles";

export default function Step1({
  profileName,
  profilePic,
  setProfileName,
  setProfilePic,
}: {
  profileName: string;
  profilePic: number;
  setProfileName: Dispatch<SetStateAction<string>>;
  setProfilePic: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations("NewProfile.Step1");
  const {
    allProfiles: { data: profiles, isPending },
  } = useGetProfiles();
  const [showFieldError, setShowFieldError] = useState(false);

  useEffect(() => {
    // validate profile name
    if (profiles && !isPending && profileName.length > 0) {
      const existingNames = profiles.map((p: any) => p.id);
      if (existingNames.includes(profileName.toLowerCase())) {
        setShowFieldError(true);
        setProfileName("");
      } else {
        setShowFieldError(false);
      }
    }
  }, [profiles, isPending, profileName]);

  return (
    <div className="flex flex-col w-full md:w-[450px] gap-4">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name" className="mb-3">
          {t("inputTitle")}
        </Label>
        <Input
          autoFocus={true}
          type="text"
          id="name"
          maxLength={16}
          defaultValue={profileName}
          placeholder={t("inputPlaceholder")}
          className="text-sm md:text-base"
          onChange={(e) => setProfileName(e.target.value)}
        />
        <div
          className={`text-sm text-red-400 ${
            showFieldError ? "visible" : "invisible"
          }`}
        >
          {t("alreadyExists")}
        </div>
      </div>
      <div className="grid w-full items-center gap-4">
        <Label className="mb-1">{t("avatarTitle")}</Label>
        <div className="grid grid-cols-3 gap-4 px-6 lg:px-10 mt-2">
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 1 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(1)}
          >
            <Image
              src="/avatar_1.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 2 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(2)}
          >
            <Image
              src="/avatar_2.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 3 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(3)}
          >
            <Image
              src="/avatar_3.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 4 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(4)}
          >
            <Image
              src="/avatar_4.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 5 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(5)}
          >
            <Image
              src="/avatar_5.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 6 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(6)}
          >
            <Image
              src="/avatar_6.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
