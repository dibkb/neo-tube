"use client";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import YoutubeIcon from "../svg/youtube";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const HomeNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleCrossClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setSearchQuery("");
    },
    []
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleSearchSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/search/${searchQuery}`);
    },
    [searchQuery, router]
  );

  return (
    <header className="border-b border-border py-4 fixed top-0 left-0 right-0 bg-background z-50 h-16">
      <div className="mx-auto container flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="NeoTube Home"
        >
          <YoutubeIcon />
          <span className="logo-font text-lg">NeoTube</span>
        </Link>

        <form
          className="w-full max-w-md flex items-center relative"
          role="search"
          aria-label="Search videos"
          onSubmit={handleSearchSubmit}
        >
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full max-w-md focus-visible:ring-0 rounded-xl font-semibold px-4 py-2 h-9 input-field selection:bg-blue-200 selection:text-blue-700"
            placeholder="Search"
            type="video-search"
            aria-label="Search videos"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              className="absolute right-2 flex items-center justify-center bg-background rounded-xl text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleCrossClick}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default React.memo(HomeNavbar);
