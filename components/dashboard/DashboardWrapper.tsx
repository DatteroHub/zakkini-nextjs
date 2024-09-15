"use client";
import HeaderMenu from "../menu/HeaderMenu";
import SidebarMenu from "../menu/SidebarMenu";
import { BreadcrumbItemType } from "@/lib/types";
import { ProfilesModal } from "../general/ProfilesModal";

type Props = {
  children: React.ReactNode;
  title: String;
  subtitle?: String;
  breadcrumbItems?: BreadcrumbItemType[];
  selectedMenu?: number;
};

export default function DashboardWrapper({
  children,
  title,
  subtitle,
  breadcrumbItems,
  selectedMenu,
}: Props) {
  return (
    <div className="grid min-h-screen w-full flex-col bg-muted/40">
      <SidebarMenu selectedMenu={selectedMenu} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <HeaderMenu
          breadcrumbItems={breadcrumbItems}
          selectedMenu={selectedMenu}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {children}
        </main>
      </div>
      <ProfilesModal />
    </div>
  );
}
