import Dashboard from "@/components/dashboard/Dashboard";
import NewProfile from "@/components/new-profile/NewProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'New Profile',
};

const NewProfilePage = () => {
  const breadcrumb = [
    { href: "/dashboard", label: "Dashboard" },
    { label: "New profile" },
  ];
  return (
    <>
      <Dashboard
        title="Create profile"
        subtitle="Create and configure your Zakat profile."
        breadcrumbItems={breadcrumb}
      >
        <NewProfile />
      </Dashboard>
    </>
  );
};

export default NewProfilePage;
