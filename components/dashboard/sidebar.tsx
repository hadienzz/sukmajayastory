"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Settings,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/journals", label: "All Journals", icon: BookOpen },
  { href: "/dashboard/journals/create", label: "New Journal", icon: PlusCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#111111] text-white z-40 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="block">
          <h1 className="editorial-title text-lg tracking-[0.02em]">
            SJS CMS
          </h1>
          <p className="text-[0.65rem] text-white/40 tracking-widest uppercase mt-1">
            Content Manager
          </p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <item.icon size={16} />
              <span className="font-light tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to site */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          <span className="font-light tracking-wide">Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}
