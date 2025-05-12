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
}

/**
 * Asynchronously sends an email message.
 *
 * @param email The email to send.
 * @returns A promise that resolves when the email is sent successfully.
 */
export async function sendEmail(email: Email): Promise<void> {
  // TODO: Implement this by calling an email sending API.

  console.log("Email sent:", email);
}
