"use client";
import Link from "next/link";
import { Button } from "../ui/button";

export default function EmptyDashboard() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Welcome to<span className="ml-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gradient to-gradient">
              Zakkini
            </span>
        </h3>
        <p className="text-sm text-muted-foreground">
          Start by configuring your Zakat profile.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/dashboard/new-profile">Start now</Link>
        </Button>
      </div>
    </div>
  );
}
