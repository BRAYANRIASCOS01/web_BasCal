const YOUTUBE_PRIVACY_BASE_URL = "https://www.youtube-nocookie.com/embed";

const buildEmbedUrl = (videoId, params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value == null || value === "") return;
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return `${YOUTUBE_PRIVACY_BASE_URL}/${videoId}${query ? `?${query}` : ""}`;
};

const YouTubeEmbed = ({ videoId, title, params }) => (
  <iframe
    src={buildEmbedUrl(videoId, params)}
    title={title}
    frameBorder="0"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    loading="lazy"
  />
);

export default YouTubeEmbed;
