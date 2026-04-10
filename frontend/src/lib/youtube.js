export async function getPastLiveVideos() {
    const response = await fetch("/api/youtube", {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch YouTube videos: ${response.status}`);
    }

    const data = await response.json();

    return Array.isArray(data.videos) ? data.videos : [];
}