import Account from "@/components/svg/account";
import CalenderIcon from "@/components/svg/calender";
import EyeIcon from "@/components/svg/eye";
import LikeIcon from "@/components/svg/like";
import Description from "@/components/youtube-player/description";
import Player from "@/components/youtube-player/player";
import VideoDetails from "@/components/youtube-player/video-details";
import api from "@/lib/base-url";
import { youtubeVideoSchema } from "@/lib/schemas/youtubeVideo";
import React from "react";

export default async function VideoPage({
  params,
}: {
  params: { videoid: string };
}) {
  const { videoid } = params;

  // Start timer for API request
  const startTime = Date.now();

  let isLoading = true;
  let data = null;
  let responseTime = 0;

  try {
    const response = await api.get(`/videos/info/${videoid}`);
    console.log(response.data);
    data = youtubeVideoSchema.parse(response.data);
    // Calculate response time
    responseTime = Date.now() - startTime;
  } catch (error) {
    console.error("Error fetching video data:", error);
  } finally {
    isLoading = false;
  }
  const content = (
    <div>
      <div className="text-xs text-neutral-500 mt-2 font-medium">
        ⚡️ Response time: {responseTime}ms
      </div>
      <div className="text-lg text-neutral-700 mt-1 font-semibold">
        {data?.snippet.title}
      </div>
      <section className="flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-2">
          <Account className="w-8 h-8 text-neutral-400" />
          <p className="text-sm text-neutral-700 font-semibold">
            {data?.snippet.channelTitle}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <CalenderIcon className="w-4 h-4 text-neutral-400" />
            <p className="text-xs text-neutral-700 font-semibold">
              {new Date(data?.snippet?.publishedAt || "").toLocaleDateString()}
            </p>
          </span>
          <span className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4 text-neutral-400" />
            <p className="text-xs text-neutral-700 font-semibold">
              {Number(data?.statistics.viewCount).toLocaleString()}
            </p>
          </span>
          <span className="flex items-center gap-1">
            <LikeIcon className="w-4 h-4 text-neutral-400" />
            <p className="text-xs text-neutral-700 font-semibold">
              {Number(data?.statistics.likeCount).toLocaleString()}
            </p>
          </span>
        </div>
      </section>
      <VideoDetails categoryId={Number(data?.snippet.categoryId)} />
      <Description text={data?.snippet.description || ""} />
    </div>
  );

  return (
    <div className="w-full h-full grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-9">
        <Player videoId={videoid} />
        {isLoading ? (
          <div className="mt-4 p-4 rounded bg-gray-100 animate-pulse">
            Loading video data...
          </div>
        ) : (
          content
        )}
      </div>
      <div className="col-span-12 md:col-span-3">
        <h1>Hello</h1>
      </div>
    </div>
  );
}
