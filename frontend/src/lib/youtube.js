export async function getPastLiveVideos() {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

    // 1. get recent videos
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=24&key=${API_KEY}`
    );

    const data = await res.json();

    const videoIds = data.items.map(v => v.id.videoId).join(",");

    // 2. get detailed info
    const res2 = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds}&key=${API_KEY}`
    );

    const data2 = await res2.json();

    // 3. filter livestream recordings
    return data2.items
        .filter(v => v.liveStreamingDetails) // 👈 key part
        .map(v => ({
            title: v.snippet.title,
            thumbnail: v.snippet.thumbnails.high.url,
            publishedAt: v.snippet.publishedAt,
            videoId: v.id,
        }));
}