import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { MyZakat } from "@/components/zakat/MyZakat";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "My Zakat",
};

const MyZakatPage = async () => {
  const t = await getTranslations("");
  const breadcrumb = [
    { href: "/dashboard", label: t("Dashboard.breadcrumb") },
    { label: t("Zakat.breadcrumb") },
  ];
  return (
    <>
      <DashboardWrapper
        title={t("Zakat.title")}
        subtitle={t("Zakat.subtitle")}
        breadcrumbItems={breadcrumb}
        selectedMenu={4}
      >
        <MyZakat />
      </DashboardWrapper>
    </>
  );
};

export default MyZakatPage;
