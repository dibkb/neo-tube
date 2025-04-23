import Player from "@/components/youtube-player/player";
import { VideoContent } from "@/components/youtube-player/video-content";
import api from "@/lib/base-url";
import { YoutubeVideo, youtubeVideoSchema } from "@/lib/schemas/youtubeVideo";
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
          <VideoContent
            data={data as YoutubeVideo}
            responseTime={responseTime}
          />
        )}
      </section>
      <aside className="video-secondary-content col-span-12 md:col-span-3">
        <h2 className="mb-4">XYZ</h2>
        {/* Related videos content would go here */}
      </aside>
    </main>
  );
}
