import { z } from "zod";

// Thumbnails schema
const thumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

// Thumbnails collection schema
const thumbnailsSchema = z.object({
  default: thumbnailSchema,
  medium: thumbnailSchema,
  high: thumbnailSchema,
  standard: thumbnailSchema,
  maxres: thumbnailSchema,
});

// Localized content schema
const localizedSchema = z.object({
  title: z.string(),
  description: z.string(),
});

// Snippet schema
const snippetSchema = z.object({
  publishedAt: z.string(),
  channelId: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: thumbnailsSchema,
  channelTitle: z.string(),
  tags: z.array(z.string()),
  categoryId: z.string(),
  liveBroadcastContent: z.string(),
  defaultLanguage: z.string().optional(),
  localized: localizedSchema,
  defaultAudioLanguage: z.string().optional(),
});

// Content details schema
const contentDetailsSchema = z.object({
  duration: z.string(),
  dimension: z.string(),
  definition: z.string(),
  caption: z.string(),
  licensedContent: z.boolean(),
  contentRating: z.record(z.string(), z.any()).optional(),
  projection: z.string(),
});

// Statistics schema
const statisticsSchema = z.object({
  viewCount: z.string(),
  likeCount: z.string(),
  favoriteCount: z.string(),
  commentCount: z.string(),
});

// YouTube video schema
export const youtubeVideoSchema = z.object({
  kind: z.literal("youtube#video"),
  etag: z.string(),
  id: z.string(),
  snippet: snippetSchema,
  contentDetails: contentDetailsSchema,
  statistics: statisticsSchema,
});

// Type definition derived from the schema
export type YoutubeVideo = z.infer<typeof youtubeVideoSchema>;
