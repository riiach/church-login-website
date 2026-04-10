import { NextResponse } from "next/server";

const getEnvValue = (...names) => {
    for (const name of names) {
        const value = process.env[name];

        if (typeof value === "string" && value.trim() !== "") {
            return value.trim();
        }
    }

    return null;
};

export async function GET() {
    const apiKey = getEnvValue("YOUTUBE_API_KEY", "NEXT_PUBLIC_YOUTUBE_API_KEY");
    const channelId = getEnvValue("YOUTUBE_CHANNEL_ID", "NEXT_PUBLIC_YOUTUBE_CHANNEL_ID");

    if (!apiKey || !channelId) {
        return NextResponse.json({ message: "YouTube is not configured.", videos: [] }, { status: 200 });
    }

    try {
        const searchResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=24&key=${apiKey}`,
            { next: { revalidate: 1800 } }
        );

        if (!searchResponse.ok) {
            throw new Error(`YouTube search request failed with status ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        const videoIds = (searchData.items ?? [])
            .map(item => item?.id?.videoId)
            .filter(Boolean)
            .join(",");

        if (videoIds === "") {
            return NextResponse.json({ videos: [] });
        }

        const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds}&key=${apiKey}`,
            { next: { revalidate: 1800 } }
        );

        if (!videosResponse.ok) {
            throw new Error(`YouTube videos request failed with status ${videosResponse.status}`);
        }

        const videosData = await videosResponse.json();

        const videos = (videosData.items ?? [])
            .filter(video => video?.liveStreamingDetails)
            .map(video => ({
                title: video?.snippet?.title ?? "Untitled video",
                thumbnail: video?.snippet?.thumbnails?.high?.url ?? video?.snippet?.thumbnails?.medium?.url ?? video?.snippet?.thumbnails?.default?.url ?? null,
                publishedAt: video?.snippet?.publishedAt ?? null,
                videoId: video?.id,
            }))
            .filter(video => video.videoId && video.thumbnail);

        return NextResponse.json({ videos });
    } catch (error) {
        console.error("Failed to fetch YouTube videos:", error);

        return NextResponse.json({ message: "Failed to load YouTube videos.", videos: [] }, { status: 200 });
    }
}