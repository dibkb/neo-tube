"use client";

import { CommentThreadListResponse } from "@/lib/schemas/comments";
import { useCommentStore } from "@/lib/store";
import { useEffect } from "react";

interface CommentStoreInitializerProps {
  commentData: CommentThreadListResponse;
}

export default function CommentStoreInitializer({
  commentData,
}: CommentStoreInitializerProps) {
  const { setCommentData } = useCommentStore();

  useEffect(() => {
    if (commentData) {
      setCommentData(commentData);
    }
  }, [commentData, setCommentData]);

  return null;
}
