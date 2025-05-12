
import { SectionHeading } from '@/components/section-heading';
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import Link from 'next/link'; // Import Link

export const metadata = {
  title: 'Disclaimer',
  description: 'Website Disclaimer for the Law Chambers of G.R. Hari, as per Bar Council of India rules.',
   alternates: {
    canonical: '/disclaimer', // **Replace with actual domain later**
  },
   robots: { // Discourage search engines from indexing legal notices heavily
       index: false,
       follow: true,
       nocache: true,
   },
};

export default function DisclaimerPage() {
  return (
    <>
      {/* Hero Section */}
      <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }}
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div>
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Disclaimer' }]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             Disclaimer
           </h1>
         </div>
       </section>

       {/* Content Section */}
       <section className="section-padding bg-white">
         <div className="container-max max-w-4xl mx-auto">
            <SectionHeading title="Website Disclaimer" centered/>
           <div className="prose prose-lg max-w-none text-foreground/90 space-y-4 text-justify">
              <h2 className="text-xl font-semibold font-heading">Important Notice Regarding Bar Council of India Rules</h2>
             <p>
                 As per the rules stipulated by the Bar Council of India, law firms in India are not permitted to solicit work or advertise their services. This website (<Link href="/" className="text-primary hover:text-accent font-semibold">grhari.com</Link> - *replace with actual domain*) is intended solely for informational purposes.
             </p>
              <h2 className="text-xl font-semibold font-heading">User Acknowledgement</h2>
             <p>
                 By accessing, browsing, or otherwise using this website, you, the user, hereby acknowledge and agree to the following conditions:
             </p>
             <ul className="list-decimal pl-6 space-y-2">
                <li>
                   <strong>No Solicitation or Advertisement:</strong> You acknowledge that there has been no advertisement, personal communication, solicitation, invitation, or inducement of any kind whatsoever from the Law Chambers of G.R. Hari or any of its members to solicit any work or establish an attorney-client relationship through this website.
                </li>
                <li>
                   <strong>Information Request:</strong> You acknowledge that you wish to gain more information about the Law Chambers of G.R. Hari, its practice areas, and its attorneys for your own information, understanding, and use, solely at your own initiative.
                </li>
                <li>
                    <strong>Informational Purpose Only:</strong> You acknowledge that the information provided about the firm on this website is made available only upon your specific request. Any information obtained or materials downloaded from this website are completely at your own volition.
                </li>
                 <li>
                    <strong>No Attorney-Client Relationship:</strong> You acknowledge that any transmission, receipt, or use of this website and its contents does not, and is not intended to, create an attorney-client relationship between you and the Law Chambers of G.R. Hari or any of its attorneys. Confidential information should not be sent to the firm through this website.
                </li>
             </ul>
              <h2 className="text-xl font-semibold font-heading">Nature of Information</h2>
              <p>
                 The content provided on this website is for informational purposes only and should not be interpreted as legal advice, soliciting, or advertising. The information may not reflect the most current legal developments, verdicts, or settlements. The firm expressly disclaims all liability in respect to actions taken or not taken based on any or all the contents of this website.
              </p>
              <h2 className="text-xl font-semibold font-heading">Seek Independent Legal Advice</h2>
              <p>
                 We are not liable for any consequence of any action taken by the user relying on material or information provided on this website. In cases where the user requires legal assistance or has specific legal issues, they must, in all circumstances, seek independent legal advice from a qualified legal practitioner licensed to practice in the relevant jurisdiction. Do not disregard professional legal advice or delay in seeking it because of something you have read on this website.
              </p>
               <h2 className="text-xl font-semibold font-heading">Acceptance</h2>
              <p>
                 Your continued use of this website constitutes your full acceptance of this disclaimer and the accompanying <Link href="/terms-of-use" className="text-primary hover:text-accent font-semibold">Terms of Use</Link> and <Link href="/privacy-policy" className="text-primary hover:text-accent font-semibold">Privacy Policy</Link>. If you do not agree with these terms, please refrain from using this website.
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
