export async function sendContactEmail(data) {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("API RESPONSE STATUS:", res.status);
    console.log("API RESPONSE:", result);

    if (!res.ok) {
        throw new Error(result.error || "Failed to send email");
    }

    return result;
}