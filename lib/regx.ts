export function isYouTubeLink(url: string) {
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})/;
  return regex.test(url);
}
export function isYouTubeId(url: string) {
  const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  return youtubeIdRegex.test(url);
}
export const urlRegex = /(https?:\/\/[^\s]+)/g;
export const timestampRegex = /\b(?:\d{1,2}:)?\d{1,2}:\d{2}\b/g;
