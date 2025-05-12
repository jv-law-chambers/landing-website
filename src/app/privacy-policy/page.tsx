
import { SectionHeading } from '@/components/section-heading';
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Review the Privacy Policy for the Law Chambers of G.R. Hari, detailing how we handle personal information.',
   alternates: {
    canonical: '/privacy-policy', // **Replace with actual domain later**
  },
  robots: { // Discourage search engines from indexing legal notices heavily
       index: false,
       follow: true,
       nocache: true,
   },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }}
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div>
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             Privacy Policy
           </h1>
         </div>
       </section>

       {/* Content Section */}
       <section className="section-padding bg-white">
         <div className="container-max max-w-4xl mx-auto">
            <SectionHeading title="Our Commitment to Your Privacy" centered />
           <div className="prose prose-lg max-w-none text-foreground/90 space-y-6 text-justify">
             <p>
               Law Chambers of G.R. Hari ("we," "us," or "our") is committed to protecting the privacy and confidentiality of personal information entrusted to us. This Privacy Policy outlines how we collect, use, disclose, and protect the personal information obtained through our website (<Link href="/" className="text-primary hover:text-accent font-semibold">grhari.com</Link> - *replace with actual domain*) and in the course of providing legal services, in compliance with applicable Indian laws, including the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and preparing for the Digital Personal Data Protection Act (DPDPA), 2023.
             </p>

              <h2 className="text-xl font-semibold font-heading">1. Information We Collect</h2>
              <p>We may collect the following types of personal information:</p>
             <ul className="list-disc pl-6 space-y-1">
                 <li>
                    <strong>Contact Information:</strong> Name, email address, phone number, postal address, job title, and organization name provided when you contact us, subscribe to updates, or inquire about our services or careers.
                 </li>
                 <li>
                    <strong>Professional Information:</strong> Information related to your business or legal matter when you engage our services.
                 </li>
                 <li>
                    <strong>Career Application Information:</strong> Information submitted through our careers page, including resume/CV, educational background, employment history, and cover letter.
                 </li>
                 <li>
                    <strong>Website Usage Information:</strong> Technical data such as IP address, browser type, operating system, referring URLs, pages visited, and time spent on our site, collected through cookies and similar technologies (subject to your consent where required). We use this for website analytics and improvement.
                 </li>
                <li>
                    <strong>Sensitive Personal Data or Information (SPDI):</strong> In the course of providing legal services, we might process SPDI as defined under Indian law (e.g., financial information for billing, information revealed during legal consultation). We handle SPDI with utmost confidentiality and in accordance with applicable legal and ethical obligations.
                </li>
             </ul>

              <h2 className="text-xl font-semibold font-heading">2. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                  <li>To respond to your inquiries and provide requested information.</li>
                  <li>To provide legal services and fulfill our contractual obligations to clients.</li>
                  <li>To process career applications and manage the recruitment process.</li>
                  <li>To send newsletters, legal updates, or invitations to events (where you have opted-in or where permitted by law).</li>
                  <li>To improve our website functionality, user experience, and content.</li>
                  <li>To comply with legal and regulatory obligations, including ethical duties as lawyers.</li>
                  <li>For billing and administrative purposes related to our services.</li>
              </ul>

               <h2 className="text-xl font-semibold font-heading">3. Legal Basis for Processing (Under DPDPA framework where applicable)</h2>
                <p>Our processing of your personal data is typically based on one or more of the following legal grounds:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Consent:</strong> Where you have explicitly provided consent (e.g., for newsletters, non-essential cookies, processing SPDI unless another basis applies).</li>
                    <li><strong>Performance of Contract:</strong> To provide legal services you have engaged us for or to process your career application.</li>
                    <li><strong>Legitimate Interests:</strong> For purposes like responding to inquiries, website improvement, and administrative tasks, provided our interests are not overridden by your fundamental rights.</li>
                    <li><strong>Legal Obligation:</strong> To comply with applicable laws, regulations, or court orders.</li>
                </ul>


              <h2 className="text-xl font-semibold font-heading">4. Data Sharing and Disclosure</h2>
              <p>We do not sell or rent your personal information. We may share your information in the following limited circumstances:</p>
              <ul className="list-disc pl-6 space-y-1">
                  <li><strong>With Service Providers:</strong> We may share information with third-party vendors who assist us with website hosting, IT support, email delivery, analytics, and other administrative functions. These providers are contractually obligated to protect your information.</li>
                  <li><strong>For Legal Reasons:</strong> We may disclose information if required by law, subpoena, court order, or other legal process, or to establish or exercise our legal rights or defend against legal claims.</li>
                  <li><strong>Professional Requirements:</strong> We may share information as necessary to comply with our professional and ethical obligations as legal counsel.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, relevant information may be transferred as part of the transaction, subject to confidentiality agreements.</li>
                  <li><strong>With Your Consent:</strong> We may share information with third parties when we have your explicit consent to do so.</li>
              </ul>
                <p>We generally do not transfer personal data outside India unless necessary for providing legal services (e.g., cross-border litigation involving foreign counsel) or using standard contractual clauses with service providers, ensuring adequate data protection safeguards.</p>

              <h2 className="text-xl font-semibold font-heading">5. Data Security</h2>
              <p>
                We implement reasonable technical, physical, and administrative security measures designed to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction, in line with Rule 8 of the IT (Reasonable Security Practices) Rules, 2011. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-xl font-semibold font-heading">6. Data Retention</h2>
              <p>
                We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law (e.g., for legal, regulatory, or ethical compliance, or for potential litigation). Client file retention is governed by our internal policies and professional obligations. Application data is retained as per our recruitment policy.
              </p>

              <h2 className="text-xl font-semibold font-heading">7. Your Rights</h2>
              <p>Subject to applicable Indian law (including the upcoming DPDPA), you may have the following rights regarding your personal information:</p>
               <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Right to Access:</strong> Request access to the personal information we hold about you.</li>
                    <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal information, subject to legal and ethical retention requirements.</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent for processing (where consent is the basis).</li>
                    <li><strong>Right to Grievance Redressal:</strong> Contact our designated Grievance Officer regarding any concerns.</li>
                    {/* Add rights under DPDPA as they become fully enforced, e.g., Right to nominate */}
                </ul>
               <p>To exercise these rights, please contact our Grievance Officer using the details below.</p>


              <h2 className="text-xl font-semibold font-heading">8. Cookie Policy</h2>
               <p>Our website may use cookies (small text files stored on your device) and similar technologies. Some cookies are essential for website functionality. Others help us analyze website traffic and improve user experience (analytics cookies). We will seek your consent for non-essential cookies where required by law. You can manage your cookie preferences through your browser settings.</p>
              {/* Consider adding a link to a more detailed Cookie Policy page if needed */}

              <h2 className="text-xl font-semibold font-heading">9. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. This Privacy Policy does not apply to those sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>

              <h2 className="text-xl font-semibold font-heading">10. Changes to This Policy</h2>
              <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will post the updated policy on our website, and the "Last Updated" date will indicate the latest revision.</p>

              <h2 className="text-xl font-semibold font-heading">11. Grievance Officer / Contact Information</h2>
              <p>
                If you have any questions, concerns, or wish to exercise your rights regarding your personal information, please contact our designated Grievance Officer:
              </p>
                <p>
                    <strong>Name:</strong> [Grievance Officer Name - **Required by IT Rules**]<br />
                    <strong>Designation:</strong> [Grievance Officer Designation]<br />
                    <strong>Email:</strong> [privacy@grhari.com - **Use a dedicated email**]<br />
                    <strong>Address:</strong> [Full Office Address - **Required by IT Rules**]<br/>
                    [Optional: Phone Number]
                </p>
                 <p>We will endeavor to address your concerns promptly and in accordance with applicable law.</p>

              <p className="text-sm text-center text-muted-foreground mt-8">
                 Last Updated: [Date of Last Update - e.g., July 2024]
              </p>
           </div>
         </div>
       </section>
    </>
  );
}
