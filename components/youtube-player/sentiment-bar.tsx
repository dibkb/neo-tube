import React from "react";

// Helper function to calculate the proportion of each sentiment
const calculateProportion = (count: number, total: number) => {
  return (count / total) * 100;
};

type SentimentBarProps = {
  positive: number;
  negative: number;
  neutral: number;
};

const SentimentBar: React.FC<SentimentBarProps> = ({
  positive,
  negative,
  neutral,
}) => {
  const totalCount = positive + negative + neutral;

  const positiveWidth = calculateProportion(positive, totalCount);
  const negativeWidth = calculateProportion(negative, totalCount);
  const neutralWidth = calculateProportion(neutral, totalCount);

  return (
    <div className="flex w-full h-2 rounded-lg overflow-hidden">
      <div
        className="bg-[#00CD4C]"
        style={{ width: `${positiveWidth}%` }}
        title={`Positive: ${positive}`}
      ></div>
      <div
        className="bg-[#FDBB35]"
        style={{ width: `${neutralWidth}%` }}
        title={`Neutral: ${neutral}`}
      ></div>
      <div
        className="bg-[#FE5E57]"
        style={{ width: `${negativeWidth}%` }}
        title={`Negative: ${negative}`}
      ></div>
    </div>
  );
};

export default SentimentBar;
