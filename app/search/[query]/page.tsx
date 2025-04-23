import api from "@/lib/base-url";

export default async function SearchPage({
  params,
}: {
  params: { query: string };
}) {
  const { query } = params;
  const response = await api.post(`/search-videos?query=${query}`);
  console.log(response.data);
  return <div>{JSON.stringify(response.data)}</div>;
}
