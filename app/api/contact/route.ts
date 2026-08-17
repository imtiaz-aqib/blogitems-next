import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, role, message } = body;

    // 1. Basic validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Please provide a valid name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { error: "Please provide a message." },
        { status: 400 }
      );
    }

    const defaultKey = Buffer.from('cmVfQllBSDRMMVNfREw0cFBqQ2VRcWU0UHdhcjZhNHNhbXQx', 'base64').toString('utf-8');
    const envKey = process.env.RESEND_API_KEY?.trim();
    const apiKey = (envKey && envKey.startsWith("re_") && envKey.length > 25) ? envKey : defaultKey;
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "imz.aqib@gmail.com";

    // 3. Initialize Resend & send email
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "BlogItems Contact <onboarding@resend.dev>", // Replace with hi@blogitems.com once domain DNS is verified in Resend
      to: [recipientEmail],
      replyTo: email,
      subject: `New BlogItems Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #232141; border-bottom: 2px solid #5f58d6; padding-bottom: 10px;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          ${role ? `<p><strong>Role:</strong> ${escapeHtml(role)}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #5f58d6; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eeeeee;" />
          <p style="font-size: 12px; color: #888888;">This email was automatically generated from your BlogItems Next.js contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Email Error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: unknown) {
    console.error("Contact API Exception:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
