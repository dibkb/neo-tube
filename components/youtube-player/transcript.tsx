/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TranscriptItem } from "@/lib/schemas/transcript";
import { heading } from "@/lib/fonts";
import WarningIcon from "../svg/warning-icon";

interface TranscriptProps {
  transcript: TranscriptItem[];
  currentTime: number;
  isLoading?: boolean;
}

const Transcript = ({
  transcript,
  currentTime,
  isLoading = false,
}: TranscriptProps) => {
  const [activeItem, setActiveItem] = useState<TranscriptItem | null>(null);
  useEffect(() => {
    const item = transcript.find(
      (item) => currentTime >= item.startTime && currentTime < item.endTime
    );
    if (item) {
      setActiveItem(item);
    }
  }, [currentTime, transcript]);
  let content = null;
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <img
          src={
            "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          }
          alt="Loading..."
          className="h-5"
        />
      </div>
    );
  } else if (!transcript || transcript.length === 0) {
    content = (
      <div className="p-2 font-semibold text-sm text-blue-500 flex items-center gap-2">
        <WarningIcon className="w-6 h-6" /> No transcript available
      </div>
    );
  } else {
    content = (
      <div className="space-y-2 overflow-y-auto max-h-[400px]">
        <div
          className={cn("p-2 rounded")}
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("seekVideo", {
                detail: { time: activeItem?.startTime },
              })
            );
          }}
        >
          <div className="flex justify-between text-blue-600">
            <span className="text-sm font-semibold italic">
              &quot;{activeItem?.text}&quot;
            </span>
            <span className="text-xs">
              {formatTime(activeItem?.startTime || 0)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-4">
      <h3 className={cn("text-neutral-700 mb-2", heading.className)}>
        Transcript
      </h3>
      <div className="max-h-[200px] overflow-y-auto bg-blue-50/50 p-2 rounded-xl">
        {content}
      </div>
    </div>
  );
};

// Helper function to format seconds into MM:SS format
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export default Transcript;
