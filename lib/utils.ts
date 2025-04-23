import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { urlRegex, timestampRegex } from "./regx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const processText = (text: string) => {
  const parts = text
    .replace(urlRegex, "{{url_content}}")
    .split("{{url_content}}");
  const urls = text.match(urlRegex);
  return { parts, urls };
};

export const processPart = (part: string) => {
  const timeParts = part
    .replace(timestampRegex, "{{timestamp_content}}")
    .split("{{timestamp_content}}");
  const times = part.match(timestampRegex);
  return { timeParts, times };
};
