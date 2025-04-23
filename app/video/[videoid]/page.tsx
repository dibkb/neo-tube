import { CommentSection } from "@/components/youtube-player/comment-section";
import Player from "@/components/youtube-player/player";
import { VideoContent } from "@/components/youtube-player/video-content";
import api from "@/lib/base-url";
import { heading } from "@/lib/fonts";
import {
  CommentThreadListResponse,
  commentThreadListResponseSchema,
} from "@/lib/schemas/comments";
import { YoutubeVideo, youtubeVideoSchema } from "@/lib/schemas/youtubeVideo";
import { cn } from "@/lib/utils";
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
  let data: YoutubeVideo | null = null;
  let responseTime = 0;
  let commentData: CommentThreadListResponse | null = null;
  try {
    const [videoResponse, commentResponse] = await Promise.all([
      api.get(`/videos/info/${videoid}`),
      api.post(`/comment-sentiment/${videoid}`),
    ]);
    commentData = commentThreadListResponseSchema.parse(commentResponse.data);
    data = youtubeVideoSchema.parse(videoResponse.data);
    // Calculate response time
    responseTime = Date.now() - startTime;
  } catch (error) {
    console.error("Error fetching video data:", error);
  } finally {
    isLoading = false;
  }
  const comentSection = (
    <section className="flex flex-col gap-4">
      <h2 className={cn("text-neutral-700 font-medium", heading.className)}>
        Comments
      </h2>
      {commentData && <CommentSection commentData={commentData} />}
    </section>
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
          <section className="flex flex-col gap-4">
            {data && <VideoContent data={data} responseTime={responseTime} />}
            {comentSection}
          </section>
        )}
      </section>
      <aside className="video-secondary-content col-span-12 md:col-span-3">
        <h2 className="mb-4">XYZ</h2>
        {/* Related videos content would go here */}
      </aside>
    </main>
  );
}
