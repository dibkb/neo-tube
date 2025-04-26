import ThumbnailSearch from "@/components/search/thumbnail";
import WarningIcon from "@/components/svg/warning-icon";
import { api } from "@/lib/base-url";
import { youtubeSearchResultSchema } from "@/lib/schemas/youtubeSearch";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;
  try {
    const response = await api.post(`/videos/search?query=${query}`);
    const result = response.data;

    const content = result.map((item: unknown) => {
      const etag = (item as { etag?: string })?.etag;

      if (!etag) return null;

      if (youtubeSearchResultSchema.safeParse(item).success) {
        const parsedItem = youtubeSearchResultSchema.parse(item);
        return <ThumbnailSearch key={etag} item={parsedItem}></ThumbnailSearch>;
      }

      return null;
    });

    return (
      <section className="my-4">
        <h3 className="font-semibold text-center mb-4 text-blue-600">
          Showing results for &quot;{decodeURIComponent(query)}&quot;
        </h3>
        <div className="flex flex-col gap-4">{content}</div>
      </section>
    );
  } catch {
    return (
      <div className="p-4 text-center flex flex-col gap-2">
        <span className="flex items-center justify-center gap-2 text-orange-500">
          <WarningIcon className="w-7 h-7" />
          <h2 className="text-xl font-semibold">Error</h2>
        </span>
        <p className="text-neutral-700 text-sm font-semibold">
          Failed to load search results. Please try again later.
        </p>
      </div>
    );
  }
}
