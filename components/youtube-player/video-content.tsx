import VideoStats from "./video-stats";

import VideoDetails from "./video-details";
import Description from "./description";
import Account from "../svg/account";
import { YoutubeVideo } from "@/lib/schemas/youtubeVideo";
import Tags from "./tags";

interface VideoContentProps {
  data: YoutubeVideo;
}
export const VideoContent = ({ data }: VideoContentProps) => {
  const content = (
    <article className="">
      <h1 className="text-lg text-neutral-700 mt-1 font-semibold">
        {data?.snippet.title}
      </h1>

      <section className="video-metadata flex items-center justify-between flex-wrap gap-2 mt-2">
        <div className="channel-info flex items-center gap-2">
          <Account
            className="w-6 h-6 md:w-8 md:h-8 text-neutral-400"
            aria-hidden="true"
          />
          <h2 className="text-sm text-neutral-700 font-semibold">
            {data?.snippet.channelTitle}
          </h2>
        </div>
        <VideoStats
          publishedAt={data?.snippet.publishedAt || ""}
          viewCount={Number(data?.statistics.viewCount) || 0}
          likeCount={Number(data?.statistics.likeCount) || 0}
        />
      </section>

      <VideoDetails categoryId={Number(data?.snippet.categoryId)} />
      <Description text={data?.snippet.description || ""} />
      <Tags tags={data?.snippet.tags || []} />
    </article>
  );

  return <section className="flex flex-col gap-4">{content}</section>;
};
