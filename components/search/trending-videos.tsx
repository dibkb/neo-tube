"use client";
import { YouTubeTrendingVideos } from "@/lib/schemas/youtube-tending";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Image from "next/image";
import Time from "../svg/time";
import Account from "../svg/account";
import LoadingOverlay from "../overlay/loading";

export default function TrendingVideos({
  data,
}: {
  data: YouTubeTrendingVideos;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const content = data.map((item) => {
    return (
      <div
        key={item.id}
        onClick={() => {
          startTransition(() => {
            router.push(`/video/${item.id}`);
          });
        }}
        className="col-span-1 flex flex-col gap-4 p-2 rounded-xl hover:bg-neutral-200 cursor-pointer transition-all duration-300 my-4"
      >
        <Image
          src={item.snippet.thumbnails.high.url}
          alt={item.snippet.title}
          className="rounded-xl w-full h-full"
          width={item.snippet.thumbnails.high.width}
          height={item.snippet.thumbnails.high.height - 100}
        />
        <div className="flex-1 flex flex-col gap-2">
          <h4 className={cn("font-semibold text-sm")}>{item.snippet.title}</h4>
          {
            <div className="flex items-center gap-2">
              <Account className="w-4 h-4" />
              <p className="text-xs text-neutral-600 font-bold line-clamp-2">
                {item.snippet.channelTitle}
              </p>
            </div>
          }
          {
            <div className="flex items-center gap-2">
              <Time className="w-4 h-4" />
              <p className="text-xs text-neutral-600 font-bold">
                {new Date(item.snippet.publishedAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
          }
        </div>
      </div>
    );
  });

  if (isPending) {
    return <LoadingOverlay isLoading={true} />;
  } else return content;
}
