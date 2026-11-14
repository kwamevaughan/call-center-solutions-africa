import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, company, phone, howCanWeHelp, goals, privacyAgreement, recaptchaToken } = body as Record<string, string>;

  // Verify reCAPTCHA
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY ?? "",
        response: recaptchaToken ?? "",
      }),
    });
    const data = await res.json();
    if (!data.success) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "reCAPTCHA verification error" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSWORD },
  });

  const emailHtml = `
  <div style="font-family:Arial,sans-serif;color:#333;padding:20px;">
    <div style="text-align:center;margin-bottom:30px;">
      <img src="https://callcentersolutionsafrica.com/assets/images/logo.png" alt="CCSA Logo" style="max-width:200px;" />
    </div>
    <h2 style="color:#444;">New Contact Form Submission</h2>
    <table cellpadding="8" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:collapse;">
      <tr style="background:#f5f5f5;"><td style="border:1px solid #ddd;padding:10px;"><strong>Name:</strong></td><td style="border:1px solid #ddd;padding:10px;">${name}</td></tr>
      <tr><td style="border:1px solid #ddd;padding:10px;"><strong>Email:</strong></td><td style="border:1px solid #ddd;padding:10px;">${email}</td></tr>
      <tr style="background:#f5f5f5;"><td style="border:1px solid #ddd;padding:10px;"><strong>Company:</strong></td><td style="border:1px solid #ddd;padding:10px;">${company}</td></tr>
      <tr><td style="border:1px solid #ddd;padding:10px;"><strong>Phone:</strong></td><td style="border:1px solid #ddd;padding:10px;">${phone || "Not provided"}</td></tr>
      <tr style="background:#f5f5f5;"><td style="border:1px solid #ddd;padding:10px;"><strong>How can we help:</strong></td><td style="border:1px solid #ddd;padding:10px;">${howCanWeHelp || "Not provided"}</td></tr>
      <tr><td style="border:1px solid #ddd;padding:10px;"><strong>Goals:</strong></td><td style="border:1px solid #ddd;padding:10px;">${goals ? goals.replace(/\n/g, "<br>") : "Not provided"}</td></tr>
      <tr style="background:#f5f5f5;"><td style="border:1px solid #ddd;padding:10px;"><strong>Privacy Agreement:</strong></td><td style="border:1px solid #ddd;padding:10px;">${privacyAgreement ? "Agreed" : "Not agreed"}</td></tr>
    </table>
    <p style="margin-top:30px;font-size:0.9em;color:#888;">This message was generated from the website contact form.</p>
  </div>`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: [process.env.SMTP_EMAIL, process.env.SECONDARY_EMAIL].filter(Boolean) as string[],
      replyTo: email,
      subject: `New Contact Form Submission from ${name} (${company})`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone || "Not provided"}\nHow can we help: ${howCanWeHelp || "Not provided"}\nGoals: ${goals || "Not provided"}`,
      html: emailHtml,
    });
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
