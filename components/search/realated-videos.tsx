/* eslint-disable @next/next/no-img-element */
"use client";
import { api } from "@/lib/base-url";
import { heading } from "@/lib/fonts";
import {
  YoutubeSearchResult,
  youtubeSearchResultsSchema,
} from "@/lib/schemas/youtubeSearch";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ThumbnailSearch from "./thumbnail";
import { CircleAlert, Loader2 } from "lucide-react";
const RelatedVideos = ({ title }: { title: string }) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<YoutubeSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await api.get(`/videos/search-related`, {
          params: {
            title: decodeURIComponent(title).substring(0, 20),
            maxResults: 10,
          },
        });
        const data = await response.data;
        if (data && youtubeSearchResultsSchema.safeParse(data).success) {
          setVideos(data);
        } else {
          setError("Invalid data");
        }
      } catch {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, [title]);
  let content = null;
  if (loading) {
    content = (
      <div>
        <Loader2 />
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex flex-col items-center gap-2 mt-4">
        <p className="text-neutral-700 font-semibold flex items-center gap-2">
          <CircleAlert className="w-4 h-4" /> {error}
        </p>
        <img
          src={
            "https://media1.tenor.com/m/3TSzTuVEIEAAAAAC/quantum-society-quantum-utilities.gif"
          }
          alt=""
          className="w-full"
        />
      </div>
    );
  } else if (videos.length > 0) {
    content = videos.map((video) => (
      <ThumbnailSearch key={video.etag} item={video} related={true} />
    ));
  }

  return (
    <div className="p-4">
      <h3 className={cn("text-neutral-700 font-medium", heading.className)}>
        Related Videos
      </h3>
      {content}
    </div>
  );
};

export default RelatedVideos;
