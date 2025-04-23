"use client";
import Link from "next/link";
import React from "react";
import YoutubeIcon from "../svg/youtube";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { X } from "lucide-react";
const HomeNavbar = () => {
  const handleCrossClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <nav className="border-b border-border py-4">
      <div className="mx-auto container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <YoutubeIcon />
          <span className="logo-font text-lg">NeoTube</span>
        </Link>
        <form className="w-full max-w-md flex items-center relative">
          <Input
            className="w-full max-w-md focus-visible:ring-0 rounded-xl font-semibold px-4 py-2 h-9 input-field selection:bg-blue-200 selection:text-blue-700"
            placeholder="Search"
            type="video-search"
          />
          <button
            className="absolute right-2 flex items-center justify-center bg-background rounded-xl text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleCrossClick}
          >
            <X className="w-4 h-4" />
          </button>
        </form>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default HomeNavbar;
