import type { Metadata } from "next";
import DashboardSidebar from "@/components/dashboard/sidebar";

export const metadata: Metadata = {
  title: "Dashboard — Sukma Jaya Story CMS",
  description: "Content Management System for Sukma Jaya Story",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col md:flex-row">
      <DashboardSidebar />
      <main className="flex-1 w-full md:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
