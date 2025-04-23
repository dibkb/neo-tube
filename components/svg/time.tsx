import React from "react";

const Time = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className={className}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        color="currentColor"
      >
        <circle cx={12} cy={12} r={10}></circle>
        <path d="M9.5 9.5L13 13m3-5l-5 5"></path>
      </g>
    </svg>
  );
};

export default Time;
