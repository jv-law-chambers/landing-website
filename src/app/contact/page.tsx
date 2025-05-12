
"use client"; // Needed for form handling

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Mail, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react'; // Example Icons, Added ShieldCheck for CAPTCHA
import { sendContactEmail } from '@/actions/send-contact-email'; // Import the Server Action

// --- Form Schema ---
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name cannot exceed 100 characters."}),
  email: z.string().email({ message: "Please enter a valid email address." }).max(100, { message: "Email cannot exceed 100 characters."}),
  phone: z.string().optional().refine(val => !val || /^[+]?[0-9\s\-()]{7,20}$/.test(val), { message: "Please enter a valid phone number." }), // Basic phone validation
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(5000, { message: "Message cannot exceed 5000 characters."}),
  // Add captcha validation
  captchaToken: z.string().min(1, { message: "Please complete the CAPTCHA verification." })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// --- Component ---

export default function ContactPage() {
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = React.useState(false);
   // Add state for CAPTCHA token (assuming a library like react-google-recaptcha is used)
   const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
   // Ref for CAPTCHA component (e.g., reCAPTCHA)
   const recaptchaRef = React.useRef<any>(null); // Use appropriate type if using a specific library

   const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      captchaToken: "", // Initialize captchaToken
    },
   });

    // Update form value when captchaToken changes
    React.useEffect(() => {
        if (captchaToken) {
            form.setValue('captchaToken', captchaToken, { shouldValidate: true });
        }
    }, [captchaToken, form]);


   async function onSubmit(data: ContactFormValues) {
     setIsSubmitting(true);
     // Ensure captcha token is included in the data sent to the server action
     const submissionData = { ...data, captchaToken: data.captchaToken || captchaToken }; // Prioritize form value if set directly
     console.log("Contact Form Data:", submissionData);

     // Check if captcha token exists client-side (basic check)
     if (!submissionData.captchaToken) {
         toast({
             title: "CAPTCHA Required",
             description: "Please complete the security check before submitting.",
             variant: "destructive",
         });
         setIsSubmitting(false);
         return; // Prevent submission
     }


     try {
       // **Backend Integration Point**
       // Server action `sendContactEmail` will handle server-side validation including CAPTCHA

       const result = await sendContactEmail(submissionData); // Call the Server Action with CAPTCHA token

        if (result.success) {
           toast({
             title: "Message Sent Successfully!",
             description: "Thank you for contacting us. We have received your message and will respond as soon as possible, typically within 1-2 business days.",
           });
           form.reset(); // Reset form on success
           // Reset CAPTCHA
           recaptchaRef.current?.reset();
           setCaptchaToken(null);
        } else {
            // Handle specific CAPTCHA error from server
            if (result.error?.toLowerCase().includes('captcha')) {
                 toast({
                     title: "CAPTCHA Verification Failed",
                     description: result.error,
                     variant: "destructive",
                 });
                 // Reset CAPTCHA on failure as well
                 recaptchaRef.current?.reset();
                 setCaptchaToken(null);
            } else {
                 throw new Error(result.error || 'Failed to send message due to a server error.');
            }
        }

     } catch (error) {
       console.error("Submission Error:", error);
       toast({
         title: "Submission Failed",
         description: error instanceof Error ? error.message : "Could not send message. Please try again later or contact us directly via phone or email.",
         variant: "destructive",
       });
        // Optionally reset CAPTCHA on general errors too
        // recaptchaRef.current?.reset();
        // setCaptchaToken(null);
     } finally {
        setIsSubmitting(false);
     }
   }

  // Placeholder for Google Maps API Key - should be in .env.local
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  // **Updated coordinates/address based on new info**
  // Example coordinates for Nungambakkam, Chennai (use actual if known)
  const officeLocation = { lat: 13.0604, lng: 80.2496 };
  const officeAddress = "Bhaskara Apartments, No. 28, Pycroft’s Garden Road, Nungambakkam, Chennai";
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(officeAddress)}`;


  return (
    <>
      {/* Hero Section */}
       <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }} // Adjusted for header height
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Subtle overlay */}
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             Contact Us
           </h1>
         </div>
       </section>

       {/* Contact Information & Map Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column: Contact Info */}
          <div>
             <SectionHeading title="Get in Touch" />
             <p className="text-muted-foreground mb-6">We welcome your inquiries. Please use the details below to reach us or fill out the contact form.</p>
            <ul className="space-y-6 mt-6">
              <li className="flex items-start">
                <MapPin className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-accent" />
                <div>
                  <h5 className="font-semibold mb-1">Office Address</h5>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    Bhaskara Apartments, No. 28,<br />
                    Pycroft’s Garden Road,<br />
                    Nungambakkam, Chennai, India
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-accent" />
                 <div>
                  <h5 className="font-semibold mb-1">Mobile</h5>
                   {/* **Updated phone number** */}
                  <a href="tel:+919176624466" className="text-muted-foreground hover:text-primary transition-colors">+91 91766 24466</a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-accent" />
                 <div>
                  <h5 className="font-semibold mb-1">Email</h5>
                   {/* **Updated email address** */}
                  <a href="mailto:mail@grhari.com" className="text-muted-foreground hover:text-primary transition-colors">mail@grhari.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-accent" />
                 <div>
                  <h5 className="font-semibold mb-1">Office Hours</h5>
                  <p className="text-muted-foreground">Monday - Friday: 9:30 AM - 6:30 PM IST</p>
                   <p className="text-sm text-muted-foreground/80">(Closed on Saturdays, Sundays, and Public Holidays)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Map */}
           <div className="mt-8 md:mt-0">
               <SectionHeading title="Our Location" />
               <div className="aspect-video md:h-[400px] w-full overflow-hidden rounded-lg shadow-md border">
                  {googleMapsApiKey ? (
                     <iframe
                       src={mapEmbedUrl}
                       width="100%"
                       height="100%"
                       style={{ border: 0 }}
                       allowFullScreen={false}
                       loading="lazy"
                       referrerPolicy="no-referrer-when-downgrade"
                       title="Office Location Map"
                     ></iframe>
                  ) : (
                     <div className="bg-muted h-full flex items-center justify-center text-muted-foreground">
                        Map requires configuration (API Key missing).
                     </div>
                  )}

               </div>
           </div>
        </div>
      </section>


       {/* Contact Form Section */}
      <section className="section-padding-sm bg-secondary">
        <div className="container-max max-w-3xl mx-auto">
           <SectionHeading title="Send Us a Message" centered />
           <p className="text-center text-muted-foreground mb-8">
             Have a specific question or wish to schedule a consultation? Please fill out the form below. Provide as much detail as possible so we can assist you effectively.
           </p>
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-lg border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Full Name</FormLabel>
                         <FormControl>
                           <Input placeholder="Your Full Name" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                   <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Email Address</FormLabel>
                         <FormControl>
                           <Input type="email" placeholder="your.email@example.com" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Phone Number (Optional)</FormLabel>
                         <FormControl>
                           <Input type="tel" placeholder="+91 98xxxxxxxx" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                   <FormField
                     control={form.control}
                     name="subject"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Subject</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                           <FormControl>
                             <SelectTrigger>
                               <SelectValue placeholder="Select the reason for your inquiry" />
                             </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                             <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                             <SelectItem value="Schedule Consultation - Corporate Law">Consultation - Corporate Law</SelectItem>
                             <SelectItem value="Schedule Consultation - Commercial Litigation">Consultation - Commercial Litigation</SelectItem>
                             <SelectItem value="Schedule Consultation - IP Law">Consultation - IP Law</SelectItem>
                             <SelectItem value="Schedule Consultation - Real Estate">Consultation - Real Estate</SelectItem>
                             <SelectItem value="Schedule Consultation - Employment Law">Consultation - Employment Law</SelectItem>
                             <SelectItem value="Schedule Consultation - Other">Consultation - Other Area</SelectItem>
                             <SelectItem value="Career Opportunity">Career Opportunity</SelectItem>
                             <SelectItem value="Research Inquiry">Research Inquiry</SelectItem>
                             <SelectItem value="Feedback">Website Feedback</SelectItem>
                             <SelectItem value="Other">Other</SelectItem>
                           </SelectContent>
                         </Select>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                 </div>

                <FormField
                   control={form.control}
                   name="message"
                   render={({ field }) => (
                      <FormItem>
                         <FormLabel>Your Message</FormLabel>
                         <FormControl>
                            <Textarea
                               placeholder="Please describe your legal matter or inquiry in detail..."
                               className="resize-y min-h-[120px]"
                               {...field}
                            />
                         </FormControl>
                         <FormMessage />
                      </FormItem>
                   )}
                />

                 {/* CAPTCHA Implementation */}
                 <FormField
                   control={form.control}
                   name="captchaToken" // Ensure this name matches the schema
                   render={({ field }) => ( // field is not directly used here, but needed for hook form structure
                     <FormItem>
                       <FormLabel>Security Check</FormLabel>
                       <FormControl>
                         {/*
                           Replace with your actual CAPTCHA component.
                           Example using a placeholder div structure.
                           You'd typically install and use a library like 'react-google-recaptcha'.
                           Make sure NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set in your environment.
                         */}
                         <div>
                           {/* Placeholder for reCAPTCHA component - Requires implementing react-google-recaptcha or similar */}
                           {/* Example structure:
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                onChange={(token) => setCaptchaToken(token)}
                                onErrored={() => {
                                    setCaptchaToken(null);
                                    form.setError("captchaToken", { type: "manual", message: "CAPTCHA error. Please try again." });
                                }}
                                onExpired={() => {
                                    setCaptchaToken(null);
                                    form.setValue('captchaToken', '', { shouldValidate: true });
                                }}
                            />
                           */}
                           {/* --- Simple Placeholder --- */}
                            <div className="p-4 bg-muted rounded border border-input flex items-center space-x-2">
                               <ShieldCheck className="w-5 h-5 text-muted-foreground"/>
                               <span className="text-sm text-muted-foreground italic">CAPTCHA placeholder - Implement reCAPTCHA here</span>
                            </div>
                            {/* You might need a hidden input if your CAPTCHA library doesn't integrate with RHF directly */}
                            <input type="hidden" {...form.register("captchaToken")} />
                         </div>
                       </FormControl>
                       <FormMessage /> {/* This will display the validation error for captchaToken */}
                     </FormItem>
                   )}
                 />

               <Button type="submit" className="w-full btn-cta" disabled={isSubmitting || !form.formState.isValid}>
                 {isSubmitting ? "Sending..." : "Send Message"}
               </Button>
               <FormDescription className="text-xs text-center pt-2">
                   Please note that contacting us via this form does not establish an attorney-client relationship. We typically respond within 1-2 business days. For urgent matters, please call our office directly during business hours.
               </FormDescription>
             </form>
           </Form>
        </div>
      </section>
    </>
  );
}
