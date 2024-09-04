import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { Nisab } from "@/components/nisab/Nisab";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Nisab",
};

const NisabPage = async () => {
  const t = await getTranslations("");
  const breadcrumb = [
    { href: "/dashboard", label: t("Dashboard.breadcrumb") },
    { label: t("Nisab.breadcrumb") },
  ];
  return (
    <>
      <DashboardWrapper
        title={t("Nisab.title")}
        subtitle={t("Nisab.subtitle")}
        breadcrumbItems={breadcrumb}
        selectedMenu={2}
      >
        <Nisab />
      </DashboardWrapper>
    </>
  );
};

export default NisabPage;
