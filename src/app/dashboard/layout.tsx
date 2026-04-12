"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import DashboardPageHeader from "@/components/dashboard/page-header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;

    const validateSession = async () => {
      try {
        const response = await fetch(
          `/api/auth/session?pathname=${encodeURIComponent(pathname)}`,
          {
            credentials: "include",
            cache: "no-store",
          },
        );

        const data = (await response.json()) as {
          authenticated?: boolean;
          redirectTo?: string;
        };

        if (ignore) {
          return;
        }

        if (!response.ok || !data.authenticated) {
          router.replace(data.redirectTo || "/");
          return;
        }

        setIsAuthorized(true);
      } catch {
        if (!ignore) {
          router.replace("/");
        }
      }
    };

    setIsAuthorized(false);
    void validateSession();

    return () => {
      ignore = true;
    };
  }, [pathname, router]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="w-full px-5 py-5 xl:px-8 xl:py-6">
      <DashboardPageHeader />
      {children}
    </div>
  );
};

export default DashboardLayout;
