"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useMediaQuery from "@/utils/hooks/useMediaQuery";
import { ComboboxItemType } from "@/lib/types";
import { Check, ChevronsUpDown } from "lucide-react";

export function ComboboxResponsive({
  comboboxItems: items,
  selectedItem,
  setSelectedItem,
  label,
  searchLabel,
  notFoundLabel,
  width,
  disabled,
}: {
  comboboxItems: ComboboxItemType[];
  selectedItem: ComboboxItemType | null | undefined;
  setSelectedItem: Dispatch<
    SetStateAction<ComboboxItemType | null | undefined>
  >;
  label: string;
  searchLabel: string;
  notFoundLabel: string;
  width?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`${width ?? "w-[200px]"} justify-between`}
            disabled={disabled}
          >
            {selectedItem ? <>{selectedItem.label}</> : <>{label}</>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`${width ? "w-[350px]" : "w-[200px]"} p-0`}
          align="start"
        >
          <ItemsList
            setOpen={setOpen}
            items={items}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            searchLabel={searchLabel}
            notFoundLabel={notFoundLabel}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={`${width ?? "w-[200px]"} justify-between`}
          disabled={disabled}
        >
          {selectedItem ? <>{selectedItem.label}</> : <>{label}</>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="my-4 border-t">
          <ItemsList
            setOpen={setOpen}
            items={items}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            searchLabel={searchLabel}
            notFoundLabel={notFoundLabel}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ItemsList({
  setOpen,
  items,
  selectedItem,
  setSelectedItem,
  searchLabel,
  notFoundLabel,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  items: ComboboxItemType[];
  selectedItem: ComboboxItemType | null | undefined;
  setSelectedItem: Dispatch<
    SetStateAction<ComboboxItemType | null | undefined>
  >;
  searchLabel: string;
  notFoundLabel: string;
}) {
  return (
    <Command>
      <CommandInput placeholder={searchLabel} />
      <CommandList>
        <CommandEmpty>{notFoundLabel}</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              // label+value because there are countries with multiple currencies
              key={item.label + item.value}
              value={item.label + item.value}
              onSelect={(value) => {
                setSelectedItem(
                  items.find(
                    (priority) => priority.label + priority.value === value
                  ) || null
                );
                setOpen(false);
              }}
            >
              <Check
                className={`
                      mr-2 h-4 w-4
                      ${
                        selectedItem?.label! + selectedItem?.value! ===
                        item.label + item.value
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    `}
              />
              <div>{item.label}</div>
              <div className="ml-auto">{item.value}</div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
