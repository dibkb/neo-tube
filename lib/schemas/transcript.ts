import { z } from "zod";

// Schema for individual transcript items
export const transcriptItemSchema = z.object({
  text: z.string(),
  start: z.number(),
  dur: z.number(),
});
export const transcriptItemArraySchema = z.array(transcriptItemSchema);

// Type for transcript item
export type TranscriptItem = z.infer<typeof transcriptItemSchema>;

// Schema for the full transcript response

// Type for transcript response
export type TranscriptResponse = z.infer<typeof transcriptItemArraySchema>;
