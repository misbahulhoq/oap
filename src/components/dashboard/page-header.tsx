"use client";

import { usePathname } from "next/navigation";
import RootHeader from "./root-header";
import ManageTestHeader from "./manage-test-header";

const DashboardPageHeader = () => {
  const pathName = usePathname();

  // show root header if the url is /dashboard/admin or /dashboard/student
  const showRootHeader =
    pathName === "/dashboard/admin" || pathName === "/dashboard/student";

  // show manage test header if the url is /dashboard/new-exam
  const showManageTestHeader =
    pathName === "/dashboard/new-exam" ||
    pathName === "/dashboard/add-questions";

  if (showRootHeader) {
    return <RootHeader />;
  } else if (showManageTestHeader) {
    return <ManageTestHeader />;
  } else {
    // do nothing
    return null;
  }
};

export default DashboardPageHeader;
