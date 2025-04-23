"use client";
import React, { memo, useState } from "react";
import { processText } from "@/lib/utils"; // Utility functions
import { cn } from "@/lib/utils";
import RenderParts from "./render-parts";
import { PinBottomIcon, PinTopIcon } from "../svg/pin";

// Define the interface for DescriptionProps and RenderPartProps
interface DescriptionProps {
  text: string;
}

// Main component to render the description text
const Description = ({ text }: DescriptionProps) => {
  // Split the text into blocks separated by double newlines
  const doubleLines = text?.split("\n\n");
  const [showLess, setShowLess] = useState(true);
  return (
    <div className="bg-neutral-100 p-4 mt-2 rounded-xl font-medium text-sm">
      <div
        className={cn(
          "text-sm overflow-hidden",
          showLess && "h-24 hover:cursor-pointer"
        )}
        onClick={() => {
          setShowLess((prev) => {
            return prev ? !prev : prev;
          });
        }}
      >
        {doubleLines?.map((block, blockIndex) => (
          <span key={blockIndex} className="mb-4">
            {block.split("\n").map((line, lineIndex) => {
              const { parts, urls } = processText(line); // Process each line for URLs
              return (
                <p
                  key={lineIndex}
                  className="flex flex-wrap items-center gap-1"
                >
                  <RenderParts parts={parts} urls={urls} />{" "}
                  {/* Render parts and URLs */}
                </p>
              );
            })}
          </span>
        ))}
      </div>
      <button
        onClick={() => setShowLess((prev) => !prev)}
        className="text-stone-800 font-semibold mx-auto text-xs hover:underline w-full flex items-center justify-center gap-1 group"
      >
        {showLess ? (
          <>
            <PinBottomIcon className="size-3" />
            Show more
          </>
        ) : (
          <>
            <PinTopIcon className="size-3" />
            Show less
          </>
        )}
      </button>
    </div>
  );
};

// Return memoized component
export default memo(Description);
