import { NextResponse } from "next/server";
import nodemailer, { type SendMailOptions } from "nodemailer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const fullName = formData.get("fullName") as string | null;
  const email    = formData.get("email")    as string | null;
  const phone    = formData.get("phone")    as string | null;
  const position = formData.get("position") as string | null;
  const coverLetter = formData.get("coverLetter") as string | null;
  const resumeFile  = formData.get("resume") as File | null;

  if (!fullName || !email || !position) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate resume file if provided
  let resumeBuffer: Buffer | null = null;
  let resumeFilename = "resume.pdf";
  if (resumeFile && resumeFile.size > 0) {
    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Resume file exceeds 5 MB limit" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(resumeFile.type)) {
      return NextResponse.json({ error: "Only PDF, DOC, and DOCX files are accepted" }, { status: 400 });
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
    mailOptions.attachments = [{ filename: resumeFilename, content: resumeBuffer }];
  }

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("Application submission error:", err);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
