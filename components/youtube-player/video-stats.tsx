import { EyeIcon } from "lucide-react";
import React from "react";
import CalenderIcon from "../svg/calender";
import LikeIcon from "../svg/like";

interface VideoStatsProps {
  publishedAt: string;
  viewCount: number;
  likeCount: number;
}

const VideoStats = ({ publishedAt, viewCount, likeCount }: VideoStatsProps) => {
  return (
    <ul className="video-stats flex items-center gap-4 list-none">
      <li className="flex items-center gap-1">
        <CalenderIcon className="w-4 h-4 text-neutral-400" aria-hidden="true" />
        <time
          className="text-xs text-neutral-700 font-semibold"
          dateTime={publishedAt}
        >
          {new Date(publishedAt || "").toLocaleDateString()}
        </time>
      </li>
      <li className="flex items-center gap-1">
        <EyeIcon className="w-4 h-4 text-neutral-400" aria-hidden="true" />
        <span className="text-xs text-neutral-700 font-semibold">
          <span className="sr-only">Views: </span>
          {Number(viewCount).toLocaleString()}
        </span>
      </li>
      <li className="flex items-center gap-1">
        <LikeIcon className="w-4 h-4 text-neutral-400" aria-hidden="true" />
        <span className="text-xs text-neutral-700 font-semibold">
          <span className="sr-only">Likes: </span>
          {Number(likeCount).toLocaleString()}
        </span>
      </li>
    </ul>
  );
};

export default VideoStats;
