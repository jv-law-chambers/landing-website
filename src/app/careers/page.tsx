"use client"; // Needed for form handling

import * as React from 'react';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from '@/components/section-heading';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Award, BookOpen, Users, TrendingUp, Handshake, Sparkles, Upload } from 'lucide-react'; // Example Icons

const benefits = [
 { icon: Award, title: "Meaningful Work", text: "Engage in challenging and impactful legal matters within the Indian context." },
 { icon: BookOpen, title: "Continuous Learning", text: "Access mentorship, training, and opportunities for professional development in Indian law." },
 { icon: Users, title: "Collaborative Culture", text: "Work alongside experienced professionals in a supportive and collegial environment." },
 { icon: TrendingUp, title: "Career Growth", text: "Clear pathways for advancement based on merit, performance, and dedication." },
];

const whyJoinUsPoints = [
 { icon: Sparkles, title: "Intellectually Stimulating Cases", text: "Tackle complex legal issues across diverse sectors in India." },
 { icon: Handshake, title: "Client Impact", text: "Directly contribute to achieving positive outcomes for our varied clientele." },
 { icon: Users, title: "Supportive & Respectful Team", text: "Be part of a collegial atmosphere that values teamwork, respect, and diverse perspectives." },
 { icon: Award, title: "Professional Reputation", text: "Join a firm recognized for its integrity, ethical standards, and legal excellence in India." },
];

// **Note:** Replace with actual current openings
const currentOpenings = [
 { title: "Associate - Corporate Law (2-4 Years PQE)", location: "Chennai", responsibilities: ["Drafting and reviewing commercial agreements", "Assisting in M&A transactions", "Conducting legal due diligence", "Corporate compliance management"], requirements: ["LLB degree from a recognized Indian university", "Enrolled with a State Bar Council", "2-4 years post-qualification experience in corporate/commercial law", "Strong analytical and drafting skills"] },
 { title: "Paralegal - Litigation Support", location: "Chennai", responsibilities: ["Case file management", "Legal research using databases like Manupatra/SCC Online", "Drafting basic legal documents", "Coordinating with court clerks and counsels"], requirements: ["Bachelor's degree (Law degree preferred but not mandatory)", "1+ year experience as a paralegal in a law firm", "Excellent organizational skills and proficiency in MS Office"] },
 // Add more openings as needed
];

// --- Form Schema and Handling ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const applicationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  position: z.string().min(1, { message: "Please specify the position you are applying for or 'General Interest'." }),
  coverLetter: z.string().optional(),
  resume: z.any()
    .refine((files) => files?.length === 1, "Resume is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      ".pdf, .doc, .docx files are accepted."
    ),
  consent: z.boolean().refine(val => val === true, { message: "You must consent to data processing for recruitment purposes." }),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

// --- Component ---

export default function CareersPage() {
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = React.useState(false);
   const [resumeFileName, setResumeFileName] = React.useState<string | null>(null);

   const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
      resume: undefined,
      consent: false,
    },
  });

   // Watch the resume field to update the file name display
   const resumeFile = form.watch("resume");
   React.useEffect(() => {
       if (resumeFile && resumeFile.length > 0) {
           setResumeFileName(resumeFile[0].name);
       } else {
           setResumeFileName(null);
       }
   }, [resumeFile]);


   async function onSubmit(data: ApplicationFormValues) {
     setIsSubmitting(true);
     console.log("Form Data to be submitted:", data); // Log data for debugging

     // **Backend Integration Needed**
     // Here you would typically:
     // 1. Create FormData
     // 2. Append all form fields to FormData
     // 3. Send FormData to your backend API endpoint (e.g., using fetch or axios)
     // 4. Handle the response (success/error) from the backend

     // Example using FormData (replace with your actual API endpoint and logic)
     const formData = new FormData();
     formData.append('fullName', data.fullName);
     formData.append('email', data.email);
     if (data.phone) formData.append('phone', data.phone);
     formData.append('position', data.position);
     if (data.coverLetter) formData.append('coverLetter', data.coverLetter);
     formData.append('resume', data.resume[0]); // Append the file
     formData.append('consent', data.consent.toString());

     try {
        // Replace '/api/apply' with your actual backend endpoint
       // const response = await fetch('/api/apply', {
       //    method: 'POST',
       //    body: formData,
       //    // Headers might be needed depending on your backend (e.g., 'Content-Type': 'multipart/form-data' is usually handled by browser with FormData)
       // });

       // if (!response.ok) {
       //    const errorData = await response.json().catch(() => ({ message: 'Submission failed with status ' + response.status }));
       //    throw new Error(errorData.message || 'Application submission failed.');
       // }

       // Simulate successful submission for now
       await new Promise(resolve => setTimeout(resolve, 1500));
       console.log("Simulated successful submission.");


       toast({ title: "Application Submitted Successfully!", description: "Thank you for your interest. We will review your application and be in touch if your profile matches our requirements." });
       form.reset(); // Reset form on success
       setResumeFileName(null); // Clear file name display

     } catch (error) {
        console.error("Submission Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
        toast({ title: "Submission Failed", description: errorMessage, variant: "destructive" });
     } finally {
        setIsSubmitting(false);
     }
   }


  return (
    <>
      {/* Hero Section */}
       <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }} // Adjusted for header height
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Subtle overlay */}
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             Careers
           </h1>
         </div>
       </section>

      {/* Intro Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max max-w-4xl mx-auto text-center">
           <SectionHeading title="Unleash Your Legal Potential. Join Our Team." centered />
           <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At the Law Chambers of G.R. Hari, we are constantly seeking talented, dedicated, and passionate legal professionals eager to build a rewarding career in Indian law. We offer a dynamic, challenging, and supportive environment where you can hone your skills, work on complex and significant cases, and contribute to a legacy of legal excellence and client service in India. We value intellectual curiosity, ethical practice, and a commitment to professional growth.
           </p>
            {/* Styled quote or testimonial */}
            <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-foreground/80 my-8 text-left max-w-2xl mx-auto">
              "The mentorship here is exceptional. Working on diverse and challenging cases within the Indian legal framework has significantly accelerated my professional growth." - Senior Associate
            </blockquote>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="section-padding-sm bg-secondary">
        <div className="container-max grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <SectionHeading title="Our Commitment to Our Team" />
            <p className="text-muted-foreground leading-relaxed">
               We believe our people are our greatest asset. Our commitment is to foster a workplace culture that prioritizes professional development, encourages collaboration, ensures mutual respect, and supports the overall well-being of every team member. We provide the resources, mentorship, and opportunities necessary for individuals to thrive both personally and professionally while contributing meaningfully to the firm's success and upholding our standards of excellence in the Indian legal community.
            </p>
             <p className="text-muted-foreground leading-relaxed mt-4">
               This includes structured mentorship programs, access to continuous legal education (CLE) resources relevant to Indian law, opportunities to work across diverse practice areas, and a clear performance evaluation process designed for growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                   <benefit.icon className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                   <div>
                      <h5 className="font-semibold text-md mb-1">{benefit.title}</h5>
                      <p className="text-sm text-muted-foreground">{benefit.text}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="section-padding-sm bg-white" id="openings">
        <div className="container-max max-w-4xl mx-auto">
           <SectionHeading title="Current Openings" centered />
           {currentOpenings.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
               {currentOpenings.map((opening, index) => (
                 <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg mb-4 shadow-sm overflow-hidden bg-white">
                   <AccordionTrigger className="text-lg font-semibold px-6 py-4 hover:no-underline hover:bg-secondary transition-colors flex justify-between items-center text-left">
                     <span>{opening.title}</span>
                     <span className="text-sm text-muted-foreground font-normal ml-4 flex-shrink-0">{opening.location}</span>
                   </AccordionTrigger>
                   <AccordionContent className="text-base px-6 pb-6 pt-2">
                     <div className="space-y-4">
                        <div>
                           <h4 className="font-semibold mb-1">Responsibilities:</h4>
                           <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                              {opening.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                           </ul>
                        </div>
                         <div>
                           <h4 className="font-semibold mb-1">Requirements:</h4>
                           <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                              {opening.requirements.map((r, i) => <li key={i}>{r}</li>)}
                           </ul>
                        </div>
                        <Button
                          size="sm"
                          className="btn-cta mt-4"
                          onClick={() => {
                            form.setValue('position', opening.title); // Pre-fill position
                            document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                        >
                          Apply Now
                        </Button>
                     </div>
                   </AccordionContent>
                 </AccordionItem>
               ))}
             </Accordion>
           ) : (
             <p className="text-center text-muted-foreground">There are currently no open positions. However, we encourage qualified candidates interested in future opportunities to submit a general application using the form below.</p>
           )}
        </div>
      </section>

       {/* Why Join Us Section */}
       <section className="section-padding-sm bg-primary text-primary-foreground">
         <div className="container-max text-center">
           <SectionHeading title="Why Join Us?" centered className="text-white" />
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
             {whyJoinUsPoints.map((point, index) => (
               <div key={index} className="flex flex-col items-center">
                 <point.icon className="w-10 h-10 text-accent mb-4" />
                 <h4 className="font-semibold text-lg mb-2">{point.title}</h4>
                 <p className="text-sm text-primary-foreground/80">{point.text}</p>
               </div>
             ))}
           </div>
            {/* Styled quote or testimonial */}
            <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-primary-foreground/80 my-8 max-w-2xl mx-auto text-left">
              "The firm truly invests in its people. The opportunities for learning and handling significant responsibilities within the Indian legal system have been unparalleled." - Associate
            </blockquote>
         </div>
       </section>

       {/* Equal Opportunity Statement */}
       <section className="py-8 bg-secondary">
         <div className="container-max max-w-3xl mx-auto text-center">
           <h3 className="font-semibold text-lg mb-2">We Are an Equal Opportunity Employer</h3>
           <p className="text-sm text-muted-foreground">
             The Law Chambers of G.R. Hari is committed to creating a diverse, inclusive, and respectful workplace. All qualified applicants will receive consideration for employment without regard to race, color, religion, gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, or veteran status, in accordance with applicable Indian laws. We believe diversity enriches our perspective and enhances our ability to serve our clients effectively.
           </p>
         </div>
       </section>

      {/* Application Form Section */}
      <section className="section-padding bg-white" id="application-form">
        <div className="container-max max-w-3xl mx-auto">
           <SectionHeading title="Tell Us About Yourself" centered />
           <p className="text-center text-muted-foreground mb-8">Interested in joining our team? Fill out the form below to apply for a specific opening listed above, or submit your profile for general consideration for future opportunities.</p>
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-lg border shadow-sm">
               <FormField
                 control={form.control}
                 name="fullName"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                   <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Phone Number (Optional)</FormLabel>
                         <FormControl>
                           <Input type="tel" placeholder="+91 123 456 7890" {...field} />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                </div>
                <FormField
                   control={form.control}
                   name="position"
                   render={({ field }) => (
                      <FormItem>
                         <FormLabel>Position Applied For / Interested In</FormLabel>
                         <FormControl>
                            <Input placeholder="e.g., Associate - Corporate Law, Paralegal, General Interest" {...field} />
                         </FormControl>
                         <FormMessage />
                      </FormItem>
                   )}
                />
                <FormField
                   control={form.control}
                   name="coverLetter"
                   render={({ field }) => (
                      <FormItem>
                         <FormLabel>Cover Letter (Optional)</FormLabel>
                         <FormControl>
                            <Textarea
                               placeholder="Briefly tell us why you are interested in joining our team and how your skills align with our practice..."
                               className="resize-y min-h-[100px]"
                               {...field}
                            />
                         </FormControl>
                         <FormMessage />
                      </FormItem>
                   )}
                />
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                      <FormLabel>Upload Resume (PDF, DOC, DOCX - Max 5MB)</FormLabel>
                      <FormControl>
                          <div className="relative flex items-center">
                              <label
                                  htmlFor="resume-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-medium text-primary hover:text-accent focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 border border-input px-4 py-2 h-10 inline-flex items-center"
                              >
                                  <Upload className="h-4 w-4 mr-2" />
                                  <span>{resumeFileName ? "Change File" : "Choose File"}</span>
                                  <input
                                      id="resume-upload"
                                      name={name}
                                      type="file"
                                      className="sr-only"
                                      ref={ref}
                                      onBlur={onBlur}
                                      onChange={(e) => onChange(e.target.files)}
                                      accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                  />
                              </label>
                              {resumeFileName && (
                                  <span className="ml-3 text-sm text-muted-foreground truncate max-w-[200px]">{resumeFileName}</span>
                              )}
                          </div>

                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />

                 <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                       <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-secondary/50">
                          <FormControl>
                             <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="consent-checkbox" // Add id for label association
                             />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                             <FormLabel htmlFor="consent-checkbox"> {/* Associate label with checkbox */}
                                Data Processing Consent
                             </FormLabel>
                             <p className="text-sm text-muted-foreground">
                                By submitting this application, I consent to the processing of my personal data by Law Chambers of G.R. Hari for recruitment and hiring purposes, as outlined in the <Link href="/privacy-policy" className="underline hover:text-accent">Privacy Policy</Link>.
                             </p>
                              <FormMessage />
                          </div>
                       </FormItem>
                    )}
                 />

               <Button type="submit" className="w-full btn-cta" disabled={isSubmitting || !form.formState.isValid}>
                 {isSubmitting ? "Submitting..." : "Submit Application"}
               </Button>
             </form>
           </Form>
        </div>
      </section>
    </>
  );
}
