import { z } from "zod";

// Thumbnail schema
const thumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

// Thumbnails object schema
const thumbnailsSchema = z.object({
  default: thumbnailSchema,
  medium: thumbnailSchema,
  high: thumbnailSchema,
});

// Snippet schema
const snippetSchema = z.object({
  publishedAt: z.string().datetime(),
  channelId: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: thumbnailsSchema,
  channelTitle: z.string(),
  liveBroadcastContent: z.string(),
  publishTime: z.string().datetime(),
});

// ID schema
const idSchema = z.object({
  kind: z.literal("youtube#video"),
  videoId: z.string(),
});

// YouTube search result schema
export const youtubeSearchResultSchema = z.object({
  kind: z.literal("youtube#searchResult"),
  etag: z.string(),
  id: idSchema,
  snippet: snippetSchema,
});

// Type for YouTube search result
export type YoutubeSearchResult = z.infer<typeof youtubeSearchResultSchema>;

// Schema for an array of search results
export const youtubeSearchResultsSchema = z.array(youtubeSearchResultSchema);

// Type for an array of search results
export type YoutubeSearchResults = z.infer<typeof youtubeSearchResultsSchema>;
