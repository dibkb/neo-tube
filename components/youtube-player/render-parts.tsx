import { processPart } from "@/lib/utils";
import { Fragment } from "react";

interface RenderPartProps {
  parts: string[];
  urls: string[] | null;
}
// Component to render parts of the text, including URLs and timestamps
const RenderParts = ({ parts, urls }: RenderPartProps) => {
  return (
    <>
      {parts.map((part, index) => {
        const { timeParts, times } = processPart(part); // Process each part for timestamps
        return (
          <Fragment key={index}>
            {timeParts.map((timePart, timeIndex) => (
              <Fragment key={timeIndex}>
                {timePart}
                {times && times[timeIndex] && (
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:underline"
                  >
                    {times[timeIndex]}
                  </a>
                )}
              </Fragment>
            ))}
            {urls && urls[index] && (
              <a
                href={urls[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:underline"
              >
                {urls[index]}
              </a>
            )}
          </Fragment>
        );
      })}
    </>
  );
};
export default RenderParts;
