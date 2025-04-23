/* eslint-disable @next/next/no-img-element */
import {
  CommentThreadListResponse,
  CommentThread,
} from "@/lib/schemas/comments";
import React from "react";
import LikeIcon from "../svg/like";
import { ReplyIcon } from "lucide-react";

export const CommentSection = ({
  commentData,
}: {
  commentData: CommentThreadListResponse;
}) => {
  return (
    <div className="flex flex-col gap-6">
      {commentData.items.map((item) => (
        <SingleComment key={item.id} comment={item} />
      ))}
    </div>
  );
};

const SingleComment = ({ comment }: { comment: CommentThread }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <img
          src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">
              {comment.snippet.topLevelComment.snippet.authorDisplayName}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(
                comment.snippet.topLevelComment.snippet.publishedAt
              ).toLocaleDateString()}
            </p>
          </div>
          <p className="text-sm font-medium">
            {comment.snippet.topLevelComment.snippet.textDisplay}
          </p>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs">
              <LikeIcon className="w-4 h-4" />
              <p>{comment.snippet.topLevelComment.snippet.likeCount}</p>
            </span>
            <span className="flex items-center gap-1 text-xs">
              <ReplyIcon className="w-4 h-4" />
              <p>{comment.snippet.totalReplyCount}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
