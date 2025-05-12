
"use server";

import { z } from "zod";
import { sendEmail, type Email } from "@/services/email"; // Assuming an email service exists

// --- Validation Schema (ensure it matches client-side schema in contact/page.tsx) ---
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }).max(100),
  phone: z.string().optional().refine(val => !val || /^[+]?[0-9\s\-()]{7,20}$/.test(val), { message: "Invalid phone number format." }),
  subject: z.string().min(1, { message: "Please select a subject." }), // Consider using an enum if subjects are fixed
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(5000),
  // Add captchaToken validation
  captchaToken: z.string().min(1, { message: "CAPTCHA verification failed. Please complete the check." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ActionResult {
    success: boolean;
    error?: string; // Provide specific error messages if possible, but avoid leaking sensitive info
}

/**
 * Server Action to process the contact form submission.
 * Validates the data, verifies CAPTCHA, and sends an email notification.
 *
 * @param formData - The data submitted from the contact form, including captchaToken.
 * @returns An object indicating success or failure.
 */
export async function sendContactEmail(formData: ContactFormData): Promise<ActionResult> {
  try {
    // 1. Validate the form data on the server (including CAPTCHA token presence)
    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      // Log detailed errors for debugging, return a generic message to the client
      console.error("Server-side validation failed:", validationResult.error.flatten());
      // Extract specific field errors if needed
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      // Return CAPTCHA specific error if that failed validation
      if (fieldErrors.captchaToken) {
          return { success: false, error: fieldErrors.captchaToken[0] };
      }
      return { success: false, error: "Invalid form data submitted. Please review your entries." };
    }

    const { name, email, phone, subject, message, captchaToken } = validationResult.data;

    // 2. Server-side CAPTCHA Verification
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey) { // Only verify if secret key is configured
      const captchaVerified = await verifyRecaptcha(captchaToken, secretKey);
      if (!captchaVerified) {
        console.warn("CAPTCHA verification failed for:", email);
        return { success: false, error: "CAPTCHA verification failed. Please try again." };
      }
       console.log("CAPTCHA verified successfully for:", email);
    } else {
        // Decide behavior if key is missing: log warning, allow submission, or block?
        console.warn("RECAPTCHA_SECRET_KEY is not set. Skipping CAPTCHA verification. THIS IS INSECURE for production.");
        // For development, we might allow it. For production, you might want to return an error:
        // return { success: false, error: "Server configuration error: CAPTCHA cannot be verified." };
    }

    // 3. Prepare the email content
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
        <p style="font-size: 0.8em; color: #666;">CAPTCHA Verified: ${secretKey ? 'Yes' : 'No (Key Missing)'}</p>
      </body>
      </html>
    `;

    // Use a verified sender email address based on your email provider (e.g., noreply@yourdomain.com)
    const fromEmail = process.env.EMAIL_FROM_ADDRESS || `"${siteName} Contact Form" <noreply@${process.env.SITE_DOMAIN || 'example.com'}>`; // Use siteName if available

    const emailToSend: Email = {
      from: fromEmail,
      to: adminEmailAddress,
      subject: emailSubject,
      html: emailHtml,
      // Add Reply-To header so replies go directly to the user's email
      // This might need specific handling depending on the email service library
      // headers: { 'Reply-To': email } // Example
    };

    // 4. Send the email using the email service
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
        // Could customize based on error type if needed, e.g., distinguish email sending failure
        // if (error.message.includes('Email send failed')) {
        //    errorMessage = "There was an issue sending the email. Please try again later.";
        // }
    }
    return { success: false, error: errorMessage };
  }
}

// Placeholder for site name (replace with actual logic if needed)
const siteName = "Law Chambers of G.R. Hari";

/**
 * Verifies a Google reCAPTCHA v2 token.
 * @param token The token received from the client-side reCAPTCHA widget.
 * @param secretKey Your reCAPTCHA secret key.
 * @returns Promise<boolean> True if verification is successful, false otherwise.
 */
async function verifyRecaptcha(token: string, secretKey: string): Promise<boolean> {
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;
  // Add remoteip if available and desired for extra security
  // const clientIp = headers().get('x-forwarded-for') ?? request.ip; // Needs request access if not using headers()

  try {
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
      // Add cache: 'no-store' if needed to prevent caching issues
    });

    if (!response.ok) {
        console.error(`reCAPTCHA verification request failed with status: ${response.status}`);
        return false;
    }

    const data = await response.json();
    console.log("reCAPTCHA verification response:", data); // Log the response for debugging

    // Check for success and potentially score if using v3
    // For v2, 'success' is the primary indicator.
    // Consider adding hostname verification: data.hostname === process.env.SITE_DOMAIN
    return data.success === true;

  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}
