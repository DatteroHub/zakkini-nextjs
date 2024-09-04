import { Assets } from "@/components/assets/Assets";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Assets",
};

const AssetsPage = async () => {
  const t = await getTranslations("");
  const breadcrumb = [
    { href: "/dashboard", label: t("Dashboard.breadcrumb") },
    { label: t("Assets.breadcrumb") },
  ];
  return (
    <>
      <DashboardWrapper
        title={t("Assets.title")}
        subtitle={t("Assets.subtitle")}
        breadcrumbItems={breadcrumb}
        selectedMenu={3}
      >
        <Assets />
      </DashboardWrapper>
    </>
  );
};

export default AssetsPage;
