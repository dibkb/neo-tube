"use server";

import { api } from "@/lib/base-url";
import { YouTubeTrendingVideosSchema } from "@/lib/schemas/youtube-tending";

export async function fetchTrendingVideos(country: string) {
  try {
    const response = await api.get("/videos/trending-videos", {
      params: {
        country,
      },
    });
    return YouTubeTrendingVideosSchema.parse(response.data);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch trending videos");
  }
}
