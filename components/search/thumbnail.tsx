import { YoutubeSearchResult } from "@/lib/schemas/youtubeSearch";
import React from "react";

const ThumbnailSearch = ({ item }: { item: YoutubeSearchResult }) => {
  return <div>{JSON.stringify(item)}</div>;
};

export default ThumbnailSearch;
