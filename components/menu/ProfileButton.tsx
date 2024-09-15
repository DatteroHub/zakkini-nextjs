"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { ChevronsUpDown } from "lucide-react";
import { useProfile } from "@/utils/hooks/useProfile";
import { useModal } from "../context/ModalContext";

export const ProfileButton = () => {
  const { profileInfo } = useProfile();
  const { openModal } = useModal();

  return (
    <>
      {profileInfo ? (
        <Button
          variant="outline"
          className="justify-start pl-2 overflow-hidden"
          onClick={openModal}
        >
          <div className="flex flex-1 gap-3 items-center">
            <Image
              src={`/avatar_${profileInfo.imgId}.png`}
              alt="profile icon"
              width="32"
              height="32"
              className="w-8 h-8"
            />
            <div className="text-sm truncate">{profileInfo.name}</div>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      ) : (
        <div className="flex gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="flex-1 h-10" />
        </div>
      )}
    </>
  );
};
