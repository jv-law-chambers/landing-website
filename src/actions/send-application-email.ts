"use server";

import { z } from "zod";
import { sendEmail, type Email, type EmailAttachment } from "@/services/email";

// --- Validation Schema (matching the client-side schema in careers/page.tsx) ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const applicationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }).max(100),
  phone: z.string().optional().refine(val => !val || /^[+]?[0-9\s\-()]{7,20}$/.test(val), { message: "Please enter a valid phone number." }), // Basic phone validation
  position: z.string().min(1, { message: "Please specify the position you are applying for or 'General Interest'." }).max(200),
  coverLetter: z.string().optional(),
  consent: z.boolean().refine(val => val === true, { message: "You must consent to data processing for recruitment purposes." }),
  // File upload will be handled using FormData API instead
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;

// Separate type for the file data
export type ResumeFileData = {
  buffer: ArrayBuffer;
  filename: string;
  contentType?: string;
};

interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * Server Action to process the careers page application form submission.
 * Uses FormData to handle file uploads properly.
 * 
 * @param formData - The FormData object from the client
 * @returns An object indicating success or failure.
 */
export async function sendApplicationEmail(formData: FormData): Promise<ActionResult> {
  try {
    console.log("Received form data");
    
    // 1. Extract form fields from FormData
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string || undefined;
    const position = formData.get('position') as string;
    const coverLetter = formData.get('coverLetter') as string || undefined;
    const consent = formData.get('consent') === 'true';
    
    // Get resume file
    const resumeFile = formData.get('resumeFile') as File | null;
    
    // 2. Validate the form data
    const formFields = { fullName, email, phone, position, coverLetter, consent };
    const validationResult = applicationFormSchema.safeParse(formFields);
    
    if (!validationResult.success) {
      console.error("Server-side validation failed:", validationResult.error.flatten());
      return { success: false, error: "Invalid form data submitted. Please review your entries." };
    }

    // 3. Validate the resume file
    if (!resumeFile) {
      return { success: false, error: "Resume file is required." };
    }

    // Check file size
    if (resumeFile.size > MAX_FILE_SIZE) {
      return { success: false, error: "Resume file exceeds the maximum size of 5MB." };
    }

    // Check file type
    if (!ACCEPTED_FILE_TYPES.includes(resumeFile.type)) {
      return { success: false, error: "Resume file must be in PDF, DOC, or DOCX format." };
    }

    // 4. Convert file to buffer
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());

    // 5. Prepare the email content
    const hrEmailAddress = process.env.HR_EMAIL_ADDRESS || process.env.ADMIN_EMAIL_ADDRESS;
    if (!hrEmailAddress) {
      console.error("HR_EMAIL_ADDRESS or ADMIN_EMAIL_ADDRESS environment variable is not set.");
      return { success: false, error: "Server configuration error. Could not send application." };
    }

    const emailSubject = `Careers Application: ${position}`;
    
    // Basic sanitization
    const sanitizedCoverLetter = coverLetter ? coverLetter.replace(/</g, "&lt;").replace(/>/g, "&gt;") : 'Not provided';
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head><title>${emailSubject}</title></head>
      <body style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="color: #1a2a43;">New Job Application Submission</h2>
        <hr>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : '<p><strong>Phone:</strong> Not provided</p>'}
        <p><strong>Position Applied For:</strong> ${position}</p>
        <hr>
        <p><strong>Cover Letter:</strong></p>
        <p style="white-space: pre-wrap;">${sanitizedCoverLetter}</p>
        <hr>
        <p><strong>Resume:</strong> Attached</p>
        <p><strong>Consent to Data Processing:</strong> ${consent ? 'Yes' : 'No'}</p>
        <hr>
        <p style="font-size: 0.8em; color: #666;">Received via website careers page.</p>
      </body>
      </html>
    `;

    // Use a verified sender email address
    const siteName = "Law Chambers of G.R. Hari";
    const fromEmail = process.env.EMAIL_FROM_ADDRESS || `"${siteName} Careers" <noreply@${process.env.SITE_DOMAIN || 'example.com'}>`;

    // Prepare attachments with buffer from File
    const attachments: EmailAttachment[] = [{
      filename: resumeFile.name,
      content: fileBuffer,
      contentType: resumeFile.type || undefined,
    }];

    const emailToSend: Email = {
      from: fromEmail,
      to: hrEmailAddress,
      subject: emailSubject,
      html: emailHtml,
      // Add Reply-To header so replies go directly to the applicant's email
      headers: { 'Reply-To': email },
      attachments: attachments,
    };

    // 6. Send the email using the email service
    await sendEmail(emailToSend);

    console.log("Application email sent successfully to:", hrEmailAddress);
    
    // 7. Optional: Send a confirmation email to the applicant
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head><title>Application Received</title></head>
      <body style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="color: #1a2a43;">Thank You for Your Application</h2>
        <hr>
        <p>Dear ${fullName},</p>
        <p>Thank you for your interest in joining the Law Chambers of G.R. Hari. We have received your application for the position of <strong>${position}</strong>.</p>
        <p>Our HR team will review your application and reach out to you if your qualifications match our current requirements.</p>
        <p>Please note that due to the volume of applications we receive, we may not be able to respond to every applicant individually.</p>
        <hr>
        <p>Best regards,</p>
        <p>HR Team<br>Law Chambers of G.R. Hari</p>
      </body>
      </html>
    `;

    const confirmationEmail: Email = {
      from: fromEmail,
      to: email,
      subject: `Application Received: ${position}`,
      html: confirmationEmailHtml,
    };

    try {
      await sendEmail(confirmationEmail);
      console.log("Confirmation email sent to applicant:", email);
    } catch (confirmError) {
      console.error("Error sending confirmation email:", confirmError);
      // We don't want to fail the whole process if just the confirmation email fails
    }

    return { success: true };

  } catch (error) {
    console.error("Error in sendApplicationEmail Action:", error);
    // Log specific error details for debugging server-side
    let errorMessage = "An unexpected error occurred while processing your application.";
    if (error instanceof Error) {
      console.error("Detailed Error:", error.message, error.stack);
    }
    return { success: false, error: errorMessage };
  }
}