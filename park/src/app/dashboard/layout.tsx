"use client";

import NavBar from "@/app/components/nav";
import Sidebar from "@/app/components/sideBar";
import "../../styles/dashboard.css";
import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="dashboard-layout">
      <NavBar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
