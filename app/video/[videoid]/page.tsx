import ChatWindow from "@/components/chat/chat-window";
import { CommentSection } from "@/components/youtube-player/comment-section";
import Player from "@/components/youtube-player/player";
import { VideoContent } from "@/components/youtube-player/video-content";
import { api } from "@/lib/base-url";
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
  const { videoid } = await params;
  let data: YoutubeVideo | null = null;
  let commentData: CommentThreadListResponse | null = null;
  try {
    const [videoResponse, commentResponse] = await Promise.all([
      api.get(`/videos/info/${videoid}`),
      api.post(`/comment-sentiment/${videoid}`),
    ]);
    commentData = commentThreadListResponseSchema.parse(commentResponse.data);
    data = youtubeVideoSchema.parse(videoResponse.data);

    // Calculate response time
  } catch (error) {
    console.error("Error fetching video data:", error);
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

        <section className="flex flex-col gap-4">
          {data && <VideoContent data={data} />}
          {comentSection}
        </section>
      </section>
      <aside className="video-secondary-content col-span-12 md:col-span-3 relative w-full h-full">
        <ChatWindow videoId={videoid} />
      </aside>
    </main>
  );
}
