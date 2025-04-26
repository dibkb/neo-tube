import ChatWindow from "@/components/chat/chat-window";
import CommentSectionWrapper from "@/components/comments/comment-section";
import CommentStoreInitializer from "@/components/comments/comment-store-initializer";
import RelatedVideos from "@/components/search/realated-videos";
import Player from "@/components/youtube-player/player";
import { VideoContent } from "@/components/youtube-player/video-content";
import { api } from "@/lib/base-url";
import {
  CommentThreadListResponse,
  commentThreadListResponseSchema,
} from "@/lib/schemas/comments";
import { YoutubeVideo, youtubeVideoSchema } from "@/lib/schemas/youtubeVideo";
import React from "react";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ videoid: string }>;
}) {
  const { videoid } = await params;
  let data: YoutubeVideo | null = null;
  let commentData: CommentThreadListResponse | null = null;
  try {
    const [videoResponse, commentResponse] = await Promise.all([
      api.get(`/videos/info/${videoid}`),
      api.post(`/comment-sentiment/${videoid}`, {
        next_page_token: null,
      }),
    ]);
    commentData = commentThreadListResponseSchema.parse(commentResponse.data);
    data = youtubeVideoSchema.parse(videoResponse.data);
  } catch (error) {
    console.log("Error fetching video data:", error);
  }

  return (
    <main className="w-full h-full grid grid-cols-12 gap-4">
      {/* Initialize the comment store with data */}
      {commentData && <CommentStoreInitializer commentData={commentData} />}

      <section className="video-primary-content col-span-12 md:col-span-8 px-2 sm:px-0">
        <Player videoId={videoid} />
        <section className="flex flex-col gap-4">
          {data && <VideoContent data={data} />}
          <CommentSectionWrapper videoId={videoid} />
        </section>
      </section>
      <aside className="video-secondary-content col-span-12 md:col-span-4 w-full h-full">
        <ChatWindow videoId={videoid} />
        <RelatedVideos title={data?.snippet.title || videoid} />
      </aside>
    </main>
  );
}
