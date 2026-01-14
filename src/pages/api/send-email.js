import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    company,
    phone,
    howCanWeHelp,
    estimatedHours,
    goals,
    rfpFile,
    rfpFileName,
    rfpFileType,
    privacyAgreement,
    recaptchaToken,
  } = req.body;

  // Verify reCAPTCHA using fetch instead of axios
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      }
    );

    const recaptchaResponse = await response.json();

    if (!recaptchaResponse.success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }
  } catch (error) {
    console.error("reCAPTCHA error:", error);
    return res.status(500).json({ error: "reCAPTCHA verification error" });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Prepare email content
  const emailText = `
    Name: ${name}
    Email: ${email}
    Company: ${company}
    Phone: ${phone || "Not provided"}
    How can we help: ${howCanWeHelp || "Not provided"}
    Estimated Monthly Hours: ${estimatedHours || "Not provided"}
    Goals: ${goals || "Not provided"}
    RFP/Brief Attached: ${rfpFile ? "Yes" : "No"}
    Privacy Agreement: ${privacyAgreement ? "Agreed" : "Not agreed"}
  `;

  const emailHtml = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://callcentersolutionsafrica.com/assets/images/logo.png" alt="Company Logo" style="max-width: 200px;" />
    </div>
    <h2 style="color: #444;">New Contact Form Submission</h2>
    <table cellpadding="8" cellspacing="0" border="0" style="width: 100%; max-width: 600px; border-collapse: collapse;">
      <tr style="background-color: #f5f5f5;"><td style="border: 1px solid #ddd; padding: 10px;"><strong>Name:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${name}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 10px;"><strong>Email:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${email}</td></tr>
      <tr style="background-color: #f5f5f5;"><td style="border: 1px solid #ddd; padding: 10px;"><strong>Company:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${company}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 10px;"><strong>Phone:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${phone || "Not provided"}</td></tr>
      <tr style="background-color: #f5f5f5;"><td style="border: 1px solid #ddd; padding: 10px;"><strong>How can we help:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${howCanWeHelp || "Not provided"}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 10px;"><strong>Estimated Monthly Hours:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${estimatedHours || "Not provided"}</td></tr>
      <tr style="background-color: #f5f5f5;"><td style="border: 1px solid #ddd; padding: 10px;"><strong>Goals:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${goals ? goals.replace(/\n/g, "<br>") : "Not provided"}</td></tr>
      <tr><td style="border: 1px solid #ddd; padding: 10px;"><strong>RFP/Brief Attached:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${rfpFile ? `Yes (${rfpFileName || "File"})` : "No"}</td></tr>
      <tr style="background-color: #f5f5f5;"><td style="border: 1px solid #ddd; padding: 10px;"><strong>Privacy Agreement:</strong></td><td style="border: 1px solid #ddd; padding: 10px;">${privacyAgreement ? "Agreed" : "Not agreed"}</td></tr>
    </table>
    <p style="margin-top: 30px; font-size: 0.9em; color: #888;">This message was generated from the website contact form.</p>
  </div>
`;


  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: [process.env.SMTP_EMAIL, process.env.SECONDARY_EMAIL],
    replyTo: email,
    subject: `New Contact Form Submission from ${name} (${company})`,
    text: emailText,
    html: emailHtml,
  };

  // Attach file if provided
  if (rfpFile && rfpFileName) {
    mailOptions.attachments = [
      {
        filename: rfpFileName,
        content: rfpFile,
        encoding: "base64",
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
