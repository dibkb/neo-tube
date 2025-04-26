import ChatWindow from "@/components/chat/chat-window";
import RelatedVideos from "@/components/search/realated-videos";
import WarningIcon from "@/components/svg/warning-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  params: Promise<{ videoid: string }>;
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
    console.log("Error fetching video data:", error);
  }
  const comentSection = (
    <section className="flex flex-col gap-4">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={"item-1"}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={cn(
              "text-neutral-700 font-medium text-base",
              heading.className
            )}
          >
            Comments
          </AccordionTrigger>
          <AccordionContent>
            {commentData ? (
              <CommentSection commentData={commentData} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-neutral-700 font-semibold flex items-center gap-2">
                  <WarningIcon className="w-4 h-4" /> No comments found for this
                  video or some error occurred
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );

  return (
    <main className="w-full h-full grid grid-cols-12 gap-4">
      <section className="video-primary-content col-span-12 md:col-span-8 px-2 sm:px-0">
        <Player videoId={videoid} />
        <section className="flex flex-col gap-4">
          {data && <VideoContent data={data} />}
          {comentSection}
        </section>
      </section>
      <aside className="video-secondary-content col-span-12 md:col-span-4 w-full h-full">
        <ChatWindow videoId={videoid} />
        <RelatedVideos videoId={videoid} />
      </aside>
    </main>
  );
}
