"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import Transcript from "./transcript";
import {
  TranscriptItem,
  transcriptItemArraySchema,
} from "@/lib/schemas/transcript";
import { chatApi } from "@/lib/base-url";
// import api from "@/lib/base-url"; // Uncomment when implementing real API calls

export default function Player({ videoId }: { videoId: string }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<YouTubePlayer | null>(null);

  // Fetch transcript data
  const fetchTranscript = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await chatApi.get(
        `generate-transcript?videoId=${videoId}`
      );
      const data = await response.data;
      const transcript = transcriptItemArraySchema.safeParse(data.transcript);
      if (transcript.success) {
        setTranscript(transcript.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching transcript:", error);
      setIsLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    fetchTranscript();
  }, [fetchTranscript]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // Store player reference
    playerRef.current = event.target;
    // Start playing
    event.target.playVideo();
  };

  // Handle seeking when clicking on transcript items
  useEffect(() => {
    const handleSeek = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (playerRef.current && customEvent.detail?.time !== undefined) {
        playerRef.current.seekTo(customEvent.detail.time, true);
      }
    };

    window.addEventListener("seekVideo", handleSeek);
    return () => {
      window.removeEventListener("seekVideo", handleSeek);
    };
  }, []);

  // Set up interval to track player time
  useEffect(() => {
    if (!playerRef.current) return;

    const interval = setInterval(() => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
      }
    }, 200); // Update time every 200ms

    return () => clearInterval(interval);
  }, [playerRef.current]);

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="player-with-transcript">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={(e) => {
          // When video state changes, update time
          if (e.data === 1) {
            // 1 = playing
            setCurrentTime(e.target.getCurrentTime());
          }
        }}
        className="mb-4 h-[200px] sm:h-[400px] md:h-[400px] lg:h-[500px]"
      />
      <Transcript
        transcript={transcript}
        currentTime={currentTime}
        isLoading={isLoading}
      />
    </div>
  );
}
