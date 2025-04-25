import React from "react";

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs text-neutral-700 bg-neutral-200 px-3 py-[2px] rounded-md font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
