"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { ComboboxItemType } from "@/lib/types";
import { StepsHeader } from "./StepsHeader";

export default function NewProfile() {
  const [currentStep, setCurrentStep] = useState(3);
  const [profileName, setProfileName] = useState("");
  const [profilePic, setProfilePic] = useState(1);
  const [country, setCountry] = useState<ComboboxItemType | null>(null);
  const [isGold, setIsGold] = useState(true);

  return (
    <div className="grid w-full h-full justify-center mt-2">
      <div className="mb-8">
        <StepsHeader currentStep={currentStep} />
      </div>
      <div className="flex flex-1 w-[350px] px-2">
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
        {currentStep == 3 && (
          <Step3          />
        )}
      </div>
      <div className="flex mt-auto pt-6 mb-6">
        <Button
          variant="outline"
          className={`mr-auto mt-4 ${currentStep == 1 ? "hidden" : ""}`}
          onClick={() => {
            setCurrentStep((prev) => prev - 1);
          }}
        >
          Back
        </Button>
        <Button
          className="ml-auto mt-4"
          onClick={() => {
            setCurrentStep((prev) => prev + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
