"use client";
import React from "react";
import SearchBar from "./searchbar";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const DashboardPageHeader = () => {
  const pathName = usePathname();
  const isAdminPage = pathName.includes("admin");

  return (
    <header className="mb-8 flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
      <h2 className="text-3xl font-bold">Online Tests</h2>
      <SearchBar />

      {isAdminPage && (
        <Button asChild size={"lg"} className="h-10">
          <Link href="/dashboard/new-exam">Create Online Test</Link>
        </Button>
      )}
    </header>
  );
};

export default DashboardPageHeader;
