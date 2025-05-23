"use server";

import { z } from "zod";
import { sendEmail, type Email, type EmailAttachment } from "@/services/email"; // Assuming an email service exists

// --- Validation Schema (ensure it matches client-side schema in contact/page.tsx) ---
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }).max(100),
  phone: z.string().optional().refine(val => !val || /^[+]?[0-9\s\-()]{7,20}$/.test(val), { message: "Invalid phone number format." }),
  subject: z.string().min(1, { message: "Please select a subject." }), // Consider using an enum if subjects are fixed
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(5000),
});

type ContactFormData = z.infer<typeof contactFormSchema> & {
  attachment?: {
    buffer: Buffer;
    filename: string;
    contentType?: string;
  };
} ;

interface ActionResult {
    success: boolean;
    error?: string; // Provide specific error messages if possible, but avoid leaking sensitive info
}

/**
 * Server Action to process the contact form submission.
 * Validates the data and sends an email notification.
 *
 * @param formData - The data submitted from the contact form
 * @returns An object indicating success or failure.
 */
export async function sendContactEmail(formData: ContactFormData): Promise<ActionResult> {
  try {
    const { attachment, ...formFields } = formData
    // 1. Validate the form data on the server
    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      // Log detailed errors for debugging, return a generic message to the client
      console.error("Server-side validation failed:", validationResult.error.flatten());
      return { success: false, error: "Invalid form data submitted. Please review your entries." };
    }

    const { name, email, phone, subject, message } = validationResult.data;

    // 2. Prepare the email content
    const adminEmailAddress = process.env.ADMIN_EMAIL_ADDRESS;
    if (!adminEmailAddress) {
        console.error("ADMIN_EMAIL_ADDRESS environment variable is not set.");
        return { success: false, error: "Server configuration error. Could not send message." };
    }

    const emailSubject = `Website Contact Form: ${subject}`;
    // Basic sanitization (replace potential HTML tags - more robust sanitization might be needed depending on risk)
    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head><title>${emailSubject}</title></head>
      <body style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="color: #1a2a43;">New Contact Form Submission</h2>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
        <hr>
        <p style="font-size: 0.8em; color: #666;">Received via website contact form.</p>
      </body>
      </html>
    `;

    // Use a verified sender email address based on your email provider (e.g., noreply@yourdomain.com)
    const fromEmail = process.env.EMAIL_FROM_ADDRESS || `"${siteName} Contact Form" <noreply@${process.env.SITE_DOMAIN || 'example.com'}>`; // Use siteName if available

    const attachments: EmailAttachment[] = [];
    if (attachment?.buffer && attachment.filename) {
      attachments.push({
        filename: attachment.filename,
        content: attachment.buffer,
        contentType: attachment.contentType || undefined,
      })
    }

    const emailToSend: Email = {
      from: fromEmail,
      to: adminEmailAddress,
      subject: emailSubject,
      html: emailHtml,
      // Add Reply-To header so replies go directly to the user's email
      // This might need specific handling depending on the email service library
      // headers: { 'Reply-To': email } // Example
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    // 3. Send the email using the email service
    await sendEmail(emailToSend); // Ensure sendEmail handles its own errors robustly

    console.log("Contact email sent successfully to:", adminEmailAddress);
    return { success: true };

  } catch (error) {
    console.error("Error in sendContactEmail Action:", error);
    // Log specific error details for debugging server-side
    let errorMessage = "An unexpected error occurred while processing your request.";
    if (error instanceof Error) {
        // Avoid leaking sensitive internal details to the client
        console.error("Detailed Error:", error.message, error.stack);
    }
    return { success: false, error: errorMessage };
  }
}

// Placeholder for site name (replace with actual logic if needed)
const siteName = "Law Chambers of G.R. Hari";