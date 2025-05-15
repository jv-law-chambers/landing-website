
import Link from 'next/link'; // Corrected import
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Linkedin, ArrowRight } from "lucide-react";
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import NextImage from 'next/image'; // Renamed to avoid conflict
import { Button } from '@/components/ui/button'; // Import Button
import { cn } from '@/lib/utils'; // Import cn

// **Updated team member data based on provided content**
const teamMembers = [
  {
    slug: "hari-g-ramasubramanian",
    name: "Hari G Ramasubramanian",
    position: "Founder",
    bio: "Mr. Hari G Ramasubramanian is an advocate with 17 years of experience practicing before the High Courts and Trial Courts in Chennai. His practice encompasses a broad spectrum of legal areas, including commercial, criminal, civil, and corporate law. He possesses specialized knowledge in white-collar crimes, advising and representing clients in matters involving: \n\n<ul><li>Corporate Crimes</li><li>Money Laundering</li><li>Prevention of Corruption Act</li><li>Insolvency and Bankruptcy</li><li>Commercial Disputes</li><li>Intellectual Property</li><li>Fertility Law</li></ul>\n\n\nMr. Ramasubramanian's commitment to the legal profession extends beyond his practice. He has been appointed as amicus curiae by the Courts in several cases, demonstrating his dedication to assisting the judiciary in complex legal matters.\n\n<b>Legal Presentations and Publications:</b> Mr. Ramasubramanian is actively involved in legal education. He is a speaker on various topics of law, focusing on subjects relevant to his areas of expertise, such as corporate governance, white-collar crime defense, and emerging trends in commercial litigation. He is also a frequent speaker in law schools and universities.\n\n<b>Experience and Firm Management:</b> Mr. Ramasubramanian has a thriving practice before various Tribunals and Trial courts throughout Tamil Nadu, in addition to the High Court of Madras. Prior to establishing his independent practice in 2021, he was a partner at Ram and Ram from 2008 and subsequently a partner at Agraa Legal, a Bangalore-based law firm. His experience in these firms has provided him with a comprehensive understanding of legal practice management and client service. He effectively leads a team of experienced associates, ensuring that clients receive comprehensive and strategic legal representation.\n\n<b>Commitment to Clients:</b> Mr. Ramasubramanian is known for his ability to remain composed and focused even in high-pressure situations. He prioritizes clear communication, ensuring that clients are well-informed and understand the complexities of their cases. His analytical skills and strategic thinking allow him to develop innovative legal solutions tailored to each client's unique circumstances.",
    image: "/images/team/hari/hari1.jpg",
    linkedin: "https://www.linkedin.com/in/example-harigramasubramanian"
  },
  {
    slug: "varsha-chandrasekaran",
    name: "Varsha Chandrasekaran",
    position: "Principal Associate",
    bio: "Varsha Chandrasekaran is an Advocate enrolled with the Bar Council of Tamil Nadu and Pondicherry with an experience of more than five years in Litigation. She regularly appears before the Madras High Court, Trial Courts and other Tribunals based out of Chennai and has represented clients in all stages of litigation. Her primary areas of practice include Civil, Criminal, Writs and Arbitration. Her special interests involve Fertility laws and Criminal law including White collar crimes. Over the years, she has also acquired experience in real estate, commercial property due diligence, Family disputes and other dispute resolution mechanism.\n\nVarsha holds a bachelor's degree BA.LL. B (hons) from SASTRA School of Law, Thanjavur.",
    image: "/images/team/varsha/varsha1.jpg",
    linkedin: "https://www.linkedin.com/in/varsha-chandrasekaran-aa4a66171/"
  },
  {
    slug: "s-a-johnson",
    name: "S. A. Johnson",
    position: "Associate",
    bio: "Johnson is a legal professional with a master's degree in Labour law and administration. With a strong foundation in diverse areas of law, he specializes in advocating for justice and protecting individual rights.\n\nHe has experience working and representing before both High courts and Trial Courts in and around Chennai. Passionate about legal reform and community engagement, he is dedicated to fostering a deeper understanding of the law.",
    image: "/images/team/johnson/johnson1.jpg",
    linkedin: "https://www.linkedin.com/in/johnson-s-a-156840354/"
  },
  {
    slug: "s-manasa",
    name: "S. Manasa",
    position: "Associate",
    bio: "Manasa is an emerging legal professional with a focus on criminal law, taxation, writs, intellectual property rights (IPR), and arbitration. She has been assisting in research and drafting in the areas of writs, taxation and criminal law. She is dedicated to upholding justice and ensuring compliance with legal standards while navigating the intricacies of the law to achieve favorable outcomes for clients. Committed to continuous learning and professional growth, she aims to navigate complex legal issues while providing insightful support to clients, contributing to meaningful legal solutions.",
    image: "/images/team/manasa/manasa1.jpg",
    linkedin: "https://www.linkedin.com/in/manasa-s-03166a284/"
  },
  {
    slug: "aashika-viyazudeen",
    name: "Aashika Viyazudeen",
    position: "Associate",
    bio: "Aashika holds a master's degree in Cyberspace - Law and Justice from Tamil Nadu Dr. Ambedkar Law University and has been actively practicing in the areas of Civil Law, Criminal Law, Family Law, and Cyber Law. With a dedication to representing clients before all forums located in Chennai, she also engages in ongoing research in various areas of law. Known for being hardworking, she provides thorough client assistance and strives to achieve the best outcomes in every case.",
    image: "/images/team/aashika/aashika1.jpg",
    linkedin: "https://www.linkedin.com/in/aashika-viyazudeen-156011246/"
  },
  {
    slug: "sandhiya-s",
    name: "Sandhiya. S",
    position: "Paralegal and Accounts",
    bio: "Ms. Sandhiya is a dedicated professional with a Bachelor of Commerce (BCom) degree specialized in Computer Applications (CA). She efficiently manages both paralegal duties and accounting responsibilities. Her role also involves document preparation, bundle maintenance, case management, including maintaining financial records, bookkeeping, and creating invoices. Her combined expertise in commerce and legal assistance makes her an asset to the firm, ensuring seamless operations in both domains.",
    image: "/images/team/sandhiya/sandhiya2.jpg",
    linkedin: "https://www.linkedin.com/in/sandhiya-s-646269151/"
  },
   // Add more team members as needed
];

// Export teamMembers data for use in dynamic route
export const getTeamMemberBySlug = (slug: string) => {
  return teamMembers.find(member => member.slug === slug);
}

export const getAllTeamMembers = () => {
    return teamMembers;
}


// Generate static paths for team member profile pages
export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}


export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
       <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }} // Adjusted for header height
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Subtle overlay */}
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Our Team' }]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             Our Team
           </h1>
         </div>
       </section>


      {/* Team Intro Section */}
      <section className="section-padding-sm bg-secondary">
        <div className="container-max max-w-3xl mx-auto text-center">
           <SectionHeading title="Meet Our Legal Experts" centered />
          <p className="text-lg text-muted-foreground leading-relaxed">
             Our strength lies in our team – a collective of dedicated, experienced, and knowledgeable legal professionals specialized in Indian law. We bring diverse expertise and a shared commitment to achieving the best outcomes for our clients through collaboration, strategic thinking, and a deep understanding of the Indian legal system. Each member contributes unique skills and perspectives, ensuring comprehensive and effective representation.
          </p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden rounded-lg group border border-transparent hover:border-accent/30"> {/* Added group and border */}
                 {/* Circular image container */}
                 <Link href={`/team/${member.slug}`} passHref className="block">
                   <div className="relative h-48 w-48 mx-auto my-6 rounded-full overflow-hidden border-4 border-secondary group-hover:border-accent/20 shadow-md transition-colors">
                     <NextImage
                       src={member.image}
                       alt={`Professional photo of ${member.name}`}
                       data-ai-hint={`${member.name.split(' ')[0]} ${member.name.split(' ')[1] || ''}`}
                       fill
                       style={{ objectFit: 'cover', objectPosition: '25% center' }}
                       sizes="192px" // ~ 48 * 4
                       className="transition-transform duration-300 group-hover:scale-105"
                       priority={index < 3} // Prioritize loading images for the first few members
                     />
                   </div>
                 </Link>
                <CardContent className="p-5 pt-0 flex-grow flex flex-col text-center"> {/* Centered text */}
                  <Link href={`/team/${member.slug}`} passHref>
                    <h3 className="font-heading text-xl md:text-2xl font-semibold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  </Link>
                  <Link href={`/team/${member.slug}`} passHref>
                    <p className="text-sm text-accent uppercase tracking-wider font-semibold mb-3 group-hover:text-primary/80 transition-colors">{member.position}</p>
                  </Link>
                  <p className="text-sm text-muted-foreground flex-grow mb-4 line-clamp-4">{member.bio.split('\n')[0]}</p> {/* Display only first paragraph of bio */}

                   {/* Links container */}
                   <div className="mt-auto flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 pt-2">
                      <Link href={`/team/${member.slug}`} passHref legacyBehavior>
                        <a className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent group/link">
                          View Profile
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                        </a>
                      </Link>

                     {member.linkedin && member.linkedin !== '#' && (
                       <a
                         href={member.linkedin}
                         target="_blank"
                         rel="noopener noreferrer"
                         aria-label={`LinkedIn profile of ${member.name}`}
                         className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                       >
                         <Linkedin className="h-5 w-5" />
                         {/* Optional: add text "LinkedIn" or screen-reader only text */}
                         <span className="sr-only">LinkedIn</span>
                       </a>
                     )}
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Ensure all necessary components and utils are imported
// Add this export if `generateStaticParams` is used:
export const dynamicParams = true; // or false if you want only the defined slugs
