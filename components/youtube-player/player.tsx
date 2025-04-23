export default function Player({ videoId }: { videoId: string }) {
  return (
    <iframe
      id="ytplayer"
      width="100%"
      height="650"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    ></iframe>
  );
}
