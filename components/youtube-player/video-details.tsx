import { heading } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Category from "../svg/category";
import { youtubeCategoryMap } from "@/lib/data/category";

const VideoDetails = ({ categoryId }: { categoryId: number }) => (
  <span
    className={cn(
      "my-2 flex items-center justify-between text-sm text-stone-700 border-b pb-2",
      heading.className
    )}
  >
    <h1 className="flex items-center gap-1">
      <Category className="size-4" />
      {youtubeCategoryMap[categoryId]}
    </h1>
  </span>
);
export default VideoDetails;
