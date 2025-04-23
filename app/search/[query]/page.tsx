export default function SearchPage({ params }: { params: { query: string } }) {
  return <div>{params.query}</div>;
}
