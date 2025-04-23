"use client";
/* eslint-disable @next/next/no-img-element */
import { YoutubeSearchResult } from "@/lib/schemas/youtubeSearch";
import React, { useState } from "react";
import Account from "../svg/account";
import Time from "../svg/time";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../overlay/loading";
const ThumbnailSearch = ({ item }: { item: YoutubeSearchResult }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }
  return (
    <div
      onClick={() => {
        setIsLoading(true);
        router.push(`/video/${item.id.videoId}`);
        setIsLoading(false);
      }}
      className="flex gap-4 p-2 rounded-xl hover:bg-neutral-200 cursor-pointer transition-all duration-300"
    >
      <img
        src={item.snippet.thumbnails.medium.url}
        alt={item.snippet.title}
        className="rounded-xl"
        width={214}
        height={120}
      />
      <div className="flex-1 flex flex-col gap-2">
        <h4 className="font-semibold text-lg">{item.snippet.title}</h4>
        <p className="text-sm text-neutral-500 font-medium">
          {item.snippet.description}
        </p>
        <div className="flex items-center gap-2">
          <Account className="w-4 h-4" />
          <p className="text-xs text-neutral-600 font-bold">
            {item.snippet.channelTitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Time className="w-4 h-4" />
          <p className="text-xs text-neutral-600 font-bold">
            {new Date(item.snippet.publishedAt).toUTCString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailSearch;
