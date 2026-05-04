import React from "react";

export function EmailTemplate({ name, email, keyword, message }) {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
            <h2>New Question From Website</h2>

            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Subject:</strong> {keyword}</p>

            <hr />

            <h3>Message</h3>
            <p>{message}</p>

            <hr />

            <p>
                This email sent from your website contact form.
            </p>
        </div>
    );
}