"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { ComboboxItemType } from "@/lib/types";
import { StepsHeader } from "./StepsHeader";
import { useTranslations } from "next-intl";

export default function NewProfile() {
  const t = useTranslations("NewProfile");
  const [currentStep, setCurrentStep] = useState(1);
  const [profileName, setProfileName] = useState("");
  const [profilePic, setProfilePic] = useState(1);
  const [country, setCountry] = useState<ComboboxItemType | null>(null);
  const [isGold, setIsGold] = useState(true);

  return (
    <div className="flex flex-col w-full h-full items-center mt-2">
      <div className="mb-8">
        <StepsHeader currentStep={currentStep} />
      </div>
      <div className="flex flex-1 w-full md:w-[450px] px-2">
        {currentStep == 1 && (
          <Step1
            profileName={profileName}
            profilePic={profilePic}
            setProfileName={setProfileName}
            setProfilePic={setProfilePic}
          />
        )}
        {currentStep == 2 && (
          <Step2
            country={country}
            setCountry={setCountry}
            isGold={isGold}
            setIsGold={setIsGold}
          />
        )}
        {currentStep == 3 && <Step3 />}
        {currentStep == 4 && <Step4 />}
      </div>
      <div className="flex justify-between w-full md:w-[450px] my-6 px-2">
        <Button
          variant="outline"
          className={`mr-auto ${currentStep == 1 ? "hidden" : ""}`}
          onClick={() => {
            setCurrentStep((prev) => prev - 1);
          }}
        >
          {t("ctaBack")}
        </Button>
        <Button
          className="ml-auto"
          onClick={() => {
            setCurrentStep((prev) => prev + 1);
          }}
        >
          {t("ctaNext")}
        </Button>
      </div>
    </div>
  );
}
