"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleHelp } from "lucide-react";

export const Infobox = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Alert className="bg-transparent text-muted-foreground">
      <CircleHelp className="h-5 w-5" color="#757E88" />
      <AlertTitle className="ml-3 text-sm font-semibold">{title}</AlertTitle>
      <AlertDescription className="ml-3 text-sm">{description}</AlertDescription>
    </Alert>
  );
};
