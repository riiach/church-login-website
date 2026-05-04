import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

    console.log("/api/contact was called")
    try {
        console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
        console.log("CONTACT_EMAIL:", process.env.CONTACT_EMAIL);

        const body = await request.json();
        const { name, email, keyword, message } = body;
        console.log("BODY:", body);

        if (!process.env.RESEND_API_KEY) {
            console.log("❌ Missing RESEND_API_KEY");
            return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
        }

        if (!process.env.CONTACT_EMAIL) {
            console.log("❌ Missing CONTACT_EMAIL");
            return Response.json({ error: "Missing CONTACT_EMAIL" }, { status: 500 });
        }


        const { data, error } = await resend.emails.send({
            from: "AIM Website <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL],
            subject: `New question: ${keyword}`,
            replyTo: email,
            react: EmailTemplate({
                name,
                email,
                keyword,
                message,
            }),
        });

        if (error) {
            console.log("❌ RESEND ERROR:", result.error);
            return Response.json({ error }, { status: 500 });
        }

        console.log("✅ Email sent successfully");

        return Response.json({ success: true, data });
    } catch (error) {
        return Response.json(
            { error: error.message || String(error) },
            { status: 500 }
        );
    }
}