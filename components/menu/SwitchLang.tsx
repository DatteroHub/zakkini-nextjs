"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Languages } from "lucide-react";
import { locales, languages, Locale } from "@/utils/localization/config";
import { setUserLocale } from "@/utils/localization/actions";
import { useLocale } from "next-intl";

export const SwitchLang = () => {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground transition-colors hover:text-foreground hover:bg-transparent"
        >
          <Languages className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[110px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {locales.map((loc) => (
                <CommandItem
                  key={loc}
                  value={loc}
                  defaultValue={locale}
                  onSelect={(currentValue) => {
                    setUserLocale(currentValue as Locale);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`
                      mr-2 h-4 w-4
                      ${locale === loc ? "opacity-100" : "opacity-0"}
                    `}
                  />
                  {languages[loc]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
