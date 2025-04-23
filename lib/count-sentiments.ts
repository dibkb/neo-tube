import { CommentThread } from "./schemas/comments";

export const calculateSentiment = (
  comments: CommentThread[]
): Record<
  CommentThread["snippet"]["topLevelComment"]["snippet"]["sentiment"],
  number
> => {
  const sentimentCounts = comments.reduce(
    (acc, c) => {
      switch (c.snippet.topLevelComment.snippet.sentiment) {
        case "negative":
          acc.negative++;
          break;
        case "neutral":
          acc.neutral++;
          break;
        case "positive":
          acc.positive++;
          break;
      }
      return acc;
    },
    {
      positive: 0,
      neutral: 0,
      negative: 0,
    }
  );
  return sentimentCounts;
};
