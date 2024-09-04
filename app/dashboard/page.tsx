import { Dashboard } from "@/components/dashboard/Dashboard";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = async () => {
  const t = await getTranslations("Dashboard");
  return (
    <>
      <DashboardWrapper
        title={t("title")}
        subtitle={t("subtitle")}
        selectedMenu={1}
      >
        <Dashboard />
      </DashboardWrapper>
    </>
  );
};

export default DashboardPage;
