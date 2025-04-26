"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { heading } from "@/lib/fonts";
import WarningIcon from "../svg/warning-icon";
import { CommentSection } from "../youtube-player/comment-section";
import {
  CommentThreadListResponse,
  commentThreadListResponseSchema,
} from "@/lib/schemas/comments";
import { useCommentStore } from "@/lib/store";
import { api } from "@/lib/base-url";

const CommentSectionWrapper = ({
  commentData,
  videoId,
}: {
  videoId: string;
  commentData?: CommentThreadListResponse;
}) => {
  // Use comment data from store or props
  const storeCommentData = useCommentStore((state) => state.commentData);
  const mergeCommentData = useCommentStore((state) => state.mergeCommentData);
  const comments = commentData || storeCommentData;

  const [isLoading, setIsLoading] = useState(false);

  const [pageToken, setPageToken] = useState(comments?.nextPageToken);
  useEffect(() => {
    setPageToken(comments?.nextPageToken);
  }, [comments]);

  const loadMoreComments = async () => {
    if (!pageToken || isLoading) return;

    setIsLoading(true);
    try {
      const response = await api.post(`/comment-sentiment/${videoId}`, {
        next_page_token: pageToken,
      });
      const data = commentThreadListResponseSchema.parse(response.data);
      setPageToken(data.nextPageToken);
      mergeCommentData(data);
    } catch (error) {
      console.error("Error loading more comments:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
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
            {comments ? (
              <CommentSection commentData={comments} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-neutral-700 font-semibold flex items-center gap-2">
                  <WarningIcon className="w-4 h-4" /> No comments found for this
                  video or some error occurred
                </p>
              </div>
            )}
            {pageToken && (
              <button
                onClick={loadMoreComments}
                disabled={isLoading}
                className="font-semibold flex items-center gap-2 mx-auto px-4 py-1 rounded-md bg-blue-400/50 text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400/70 transition-all duration-300"
              >
                {isLoading ? "Loading..." : "Load more comments"}
              </button>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default CommentSectionWrapper;
