"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  MessageSquareMore,
  Package,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { BreadcrumbResponsive } from "./Breadcrumb";
import { BreadcrumbItemType } from "@/lib/types";

export default function HeaderMenu({
  breadcrumbItems,
}: {
  breadcrumbItems?: BreadcrumbItemType[];
}) {
  const { data: session, status } = useSession();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="grid sm:max-w-xs">
          <nav className="grid text-lg font-medium">
            <div className="flex items-center mb-2">
              <a href="/dashboard">
                <Image
                  src="/logo.svg"
                  alt="zakkini icon"
                  width="48"
                  height="48"
                  className="w-16"
                />
              </a>
              <div className="ml-2 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gradient to-gradient">
                Zakkini
              </div>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-3.5 text-foreground bg-accent rounded-lg"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-3.5 text-muted-foreground rounded-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-3.5 text-muted-foreground rounded-lg"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-3.5 text-muted-foreground rounded-lg"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-3.5 text-muted-foreground rounded-lg"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
          <nav className="mt-auto grid items-start gap-3">
            <div className="">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Feedback</CardTitle>
                  <CardDescription>
                    Report an issue or send a suggestion to help us imporove the
                    app.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    <MessageSquareMore className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </CardContent>
              </Card>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <BreadcrumbResponsive breadcrumbItems={breadcrumbItems} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto overflow-hidden rounded-full focus-visible:ring-transparent"
          >
            {session?.user ? (
              <Image
                src={session.user?.image ?? "/placeholder-user.svg"}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full w-full"
              />
            ) : (
              <Skeleton className="h-12 w-12 rounded-full" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="px-2">
            {session?.user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            style={{ cursor: "pointer" }}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
