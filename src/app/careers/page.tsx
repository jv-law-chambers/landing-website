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
import { sendApplicationEmail } from '@/actions/send-application-email';

const benefits = [
 { icon: Award, title: "Meaningful Work", text: "Engage in challenging and impactful legal matters within the Indian context." },
 { icon: BookOpen, title: "Continuous Learning", text: "Access mentorship, training, and opportunities for professional development in Indian law." },
 { icon: Users, title: "Collaborative Culture", text: "Work alongside experienced professionals in a supportive and collegial environment." },
 { icon: TrendingUp, title: "Career Growth", text: "Clear pathways for advancement based on merit, performance, and dedication." },
];

const whyJoinUsPoints = [
 { icon: Sparkles, title: "Growth Mindset", text: "Opportunities for accelerated learning and mentorship abound." },
 { icon: Handshake, title: "Diverse Caseload", text: "Experience the thrill of working on a broad range of legal issues." },
 { icon: Users, title: "Inspiring Colleagues", text: "Collaborate with a team of bright, committed legal professionals." },
 { icon: Award, title: "Honors Your Talent", text: "We reward hard work and exceptional results." },
];

// **Note:** Replace with actual current openings
const currentOpenings = [
  {
    title: "Senior Associate (Litigation)",
    location: "Chennai",
    responsibilities: [
      "Lead And Manage Complex Litigation Cases",
      "Conduct Legal Research And Analysis",
      "Draft Pleadings And Motions",
      "Represent Clients In Court",
      "Mentor Junior Associates",
      "Develop Strong Client Relationships"
    ],
    requirements: [
      "5+ Years Of Litigation Experience",
      "Strong Analytical And Research Skills",
      "Excellent Written And Oral Communication Skills",
      "Proven Ability To Manage Cases Independently",
      "A Passion For Advocacy"
    ]
  },
  {
    title: "Associate (Litigation)",
    location: "Chennai",
    responsibilities: [
      "Conduct Legal Research", 
      "Draft Pleadings And Motions", 
      "Assist Senior Associates In Case Preparation", 
      "Represent Clients In Court", 
      "Develop Strong Legal Skills."
    ],
    requirements: [
      "2+ Years Of Litigation Experience", 
      "Strong Analytical And Research Skills", 
      "Excellent Written And Oral Communication Skills",
      "A Commitment To Excellence."
    ]
  },
  {
    title: "Associate (Real Estate) – Tamil Must",
    location: "Chennai",
    responsibilities: [
      "Conduct Legal Research On Real Estate Matters", 
      "Draft Legal Documents Related To Property Transactions", 
      "Assist Senior Associates In Real Estate Litigation", 
      "Provide Legal Advice To Clients On Real Estate Issues."
    ],
    requirements: [
      "2+ Years Of Experience In Real Estate Law", 
      "Strong Knowledge Of Tamil Nadu Land Laws",
      "Excellent Research And Drafting Skills",
      "Fluency In Tamil."
    ]
  },
  {
    title: "Intern",
    location: "Chennai",
    responsibilities: [
      "Assist Associates With Research", 
      "Legal Writing And Document Preparation",
      "Participate In Client Meetings", 
      "Gain Practical Legal Experience."
    ],
    requirements: [
      "Currently Enrolled In A Recognized Law Program", 
      "Strong Research And Writing Abilities",
      "A Keen Interest In The Legal Field."
    ]
  }
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

     try {
       // Convert resume file to an appropriate format for the server action
       const formData = new FormData();
    
        // Add all form fields
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        if (data.phone) formData.append('phone', data.phone);
        formData.append('position', data.position);
        if (data.coverLetter) formData.append('coverLetter', data.coverLetter);
        formData.append('consent', data.consent.toString());
        
        // Add the file directly
        if (data.resume?.[0]) {
          formData.append('resumeFile', data.resume[0]);
        }
        
    // Call server action with FormData
    const result = await sendApplicationEmail(formData);
       if (result.success) {
         toast({ 
           title: "Application Submitted Successfully!", 
           description: "Thank you for your interest. We will review your application and be in touch if your profile matches our requirements." 
         });
         form.reset(); // Reset form on success
         setResumeFileName(null); // Clear file name display
       } else {
         throw new Error(result.error || "Application submission failed.");
       }
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
              At the Law Chambers of G.R. Hari, we believe brilliance emerges from collaboration, passionate advocacy, and the relentless pursuit of growth. We're not just practicing law; we're building careers and shaping the future of the legal profession in India. If you're ready to take your legal career to the next level, we invite you to explore opportunities where you'll make an impact within a dynamic, supportive, and intellectually stimulating environment.
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
               We understand that our firm's success is directly linked to the talent and dedication of our team members. That's why we are committed to fostering a workplace where you can thrive both professionally and personally.
            </p>
             <p className="text-muted-foreground leading-relaxed mt-4">
               Meaningful and Challenging Work: Tackle complex legal issues and contribute to high-stakes cases that have a real impact on our clients' lives.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Continuous Learning and Development: We invest in your growth with mentorship programs, professional development opportunities, and access to cutting-edge legal resources.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              A Collaborative and Supportive Culture: Join a team of bright, passionate, and supportive legal professionals who are committed to excellence and mutual success.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              A Focus on Work-Life Integration: We believe in creating a sustainable work environment that allows you to balance your professional aspirations with your personal life.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Competitive Compensation and Benefits: We offer a comprehensive compensation package that recognizes your contributions and includes health insurance, retirement benefits, paid time off, and more.
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
                   <AccordionTrigger className="text-lg font-semibold px-6 py-4 hover:no-underline hover:bg-secondary transition-colors flex items-center text-left gap-4">
                    <div className="flex-1 truncate">{opening.title}</div>
                    <div className="text-sm text-muted-foreground font-normal whitespace-nowrap">{opening.location}</div>
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
           <SectionHeading title="Why Join Us?" centered accentColor='text-accent' className="text-white" />
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
              Ready to Elevate Your Career? We're not just looking for resumes— we want to hear your story.
            </blockquote>
         </div>
       </section>

       {/* Equal Opportunity Statement */}
       <section className="py-8 bg-secondary">
         <div className="container-max max-w-3xl mx-auto text-center">
           <h3 className="font-semibold text-lg mb-2">We Are an Equal Opportunity Employer</h3>
           <p className="text-sm text-muted-foreground">
             The Law Chambers of G.R. Hari is committed to fostering a diverse and inclusive workplace. We value the unique perspectives and talents of all individuals. All qualified applicants are considered for employment regardless of race, color, religion, sex, sexual orientation, gender identity, age, national origin, disability, or any other protected status.
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