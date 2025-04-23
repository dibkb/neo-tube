import { cn } from "@/lib/utils";
import React from "react";

export const PinBottomIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 15 15"
      className={cn(className)}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.5 13.95a.45.45 0 0 0 0-.9h-12a.45.45 0 1 0 0 .9zm-2.432-6.382a.45.45 0 1 0-.636-.636L7.95 9.414V1.5a.45.45 0 0 0-.9 0v7.914L4.568 6.932a.45.45 0 1 0-.636.636l3.25 3.25a.45.45 0 0 0 .636 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
export const PinTopIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 15 15"
      className={cn(className)}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.5 1.05a.45.45 0 1 0 0 .9h12a.45.45 0 1 0 0-.9zm2.432 6.382a.45.45 0 1 0 .636.636L7.05 5.586V13.5a.45.45 0 0 0 .9 0V5.586l2.482 2.482a.45.45 0 1 0 .636-.636l-3.25-3.25a.45.45 0 0 0-.636 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
