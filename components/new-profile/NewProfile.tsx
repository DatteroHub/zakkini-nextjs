"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { ComboboxItemType } from "@/lib/types";
import { StepsHeader } from "./StepsHeader";
import { useTranslations } from "next-intl";
import AnimateIn from "../animation/animate";
import { useAddProfile } from "@/utils/hooks/useAddProfile";
import { Loader2 } from "lucide-react";
import { setCurrentProfileId } from "@/utils/actions/profile";
import { toast } from "sonner";
import { Success } from "./Success";

export default function NewProfile() {
  const t = useTranslations("NewProfile");
  const [currentStep, setCurrentStep] = useState(1);
  const [profileName, setProfileName] = useState("");
  const [profilePic, setProfilePic] = useState(1);
  const [country, setCountry] = useState<ComboboxItemType | null | undefined>(
    null
  );
  const [nisabValue, setNisabValue] = useState(0);
  const [isGold, setIsGold] = useState(true);
  const { mutate, isPending, isSuccess, isError } = useAddProfile(
    profileName,
    profilePic,
    country,
    isGold
  );

  useEffect(() => {
    if (isSuccess) {
      setCurrentStep((prev) => prev + 1);
      setCurrentProfileId(profileName.toLowerCase());
    }
    if (isError) {
      toast(t("Error.title"), {
        description: t("Error.desc"),
        action: {
          label: t("Error.cta"),
          onClick: () => {},
        },
      });
    }
  }, [isSuccess, isError, profileName]);

  return (
    <div className="flex flex-col w-full h-full mt-2 -mb-4">
      <div className="mb-10">
        <StepsHeader currentStep={currentStep} />
      </div>
      <div className="flex flex-1 w-full justify-center px-2">
        {currentStep == 1 && (
          <AnimateIn
            from="opacity-0 -translate-x-2"
            to="opacity-100 translate-x-0"
          >
            <Step1
              profileName={profileName}
              profilePic={profilePic}
              setProfileName={setProfileName}
              setProfilePic={setProfilePic}
            />
          </AnimateIn>
        )}
        {currentStep == 2 && (
          <AnimateIn
            from="opacity-0 -translate-x-2"
            to="opacity-100 translate-x-0"
          >
            <Step2
              country={country}
              setCountry={setCountry}
              setNisabValue={setNisabValue}
              isGold={isGold}
              setIsGold={setIsGold}
            />
          </AnimateIn>
        )}
        {currentStep == 3 && (
          <AnimateIn
            from="opacity-0 -translate-x-2"
            to="opacity-100 translate-x-0"
          >
            <Success />
          </AnimateIn>
        )}
      </div>
      <div className="sticky bottom-0  flex justify-center w-full mt-10 pt-4 pb-6 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between w-full md:w-[450px] px-2">
          {currentStep == 2 && (
            <Button
              variant="outline"
              className="mr-auto"
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
            >
              {t("ctaBack")}
            </Button>
          )}
          {currentStep == 1 && (
            <Button
              className="ml-auto"
              disabled={profileName.length == 0}
              onClick={() => {
                setCurrentStep((prev) => prev + 1);
              }}
            >
              {t("ctaNext")}
            </Button>
          )}
          {currentStep == 2 && (
            <Button
              className="ml-auto"
              disabled={!country || !nisabValue || isPending}
              onClick={() => {
                mutate();
              }}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("ctaSave")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
