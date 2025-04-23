import { z } from "zod";

// Schema for author channel ID
const authorChannelIdSchema = z.object({
  value: z.string(),
});

// Schema for a single comment
const commentSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  snippet: z.object({
    channelId: z.string(),
    videoId: z.string(),
    textDisplay: z.string(),
    textOriginal: z.string(),
    authorDisplayName: z.string(),
    authorProfileImageUrl: z.string(),
    authorChannelUrl: z.string(),
    authorChannelId: authorChannelIdSchema,
    canRate: z.boolean(),
    viewerRating: z.string(),
    likeCount: z.number(),
    publishedAt: z.string(),
    updatedAt: z.string(),
    sentiment: z.enum(["positive", "negative", "neutral"]),
  }),
});

// Schema for a comment thread
const commentThreadSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  snippet: z.object({
    channelId: z.string(),
    videoId: z.string(),
    topLevelComment: commentSchema,
    canReply: z.boolean(),
    totalReplyCount: z.number(),
    isPublic: z.boolean(),
  }),
  canReply: z.boolean().optional(),
  totalReplyCount: z.number().optional(),
  isPublic: z.boolean().optional(),
});

// Schema for the page info
const pageInfoSchema = z.object({
  totalResults: z.number(),
  resultsPerPage: z.number(),
});

// Main schema for comment thread list response
export const commentThreadListResponseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string().optional(),
  pageInfo: pageInfoSchema,
  items: z.array(commentThreadSchema),
});

// Types derived from the schema
export type CommentThreadListResponse = z.infer<
  typeof commentThreadListResponseSchema
>;
export type CommentThread = z.infer<typeof commentThreadSchema>;
export type Comment = z.infer<typeof commentSchema>;
