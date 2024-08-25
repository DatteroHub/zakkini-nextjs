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
import { ChevronsUpDown } from "lucide-react";

export function ComboboxResponsive({
  comboboxItems: items,
  selectedItem,
  setSelectedItem,
  width,
}: {
  comboboxItems: ComboboxItemType[];
  selectedItem: ComboboxItemType | null;
  setSelectedItem: Dispatch<SetStateAction<ComboboxItemType | null>>;
  width?: string;
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
          >
            {selectedItem ? <>{selectedItem.label}</> : <>Select country...</>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`${width ? "w-[300px]" : "w-[200px]"} p-0`} align="start">
          <ItemsList
            setOpen={setOpen}
            items={items}
            setSelectedItem={setSelectedItem}
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
        >
          {selectedItem ? <>{selectedItem.label}</> : <>Select country...</>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="my-4 border-t">
          <ItemsList
            setOpen={setOpen}
            items={items}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ItemsList({
  setOpen,
  items,
  setSelectedItem,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  items: ComboboxItemType[];
  setSelectedItem: Dispatch<SetStateAction<ComboboxItemType | null>>;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter countries..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.label}
              value={item.label}
              onSelect={(value) => {
                setSelectedItem(
                  items.find((priority) => priority.label === value) || null
                );
                setOpen(false);
              }}
            >
              <div>{item.label}</div>
              <div className="ml-auto">{item.value}</div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
