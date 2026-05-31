"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu, X, Package, LogOut,
  LayoutDashboard, FileText, Truck, Bike, Users, CreditCard,
  MessageSquare, ScrollText, BarChart3, CheckCheck, User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/session";
import { NotificationBell, type NotificationItem } from "./NotificationBell";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Nav config lives client-side so icon components never cross the
// server→client serialization boundary (functions aren't serializable).
const NAVS: Record<string, NavItem[]> = {
  ADMIN: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/quotes", label: "Quote Requests", icon: FileText },
    { href: "/dashboard/admin/shipments", label: "Shipments", icon: Truck },
    { href: "/dashboard/admin/riders", label: "Riders", icon: Bike },
    { href: "/dashboard/admin/customers", label: "Customers", icon: Users },
    { href: "/dashboard/admin/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
    { href: "/dashboard/admin/reports", label: "Reports", icon: BarChart3 },
  ],
  CUSTOMER: [
    { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/customer/quotes", label: "My Quotes", icon: FileText },
    { href: "/dashboard/customer/shipments", label: "My Shipments", icon: Truck },
    { href: "/dashboard/customer/profile", label: "Profile", icon: User },
  ],
  RIDER: [
    { href: "/dashboard/rider", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/rider/shipments", label: "Assigned", icon: Truck },
    { href: "/dashboard/rider/completed", label: "Completed", icon: CheckCheck },
    { href: "/dashboard/rider/profile", label: "Profile", icon: User },
  ],
};

export function DashboardShell({
  role,
  title,
  userName,
  notifications = [],
  unread = 0,
  children,
}: {
  role: "ADMIN" | "CUSTOMER" | "RIDER";
  title: string;
  userName: string;
  notifications?: NotificationItem[];
  unread?: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = NAVS[role];

  const SidebarLinks = (
    <nav className="space-y-1">
      {nav.map((item) => {
        const active =
          pathname === item.href || (item.href !== nav[0].href && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
              active ? "bg-accent text-white" : "text-navy-100 hover:bg-navy-800"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const SignOut = (
    <form action={logout} className="mt-auto pt-4">
      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-100 hover:bg-navy-800">
        <LogOut className="h-5 w-5" /> Sign out
      </button>
    </form>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy-900 p-4 md:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2 font-bold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Package className="h-5 w-5" />
          </span>
          <span className="text-sm leading-tight">{title}</span>
        </Link>
        {SidebarLinks}
        {SignOut}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-navy-900 p-4">
            <button className="mb-4 self-end text-white" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
            {SidebarLinks}
            {SignOut}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
          <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <NotificationBell items={notifications} unread={unread} />
            <span className="text-sm text-gray-600">Hi, {userName.split(" ")[0]}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-700 text-xs font-semibold text-white">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
