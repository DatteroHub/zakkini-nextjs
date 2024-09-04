"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleHelp } from "lucide-react";

export const Infobox = ({
  title,
  description,
  big,
}: {
  title: any;
  description: any;
  big?: boolean;
}) => {
  return (
    <Alert className="bg-transparent text-muted-foreground">
      <CircleHelp className="h-5 w-5" color="#757E88" />
      <AlertTitle className={`ml-3 font-semibold ${big ? "mb-4":"text-sm"}`}>{title}</AlertTitle>
      <AlertDescription className="ml-3 text-sm">{description}</AlertDescription>
    </Alert>
  );
};
