"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  return (
    <div className="space-y-6 flex justify-center items-center flex-col border h-screen">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John Don 👋</h1>
        <p className="text-muted-foreground">
          What would you like to manage today?
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/dashboard/blogs">
          <Button className="w-40">Manage Blogs</Button>
        </Link>
        <Link href="/dashboard/projects">
          <Button className="w-40" variant="secondary">
            Manage Projects
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
