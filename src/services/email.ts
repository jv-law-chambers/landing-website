import nodemailer from "nodemailer"


/**
 * Represent an email attachment
 */
export interface EmailAttachment {
  filename: string;
  path?: string;        // for file paths
  content?: any;        // for direct content ( Buffer , string , etc. )
  contentType?: string;
}
/**
 * Represents the structure of an email message.
 */
export interface Email {
  /**
   * The sender's email address.
   */
  from: string;
  /**
   * The recipient's email address.
   */
  to: string;
  /**
   * The subject of the email.
   */
  subject: string;
  /**
   * The HTML content of the email.
   */
  html: string;
  attachments?: EmailAttachment[];  // Optional Attachments
}

/**
 * Asynchronously sends an email message.
 *
 * @param email The email to send.
 * @returns A promise that resolves when the email is sent successfully.
 */
export async function sendEmail(email: Email): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // e.g., smtp.gmail.com
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.ADMIN_EMAIL_ADDRESS,
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: email.from,
    to: email.to,
    subject: email.subject,
    html: email.html,
    attachments: email.attachments,
  });

  console.log("Email sent:", email);
}
