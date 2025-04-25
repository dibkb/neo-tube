import { z } from "zod";

export const ThumbnailSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

export const ThumbnailsSchema = z.object({
  default: ThumbnailSchema,
  medium: ThumbnailSchema,
  high: ThumbnailSchema,
  standard: ThumbnailSchema.optional(),
  maxres: ThumbnailSchema.optional(),
});

export const LocalizedSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const SnippetSchema = z.object({
  publishedAt: z.string().datetime(),
  channelId: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnails: ThumbnailsSchema,
  channelTitle: z.string(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string(),
  liveBroadcastContent: z.string(),
  localized: LocalizedSchema,
  defaultAudioLanguage: z.string().optional(),
});

export const YouTubeVideoSchema = z.object({
  kind: z.literal("youtube#video"),
  etag: z.string(),
  id: z.string(),
  snippet: SnippetSchema,
});

export const YouTubeTrendingVideosSchema = z.array(YouTubeVideoSchema);

export type YouTubeVideo = z.infer<typeof YouTubeVideoSchema>;
export type YouTubeTrendingVideos = z.infer<typeof YouTubeTrendingVideosSchema>;
