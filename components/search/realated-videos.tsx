"use client";
import { api } from "@/lib/base-url";
import { heading } from "@/lib/fonts";
import {
  YoutubeSearchResult,
  youtubeSearchResultSchema,
} from "@/lib/schemas/youtubeSearch";
import { cn } from "@/lib/utils";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import ThumbnailSearch from "./thumbnail";
const RelatedVideos = ({ videoId }: { videoId: string }) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<YoutubeSearchResult[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await api.get(`/videos/search-related`, {
          params: {
            videoId: videoId,
            maxResults: 10,
          },
        });
        const data = await response.data;
        const content = data.map((item: unknown) => {
          const etag = (item as { etag?: string })?.etag;
          if (etag) {
            if (youtubeSearchResultSchema.safeParse(item).success) {
              const parsedItem = youtubeSearchResultSchema.parse(item);
              return parsedItem;
            }
          }
        });
        setVideos(content);
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error.response?.data);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [videoId]);

  return (
    <div className="absolute top-[90vh] left-0 w-full h-full p-4">
      <h3 className={cn("text-neutral-700 font-medium", heading.className)}>
        Related Videos
      </h3>
      {videos.length > 0 &&
        videos.map((video) => (
          <ThumbnailSearch key={video.etag} item={video} related={true} />
        ))}
    </div>
  );
};

export default RelatedVideos;
