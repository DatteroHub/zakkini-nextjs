"use client";
import SidebarMenu from "./SidebarMenu";
import HeaderMenu from "./HeaderMenu";
import { BreadcrumbItemType } from "@/lib/types";

type Props = {
  children: React.ReactNode;
  title: String;
  subtitle?: String;
  breadcrumbItems?: BreadcrumbItemType[];
};

export default function Dashboard({
  children,
  title,
  subtitle,
  breadcrumbItems,
}: Props) {
  return (
    <div className="grid min-h-screen w-full flex-col bg-muted/40">
      <SidebarMenu />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <HeaderMenu breadcrumbItems={breadcrumbItems} />
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
    </div>
  );
}
