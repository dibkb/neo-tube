import Player from "@/components/youtube-player/player";
import React from "react";

export default function VideoPage({ params }: { params: { videoid: string } }) {
  const { videoid } = params;

  return (
    <div>
      <Player videoId={videoid} />
    </div>
  );
}
