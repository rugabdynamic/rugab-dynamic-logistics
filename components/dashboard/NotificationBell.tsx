"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { markNotificationsRead } from "@/app/actions/notifications";
import { formatDateTime } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export function NotificationBell({
  items,
  unread,
}: {
  items: NotificationItem[];
  unread: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-full p-2 text-navy-700 hover:bg-gray-100"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-semibold text-navy-900">Notifications</p>
              {unread > 0 && (
                <form action={markNotificationsRead}>
                  <button className="text-xs font-medium text-accent hover:underline">Mark all read</button>
                </form>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-gray-500">No notifications.</p>
              ) : (
                items.map((n) => (
                  <div key={n.id} className={`border-b border-gray-50 px-4 py-3 ${n.read ? "" : "bg-accent/5"}`}>
                    <div className="flex items-start gap-2">
                      {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />}
                      <div className={n.read ? "pl-4" : ""}>
                        <p className="text-sm font-medium text-navy-900">{n.title}</p>
                        <p className="text-xs text-gray-600">{n.message}</p>
                        <p className="mt-1 text-[10px] text-gray-400">{formatDateTime(n.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
