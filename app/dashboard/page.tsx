import Dashboard from "@/components/dashboard/Dashboard";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = async () => {
  const t = await getTranslations("Dashboard");
  return (
    <>
      <Dashboard title={t("title")}>
        <EmptyDashboard />
      </Dashboard>
    </>
  );
};

export default DashboardPage;
