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
    industry,
    teamSize,
    services,
    currentChallenges,
    timeline,
    budget,
    customBudget,
    additionalInfo,
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
    Industry: ${industry}
    Team Size: ${teamSize}
    Services of Interest: ${services.join(", ") || "None selected"}
    Current Challenges: ${currentChallenges}
    Project Timeline: ${timeline}
    Estimated Budget: ${budget || customBudget || "Not provided"}
    Additional Information: ${additionalInfo || "Not provided"}
  `;

  const emailHtml = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://callcentersolutionsafrica.com/assets/images/logo.png" alt="Company Logo" style="max-width: 200px;" />
    </div>
    <h2 style="color: #444;">New Proposal Request</h2>
    <table cellpadding="8" cellspacing="0" border="0" style="width: 100%; max-width: 600px;">
      <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
      <tr><td><strong>Company:</strong></td><td>${company}</td></tr>
      <tr><td><strong>Phone:</strong></td><td>${phone || "Not provided"}</td></tr>
      <tr><td><strong>Industry:</strong></td><td>${industry}</td></tr>
      <tr><td><strong>Team Size:</strong></td><td>${teamSize}</td></tr>
      <tr><td><strong>Services of Interest:</strong></td><td>${services.join(", ") || "None selected"}</td></tr>
      <tr><td><strong>Current Challenges:</strong></td><td>${currentChallenges}</td></tr>
      <tr><td><strong>Project Timeline:</strong></td><td>${timeline}</td></tr>
      <tr><td><strong>Estimated Budget:</strong></td><td>${budget || customBudget || "Not provided"}</td></tr>
      <tr><td><strong>Additional Information:</strong></td><td>${additionalInfo || "Not provided"}</td></tr>
    </table>
    <p style="margin-top: 30px; font-size: 0.9em; color: #888;">This message was generated from the website contact form.</p>
  </div>
`;


  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: [process.env.SMTP_EMAIL, process.env.SECONDARY_EMAIL],
    replyTo: email,
    subject: `New Proposal Request from ${name} (${company})`,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
