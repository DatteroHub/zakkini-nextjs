"use client";

import {
  Home,
  LineChart,
  MessageSquareMore,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

export default function SidebarMenu() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
      <nav className="grid gap-3 items-start px-5 sm:py-5">
        <div className="flex mb-4">
          <a href="/dashboard" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="zakkini icon"
              width="48"
              height="48"
              className="w-16"
            />
            <div className="ml-2 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gradient to-gradient">
              Zakkini
            </div>
          </a>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          <span className="">Dashboard</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="">Orders</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <Package className="h-5 w-5" />
          <span className="">Products</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <Users2 className="h-5 w-5" />
          <span className="">Customers</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <LineChart className="h-5 w-5" />
          <span className="">Analytics</span>
        </Link>
      </nav>
      <nav className="mt-auto grid items-start gap-3 px-5 sm:pt-5">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          <span className="">Settings</span>
        </Link>
      </nav>
      <nav className="grid items-start gap-3">
        <div className="p-4">
          <Card>
            <CardHeader className="p-2 pt-0 sm:p-4">
              <CardTitle className="text-xl">Feedback</CardTitle>
              <CardDescription>
                Report an issue or send a suggestion to help us imporove the
                app.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 sm:p-4 sm:pt-0">
              <Button size="sm" className="w-full">
                <MessageSquareMore className="mr-2 h-4 w-4" />
                Send
              </Button>
            </CardContent>
          </Card>
        </div>
      </nav>
    </aside>
  );
}
