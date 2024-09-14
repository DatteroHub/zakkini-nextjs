"use client";
import { useState } from "react";
import Link from "next/link";
import useMediaQuery from "@/utils/hooks/useMediaQuery";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BreadcrumbItemType } from "@/lib/types";
import { CornerDownRight, House } from "lucide-react";
import { useTranslations } from "next-intl";

export function BreadcrumbResponsive({
  breadcrumbItems: items,
}: {
  breadcrumbItems?: BreadcrumbItemType[];
}) {
  const t = useTranslations("Dashboard.Menu.Breadcrumb");
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery();

  return !items || items.length <= 1 ? null : (
    <Breadcrumb>
      <BreadcrumbList>
        {isDesktop ? (
          <>
            {items.length > 2 && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="max-w-20 truncate md:max-w-none"
                  >
                    <Link href={items[0].href ?? "#"}>{items[0].label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            {items.length > 3 && (
              <>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(1, -2).map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href ?? "#"}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <BreadcrumbSeparator />
              </>
            )}
            {items.slice(-2).map((item, index) => (
              <BreadcrumbItem key={index}>
                {item.href ? (
                  <>
                    <BreadcrumbLink
                      asChild
                      className="max-w-20 truncate md:max-w-none"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            ))}
          </>
        ) : (
          <>
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger aria-label="Toggle Menu">
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>{t("title")}</DrawerTitle>
                  <DrawerDescription>{t("subtitle")}</DrawerDescription>
                </DrawerHeader>
                <div className="grid gap-1 px-4 pb-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex">
                      {Array.from(Array(index)).map((_, index) => {
                        return <div key={index} className="w-3" />;
                      })}
                      <Button
                        variant="link"
                        className={`font-normal ${
                          item.href
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {index > 0 ? (
                          <CornerDownRight className="mr-2 h-4 w-4" />
                        ) : (
                          <House className="mr-2 h-4 w-4" />
                        )}
                        <Link
                          href={item.href ? item.href : "#"}
                          className="py-2 text-sm"
                        >
                          {item.label}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <DrawerFooter className="pt-4">
                  <DrawerClose asChild>
                    <Button variant="outline">{t("cta")}</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <BreadcrumbSeparator />
            <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
              {items[items.length - 1].label}
            </BreadcrumbPage>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
