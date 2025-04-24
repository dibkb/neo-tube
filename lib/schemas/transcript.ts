import { z } from "zod";

// Schema for individual transcript items
export const transcriptItemSchema = z.object({
  text: z.string(),
  startTime: z.number(),
  endTime: z.number(),
});

// Type for transcript item
export type TranscriptItem = z.infer<typeof transcriptItemSchema>;

// Schema for the full transcript response
export const transcriptResponseSchema = z.object({
  items: z.array(transcriptItemSchema),
  language: z.string().optional(),
});

// Type for transcript response
export type TranscriptResponse = z.infer<typeof transcriptResponseSchema>;
