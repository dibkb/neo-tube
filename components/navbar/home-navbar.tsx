"use client";
import React, { useCallback, useState, useTransition } from "react";
import YoutubeIcon from "../svg/youtube";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { heading } from "@/lib/fonts";
import LoadingOverlay from "../overlay/loading";
import { isYouTubeLink } from "@/lib/regx";
import { getYouTubeVideoId } from "@/lib/regx";

const HomeNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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
      startTransition(() => {
        // if the search query is a youtube link, get the video id and push to the search page
        if (isYouTubeLink(searchQuery)) {
          const videoId = getYouTubeVideoId(searchQuery);
          router.push(`/video/${videoId}`);
        } else {
          router.push(`/search/${searchQuery}`);
        }
        setSearchQuery("");
      });
    },
    [searchQuery, router]
  );

  if (isPending) {
    return <LoadingOverlay isLoading={true} />;
  }
  return (
    <>
      <header className="border-b border-border py-4 fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-3xl bg-neutral-100/50">
        <div className="mx-auto container flex items-center justify-between">
          <nav
            onClick={() => {
              startTransition(() => {
                router.push("/");
              });
            }}
            className="flex items-center gap-1"
            aria-label="NeoTube Home"
          >
            <YoutubeIcon />
            <span
              className={cn(
                "text-lg font-medium text-stone-700 hidden sm:flex",
                heading.className
              )}
            >
              BroTube
            </span>
          </nav>

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
              placeholder="Enter search query, video url, or video id"
              type="video-search"
              aria-label="Enter search query, video url, or video id"
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
        </div>
      </header>
    </>
  );
};

export default React.memo(HomeNavbar);
