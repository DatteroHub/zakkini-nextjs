import Dashboard from "@/components/dashboard/Dashboard";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = () => {
  return (
    <>
      <Dashboard title="Dashboard">
        <EmptyDashboard />
      </Dashboard>
    </>
  );
};

export default DashboardPage;
