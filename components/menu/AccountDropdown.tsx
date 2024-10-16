"use client";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { useProfile } from "@/utils/hooks/useProfile";

export const AccountDropdown = () => {
  const { data: session } = useSession();
  const t = useTranslations("Dashboard.Menu.Account");
  const { clearCurrentProfile } = useProfile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto overflow-hidden rounded-full focus-visible:ring-transparent"
        >
          {session?.user ? (
            <Image
              src={session.user?.image ?? "/placeholder-user.svg"}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full w-full"
            />
          ) : (
            <Skeleton className="h-12 w-12 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="px-2">
          {session?.user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t("account")}</DropdownMenuItem>
        <DropdownMenuItem>{t("support")}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          style={{ cursor: "pointer" }}
          onClick={() => {
            clearCurrentProfile();
            signOut({ callbackUrl: "/" });
          }}
        >
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
