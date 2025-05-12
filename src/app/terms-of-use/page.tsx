
import { SectionHeading } from '@/components/section-heading';
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use',
  description: 'Read the Terms and Conditions for using the Law Chambers of G.R. Hari website.',
   alternates: {
    canonical: '/terms-of-use', // **Replace with actual domain later**
  },
   robots: { // Discourage search engines from indexing legal notices heavily
       index: false,
       follow: true,
       nocache: true,
   },
};

export default function TermsOfUsePage() {
  return (
    <>
      {/* Hero Section */}
      <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }}
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div>
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Use' }]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             Terms of Use
           </h1>
         </div>
       </section>

       {/* Content Section */}
       <section className="section-padding bg-white">
         <div className="container-max max-w-4xl mx-auto">
            <SectionHeading title="Website Terms and Conditions" centered />
           <div className="prose prose-lg max-w-none text-foreground/90 space-y-6 text-justify">
             <p>
               Welcome to the website of Law Chambers of G.R. Hari ("we," "us," or "our"). These Terms of Use govern your access to and use of our website located at <Link href="/" className="text-primary hover:text-accent font-semibold">grhari.com</Link> (*replace with actual domain*) (the "Website"). Please read these Terms of Use carefully before using the Website.
             </p>

             <h2 className="text-xl font-semibold font-heading">1. Acceptance of Terms</h2>
             <p>
                By accessing or using the Website, you agree to be bound by these Terms of Use and our <Link href="/privacy-policy" className="text-primary hover:text-accent font-semibold">Privacy Policy</Link>. If you do not agree to these terms, please do not access or use the Website. Your continued use of the Website constitutes your acceptance of these terms, as they may be amended from time to time. You also acknowledge that you have read and understood our <Link href="/disclaimer" className="text-primary hover:text-accent font-semibold">Disclaimer</Link>.
             </p>

             <h2 className="text-xl font-semibold font-heading">2. Website Content and Use</h2>
             <ul className="list-disc pl-6 space-y-1">
                 <li><strong>Informational Purposes Only:</strong> The content provided on this Website (including articles, publications, presentations, and general information) is for general informational purposes only. It does not constitute legal advice or create an attorney-client relationship.</li>
                 <li><strong>No Legal Advice:</strong> You should not rely upon the content of this Website as a substitute for obtaining legal advice from a qualified attorney licensed in the appropriate jurisdiction. Legal advice must be tailored to the specific circumstances of each case.</li>
                 <li><strong>No Attorney-Client Relationship:</strong> Your use of this Website, including sending inquiries or information through contact forms or email addresses listed, does not create an attorney-client relationship between you and Law Chambers of G.R. Hari. Do not send confidential information to us until such a relationship has been established through a formal engagement agreement.</li>
                  <li><strong>Permitted Use:</strong> You are permitted to view, download, and print content from the Website solely for your personal, non-commercial use, provided you do not modify the content and retain all copyright and other proprietary notices.</li>
             </ul>

             <h2 className="text-xl font-semibold font-heading">3. Intellectual Property Rights</h2>
             <p>
                All content on this Website, including text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of Law Chambers of G.R. Hari or its content suppliers and is protected by Indian and international copyright, trademark, and other intellectual property laws. The compilation of all content on this site is the exclusive property of Law Chambers of G.R. Hari. Unauthorized use, reproduction, modification, distribution, transmission, republication, display, or performance of the content is strictly prohibited.
             </p>
              <p>The name "Law Chambers of G.R. Hari" and associated logos are trademarks of the firm and may not be used without our prior written permission.</p>

             <h2 className="text-xl font-semibold font-heading">4. User Conduct and Prohibited Uses</h2>
              <p>You agree not to use the Website for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Website or interfere with any other party's use and enjoyment of it. Prohibited activities include, but are not limited to:</p>
               <ul className="list-disc pl-6 space-y-1">
                   <li>Attempting to gain unauthorized access to the Website, user accounts, or computer systems/networks connected to the Website.</li>
                   <li>Transmitting any material that contains viruses, Trojan horses, worms, time bombs, cancelbots, or other harmful or deleterious computer code.</li>
                   <li>Using any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying material.</li>
                   <li>Engaging in any activity that violates applicable laws or regulations in India or your jurisdiction.</li>
                   <li>Posting or transmitting any defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable material.</li>
               </ul>

             <h2 className="text-xl font-semibold font-heading">5. Disclaimers</h2>
             <ul className="list-disc pl-6 space-y-1">
                 <li><strong>No Warranties:</strong> The Website and its content are provided on an "as is" and "as available" basis without any warranties of any kind, express or implied. We do not warrant that the Website will be error-free, uninterrupted, secure, or free of viruses or other harmful components. We disclaim all warranties, including, but not limited to, warranties of title, merchantability, non-infringement of third parties' rights, and fitness for a particular purpose.</li>
                 <li><strong>Accuracy:</strong> While we strive to provide accurate information, we make no representations or warranties regarding the accuracy, completeness, reliability, or timeliness of the content on the Website.</li>
             </ul>

             <h2 className="text-xl font-semibold font-heading">6. Limitation of Liability</h2>
             <p>
                To the fullest extent permitted by applicable law, Law Chambers of G.R. Hari, its partners, associates, employees, and affiliates shall not be liable for any damages of any kind (including, without limitation, direct, indirect, incidental, punitive, and consequential damages, lost profits, or damages resulting from lost data or business interruption) arising out of or in connection with the use or inability to use the Website or its content, whether based on warranty, contract, tort (including negligence), or any other legal theory, even if we have been advised of the possibility of such damages.
             </p>

             <h2 className="text-xl font-semibold font-heading">7. Third-Party Links</h2>
             <p>
                The Website may contain links to third-party websites. These links are provided solely as a convenience to you and not as an endorsement by us of the content on such third-party websites. We are not responsible for the content of linked third-party sites and do not make any representations regarding the content or accuracy of materials on such sites. If you decide to access linked third-party websites, you do so at your own risk.
             </p>

             <h2 className="text-xl font-semibold font-heading">8. Governing Law and Jurisdiction</h2>
             <p>
                These Terms of Use shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. Any legal action or proceeding arising out of or relating to these Terms of Use or the Website shall be brought exclusively in the competent courts located in New Delhi, India, and you hereby consent to the jurisdiction of such courts.
             </p>

             <h2 className="text-xl font-semibold font-heading">9. Modifications to Terms</h2>
             <p>
                We reserve the right to modify these Terms of Use at any time without prior notice. Any changes will be effective immediately upon posting the revised Terms of Use on the Website. Your continued use of the Website after such changes constitutes your acceptance of the new Terms of Use. We encourage you to review these Terms of Use periodically.
             </p>

             <h2 className="text-xl font-semibold font-heading">10. Contact Information</h2>
             <p>
                If you have any questions about these Terms of Use, please contact us at: <a href="mailto:info@grhari.com" className="text-primary hover:text-accent">[info@grhari.com - *Replace with actual email*]</a> or via the contact details provided on our <Link href="/contact" className="text-primary hover:text-accent font-semibold">Contact Us</Link> page.
             </p>

             <p className="text-sm text-center text-muted-foreground mt-8">
                 Last Updated: [Date of Last Update - e.g., July 2024]
             </p>
           </div>
         </div>
       </section>
    </>
  );
}
