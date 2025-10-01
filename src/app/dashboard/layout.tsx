

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gray-900 text-white flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo / Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!collapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
          <Button
            variant="ghost"
            size="sm"
            className="text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "»" : "«"}
          </Button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard/blogs"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            {collapsed ? "📝" : "Blogs Management"}
          </Link>
          <Link
            href="/dashboard/projects"
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            {collapsed ? "📂" : "Project Management"}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
