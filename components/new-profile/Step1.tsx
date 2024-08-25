"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Step1({ ...props }: React.ComponentProps<any>) {
  const { profileName, profilePic, setProfileName, setProfilePic } = props;
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="grid w-full items-center gap-4">
        <Label htmlFor="name">Enter profile name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Ali"
          onChange={(e) => setProfileName(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-4">
        <Label>Choose an avatar</Label>
        <div className="grid grid-cols-3 gap-4">
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 1 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(1)}
          >
            <Image
              src="/avatar_1.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 2 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(2)}
          >
            <Image
              src="/avatar_2.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 3 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(3)}
          >
            <Image
              src="/avatar_3.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 4 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(4)}
          >
            <Image
              src="/avatar_4.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 5 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(5)}
          >
            <Image
              src="/avatar_5.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
          <Button
            size="icon"
            className={`aspect-square w-full h-full rounded-full bg-gray-200 hover:opacity-85 ${
              profilePic == 6 ? "ring-4 ring-offset-4 ring-foreground" : ""
            }`}
            onClick={() => setProfilePic(6)}
          >
            <Image
              src="/avatar_6.png"
              alt="zakkini icon"
              width="80"
              height="80"
              className="w-full"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
