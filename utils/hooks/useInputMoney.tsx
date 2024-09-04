"use client";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultMoneyLocale } from "../localization/config";

export const useInputMoney = ({
  label,
  currency = "*",
  defaultValue,
  focus,
  disabled,
}: {
  label?: string;
  currency: string | undefined;
  defaultValue: string;
  focus?: boolean;
  disabled?: boolean;
}) => {
  const MAX_LENGTH = 16;
  const randomId = (Math.floor(Math.random() * 90) + 10).toString();
  const [value, setValue] = useState(defaultValue);

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const input = e.target.value.replace(/\D/g, "");

    if (input.length > MAX_LENGTH) return;

    if (input.length > 0) {
      const number = parseFloat(input) / 100;
      const formattedValue = number.toLocaleString(defaultMoneyLocale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setValue(formattedValue);
    } else {
      setValue("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValue = value.replace(/\D/g, "").slice(0, -1);
      setValue(
        newValue.length > 0
          ? (parseFloat(newValue) / 100).toLocaleString(defaultMoneyLocale, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : ""
      );
    }
  };

  const handleSelect = (e: any) => {
    e.preventDefault();
    e.target.setSelectionRange(-1, -1);
  };

  const InputMoney = useMemo(
    () => (
      <>
        {label && <Label htmlFor={randomId} className="mb-1">{label}</Label>}
        <div className="flex">
          <span className="grid items-center justify-center w-10 text-muted-foreground text-sm md:text-base">
            {currency}
          </span>
          <Input
            autoFocus={focus}
            id={randomId}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={handleSelect}
            onFocus={handleSelect}
            disabled={disabled}
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-fit text-sm md:text-base"
          />
        </div>
      </>
    ),
    [label, currency, randomId, value]
  );
  return { value, InputMoney };
};
