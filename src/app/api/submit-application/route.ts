import { NextResponse } from "next/server";
import nodemailer, { type SendMailOptions } from "nodemailer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const fullName = formData.get("fullName") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const position = formData.get("position") as string | null;
  const coverLetter = formData.get("coverLetter") as string | null;
  const kaziJobSlug = formData.get("kaziJobSlug") as string | null;
  const linkedin = formData.get("linkedin") as string | null;
  const resumeFile = formData.get("resume") as File | null;

  if (!fullName || !email || !position) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  // Roles linked to Kazi use its public, company-scoped application endpoint.
  // This keeps CV storage, screening, acknowledgements and recruiter alerts in
  // one system without exposing an internal Kazi job id to the browser.
  if (kaziJobSlug) {
    if (!linkedin) {
      return NextResponse.json(
        { error: "Please add your LinkedIn profile URL" },
        { status: 400 },
      );
    }
    if (!resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { error: "Please upload your CV" },
        { status: 400 },
      );
    }

    const kaziUrl = process.env.KAZI_PUBLIC_API_URL;
    if (!kaziUrl) {
      console.error("KAZI_PUBLIC_API_URL is not configured");
      return NextResponse.json(
        {
          error:
            "Applications are temporarily unavailable. Please try again shortly.",
        },
        { status: 503 },
      );
    }

    const kaziForm = new FormData();
    kaziForm.set("company_slug", "ccsa");
    kaziForm.set("job_slug", kaziJobSlug);
    kaziForm.set("full_name", fullName);
    kaziForm.set("email", email);
    kaziForm.set("phone", phone ?? "");
    kaziForm.set("linkedin_url", linkedin);
    kaziForm.set("cover_message", coverLetter ?? "");
    kaziForm.set("source", "ccsa-careers");
    kaziForm.set("consented", "true");
    kaziForm.set("cv", resumeFile, resumeFile.name);

    try {
      const response = await fetch(
        `${kaziUrl.replace(/\/$/, "")}/api/hire/candidates/apply-with-cv`,
        { method: "POST", body: kaziForm, cache: "no-store" },
      );
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        return NextResponse.json(
          {
            error:
              result.error ??
              "We could not submit your application. Please try again.",
          },
          { status: response.status >= 500 ? 502 : response.status },
        );
      return NextResponse.json(
        { message: "Application submitted successfully" },
        { headers: { "Cache-Control": "no-store" } },
      );
    } catch (error) {
      console.error("Kazi application submission error", error);
      return NextResponse.json(
        {
          error:
            "Applications are temporarily unavailable. Please try again shortly.",
        },
        { status: 502 },
      );
    }
  }

  // Validate resume file if provided
  let resumeBuffer: Buffer | null = null;
  let resumeFilename = "resume.pdf";
  if (resumeFile && resumeFile.size > 0) {
    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume file exceeds 5 MB limit" },
        { status: 400 },
      );
    }
    if (!ALLOWED_TYPES.includes(resumeFile.type)) {
      return NextResponse.json(
        { error: "Only PDF, DOC, and DOCX files are accepted" },
        { status: 400 },
      );
    }
    resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    resumeFilename = resumeFile.name || "resume.pdf";
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
    <h2 style="color:#444;">New Job Application Received</h2>
    <table cellpadding="8" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:collapse;">
      <tr style="background:#f5f5f5;"><td style="border:1px solid #ddd;padding:10px;"><strong>Position:</strong></td><td style="border:1px solid #ddd;padding:10px;">${position}</td></tr>
      <tr><td style="border:1px solid #ddd;padding:10px;"><strong>Full Name:</strong></td><td style="border:1px solid #ddd;padding:10px;">${fullName}</td></tr>
      <tr style="background:#f5f5f5;"><td style="border:1px solid #ddd;padding:10px;"><strong>Email:</strong></td><td style="border:1px solid #ddd;padding:10px;">${email}</td></tr>
      <tr><td style="border:1px solid #ddd;padding:10px;"><strong>Phone:</strong></td><td style="border:1px solid #ddd;padding:10px;">${phone || "Not provided"}</td></tr>
      ${coverLetter ? `<tr style="background:#f5f5f5;"><td style="border:1px solid #ddd;padding:10px;vertical-align:top;"><strong>Cover Letter:</strong></td><td style="border:1px solid #ddd;padding:10px;">${coverLetter.replace(/\n/g, "<br>")}</td></tr>` : ""}
    </table>
    <p style="margin-top:30px;font-size:0.9em;color:#888;">This message was generated from the careers application form.</p>
  </div>`;

  const mailOptions: SendMailOptions = {
    from: process.env.SMTP_EMAIL,
    to: "careers@callcentersolutionsafrica.com",
    replyTo: email,
    subject: `New Job Application: ${position} — ${fullName}`,
    text: `Position: ${position}\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nCover Letter: ${coverLetter || "Not provided"}`,
    html: emailHtml,
  };

  if (resumeBuffer) {
    mailOptions.attachments = [
      { filename: resumeFilename, content: resumeBuffer },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Application submitted successfully" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("Application submission error:", err);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 },
    );
  }
}
