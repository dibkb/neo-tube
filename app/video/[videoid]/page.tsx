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
    data = youtubeVideoSchema.parse(response.data);
    // Calculate response time
    responseTime = Date.now() - startTime;
  } catch (error) {
    console.error("Error fetching video data:", error);
  } finally {
    isLoading = false;
  }

  const content = (
    <article className="video-content">
      <div
        aria-label="Performance metrics"
        className="text-xs text-neutral-500 mt-2 font-medium"
      >
        ⚡️ Response time: {responseTime}ms
      </div>

      <h1 className="text-lg text-neutral-700 mt-1 font-semibold">
        {data?.snippet.title}
      </h1>

      <section className="video-metadata flex items-center justify-between gap-2 mt-2">
        <div className="channel-info flex items-center gap-2">
          <Account className="w-8 h-8 text-neutral-400" aria-hidden="true" />
          <h2 className="text-sm text-neutral-700 font-semibold">
            {data?.snippet.channelTitle}
          </h2>
        </div>

        <ul className="video-stats flex items-center gap-4 list-none">
          <li className="flex items-center gap-1">
            <CalenderIcon
              className="w-4 h-4 text-neutral-400"
              aria-hidden="true"
            />
            <time
              className="text-xs text-neutral-700 font-semibold"
              dateTime={data?.snippet?.publishedAt}
            >
              {new Date(data?.snippet?.publishedAt || "").toLocaleDateString()}
            </time>
          </li>
          <li className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4 text-neutral-400" aria-hidden="true" />
            <span className="text-xs text-neutral-700 font-semibold">
              <span className="sr-only">Views: </span>
              {Number(data?.statistics.viewCount).toLocaleString()}
            </span>
          </li>
          <li className="flex items-center gap-1">
            <LikeIcon className="w-4 h-4 text-neutral-400" aria-hidden="true" />
            <span className="text-xs text-neutral-700 font-semibold">
              <span className="sr-only">Likes: </span>
              {Number(data?.statistics.likeCount).toLocaleString()}
            </span>
          </li>
        </ul>
      </section>

      <VideoDetails categoryId={Number(data?.snippet.categoryId)} />
      <Description text={data?.snippet.description || ""} />
    </article>
  );

  return (
    <main className="w-full h-full grid grid-cols-12 gap-4">
      <section className="video-primary-content col-span-12 md:col-span-9">
        <Player videoId={videoid} />
        {isLoading ? (
          <div
            role="status"
            className="mt-4 p-4 rounded bg-gray-100 animate-pulse"
          >
            <span>Loading video data...</span>
          </div>
        ) : (
          content
        )}
      </section>
      <aside className="video-secondary-content col-span-12 md:col-span-3">
        <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
        {/* Related videos content would go here */}
      </aside>
    </main>
  );
}
