"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import Transcript from "./transcript";
import { TranscriptItem } from "@/lib/schemas/transcript";
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
      setTimeout(() => {
        const simulatedTranscript = [
          { text: "Welcome to this video!", startTime: 0, endTime: 3 },
          {
            text: "Today we'll be discussing important topics.",
            startTime: 3,
            endTime: 7,
          },
          { text: "Let's dive right into it.", startTime: 7, endTime: 10 },
          {
            text: "This is a key point to remember.",
            startTime: 10,
            endTime: 15,
          },
          {
            text: "Here's another important concept.",
            startTime: 15,
            endTime: 20,
          },
          {
            text: "Let me show you how this works.",
            startTime: 20,
            endTime: 25,
          },
          {
            text: "You can see the results right here.",
            startTime: 25,
            endTime: 30,
          },
          { text: "That's all for today's video.", startTime: 30, endTime: 35 },
          { text: "Thanks for watching!", startTime: 35, endTime: 40 },
          { text: "Thanks for watching!", startTime: 40, endTime: 45 },
          { text: "Thanks for watching!", startTime: 45, endTime: 50 },
          { text: "Thanks for watching!", startTime: 50, endTime: 55 },
          { text: "Thanks for watching!", startTime: 55, endTime: 60 },
          { text: "Thanks for watching!", startTime: 60, endTime: 65 },
          { text: "Thanks for watching!", startTime: 65, endTime: 70 },
          { text: "Thanks for watching!", startTime: 70, endTime: 75 },
          { text: "Thanks for watching!", startTime: 75, endTime: 80 },
          { text: "Thanks for watching!", startTime: 80, endTime: 85 },
          { text: "Thanks for watching!", startTime: 85, endTime: 90 },
        ];
        setTranscript(simulatedTranscript);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching transcript:", error);
      setIsLoading(false);
    }
  }, []);

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
    height: "645",
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
        className="mb-4"
      />
      <Transcript
        transcript={transcript}
        currentTime={currentTime}
        isLoading={isLoading}
      />
    </div>
  );
}
