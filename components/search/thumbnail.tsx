"use client";
/* eslint-disable @next/next/no-img-element */
import { YoutubeSearchResult } from "@/lib/schemas/youtubeSearch";
import React, { useTransition } from "react";
import Account from "../svg/account";
import Time from "../svg/time";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../overlay/loading";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ThumbnailSearch = ({
  item,
  height = 120,
  width = 214,
  related = false,
}: {
  item: YoutubeSearchResult;
  height?: number;
  width?: number;
  related?: boolean;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (isPending) {
    return <LoadingOverlay isLoading={true} />;
  }

  return (
    <div
      onClick={() => {
        startTransition(() => {
          router.push(`/video/${item.id.videoId}`);
        });
      }}
      className="flex flex-col md:flex-row gap-4 p-2 rounded-xl hover:bg-neutral-200 cursor-pointer transition-all duration-300"
    >
      <Image
        src={item.snippet.thumbnails.medium.url}
        alt={item.snippet.title}
        className="rounded-xl h-full w-full"
        width={width}
        height={height}
      />
      <div className="flex-1 flex flex-col gap-2">
        <h4 className={cn("font-semibold text-lg", related && "text-sm")}>
          {item.snippet.title}
        </h4>
        <p
          className={cn(
            "text-sm text-neutral-500 font-medium",
            related && "text-xs line-clamp-2"
          )}
        >
          {item.snippet.description}
        </p>
        {!related && (
          <div className="flex items-center gap-2">
            <Account className="w-4 h-4" />
            <p className="text-xs text-neutral-600 font-bold">
              {item.snippet.channelTitle}
            </p>
          </div>
        )}
        {!related && (
          <div className="flex items-center gap-2">
            <Time className="w-4 h-4" />
            <p className="text-xs text-neutral-600 font-bold">
              {new Date(item.snippet.publishedAt).toUTCString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailSearch;
