import { CommentThreadListResponse } from "@/lib/schemas/comments";
import React from "react";

export const CommentSection = ({
  commentData,
}: {
  commentData: CommentThreadListResponse;
}) => {
  try {
    return <div>{commentData.items.length}</div>;
  } catch (error) {
    console.error(error);
    return <div>Error loading comments</div>;
  }
};
