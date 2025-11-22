import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let tempFilePath = null;

  try {
    // Parse form data with formidable
    const form = formidable({
      multiples: false,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve([fields, files]);
      });
    });

    // Extract form fields
    const fullName = Array.isArray(fields.fullName) ? fields.fullName[0] : fields.fullName;
    const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
    const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone;
    const position = Array.isArray(fields.position) ? fields.position[0] : fields.position;
    const coverLetter = Array.isArray(fields.coverLetter) ? fields.coverLetter[0] : fields.coverLetter;

    // Validate required fields
    if (!fullName || !email || !position) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get resume file if provided
    const resumeFile = files.resume?.[0];
    tempFilePath = resumeFile?.filepath;

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
      New Job Application Received

      Position: ${position}
      Full Name: ${fullName}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      Cover Letter: ${coverLetter || "Not provided"}
    `;

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://callcentersolutionsafrica.com/assets/images/logo.png" alt="Company Logo" style="max-width: 200px;" />
      </div>
      <h2 style="color: #444;">New Job Application Received</h2>
      <table cellpadding="8" cellspacing="0" border="0" style="width: 100%; max-width: 600px; border-collapse: collapse;">
        <tr style="background-color: #f5f5f5;">
          <td style="border: 1px solid #ddd; padding: 10px;"><strong>Position:</strong></td>
          <td style="border: 1px solid #ddd; padding: 10px;">${position}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 10px;"><strong>Full Name:</strong></td>
          <td style="border: 1px solid #ddd; padding: 10px;">${fullName}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="border: 1px solid #ddd; padding: 10px;"><strong>Email:</strong></td>
          <td style="border: 1px solid #ddd; padding: 10px;">${email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 10px;"><strong>Phone:</strong></td>
          <td style="border: 1px solid #ddd; padding: 10px;">${phone || "Not provided"}</td>
        </tr>
        ${coverLetter ? `
        <tr style="background-color: #f5f5f5;">
          <td style="border: 1px solid #ddd; padding: 10px; vertical-align: top;"><strong>Cover Letter:</strong></td>
          <td style="border: 1px solid #ddd; padding: 10px;">${coverLetter.replace(/\n/g, '<br>')}</td>
        </tr>
        ` : ''}
      </table>
      <p style="margin-top: 30px; font-size: 0.9em; color: #888;">This message was generated from the careers application form.</p>
    </div>
    `;

    // Prepare mail options
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: [process.env.SMTP_EMAIL, process.env.SECONDARY_EMAIL].filter(Boolean),
      replyTo: email,
      subject: `New Job Application: ${position} - ${fullName}`,
      text: emailText,
      html: emailHtml,
    };

    // Attach resume if provided
    if (resumeFile && tempFilePath) {
      try {
        const fileContent = await fs.readFile(tempFilePath);
        mailOptions.attachments = [
          {
            filename: resumeFile.originalFilename || "resume.pdf",
            content: fileContent,
          },
        ];
      } catch (fileError) {
        console.error("Error reading resume file:", fileError);
        // Continue without attachment if file read fails
      }
    }

    // Send email
    await transporter.sendMail(mailOptions);

    // Clean up temporary file
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary file:", cleanupError);
      }
    }

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Application submission error:", error);

    // Clean up temporary file in case of error
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch (cleanupError) {
        console.error("Error cleaning up temporary file after error:", cleanupError);
      }
    }

    res.status(500).json({ error: "Failed to submit application. Please try again." });
  }
}

