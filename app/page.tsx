import { fetchTrendingVideos } from "@/server/fetch-trending";
import { cn } from "@/lib/utils";
import TrendingVideos from "@/components/search/trending-videos";

export default async function Home() {
  try {
    const [trendingVideosIndia, trendingVideosUS, trendingVideosUK] =
      await Promise.all([
        fetchTrendingVideos("IN"),
        fetchTrendingVideos("US"),
        fetchTrendingVideos("GB"),
        fetchTrendingVideos("FR"),
      ]);
    return (
      <main className="container mx-auto flex flex-col gap-6">
        <section>
          <h3 className={cn("text-neutral-700 font-medium text-lg mb-4")}>
            Trending Videos in India 🇮🇳
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrendingVideos data={trendingVideosIndia} />
          </div>
        </section>
        <section>
          <h3 className={cn("text-neutral-700 font-medium text-lg mb-4")}>
            Trending Videos in US 🇺🇸
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrendingVideos data={trendingVideosUS} />
          </div>
        </section>
        <section>
          <h3 className={cn("text-neutral-700 font-medium text-lg mb-4")}>
            Trending Videos in UK 🇬🇧
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrendingVideos data={trendingVideosUK} />
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error(error);
  }
}
