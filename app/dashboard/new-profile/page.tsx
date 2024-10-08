import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import NewProfile from "@/components/new-profile/NewProfile";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: 'New Profile',
};

const NewProfilePage = async () => {
  const t = await getTranslations("");
  const breadcrumb = [
    { href: "/dashboard", label: t("Dashboard.breadcrumb") },
    { label: t("NewProfile.breadcrumb") },
  ];
  return (
    <>
      <DashboardWrapper
        title={t("NewProfile.title")}
        subtitle={t("NewProfile.subtitle")}
        breadcrumbItems={breadcrumb}
      >
        <NewProfile />
      </DashboardWrapper>
    </>
  );
};

export default NewProfilePage;
