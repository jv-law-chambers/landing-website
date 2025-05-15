// src/app/team/[slug]/page.tsx
import { notFound } from 'next/navigation';
import NextImage from 'next/image';
import Link from 'next/link';
import { Linkedin, Users } from 'lucide-react';
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getAllTeamMembers, getTeamMemberBySlug } from '../page'; // Adjust import path as needed
import type { Metadata } from 'next';


// Generate static paths for team member profile pages
export async function generateStaticParams() {
  const members = getAllTeamMembers();
  return members.map((member) => ({
    slug: member.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    return { title: "Team Member Not Found" };
  }

  const description = `Learn more about ${member.name}, ${member.position} at Law Chambers of G.R. Hari. ${member.bio.substring(0, 120)}...`;

  return {
    title: `${member.name} | ${member.position}`,
    description: description,
    alternates: {
      canonical: `/team/${slug}`,
    },
  };
}


export default async function TeamMemberProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    notFound(); // Show 404 if member data for the slug doesn't exist
  }

  return (
    <>
       {/* Hero Section (Simple) */}
       <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(30vh - 80px)' }} // Slightly shorter hero
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div>
         <div className="container-max relative z-10 py-10 md:py-12">
           {/* <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Our Team', href: '/team' },
                { label: member.name }
            ]} /> */}
           <h1 className="text-3xl md:text-4xl font-heading font-bold mt-2">
             {member.name}
           </h1>
           <p className="text-lg text-accent uppercase tracking-wider font-semibold mt-1">{member.position}</p>
         </div>
       </section>

      {/* Profile Details Section */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Left Column: Image and Links */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
              <div className="relative h-56 w-56 md:h-64 md:w-full mb-6 rounded-full overflow-hidden shadow-lg border-4 border-secondary">
                 <NextImage
                   src={member.image}
                   alt={`Professional photo of ${member.name}`}
                   data-ai-hint={`${member.name.split(' ')[0]} ${member.name.split(' ')[1] || ''}`}
                   fill
                   style={{ objectFit: 'cover' }}
                   sizes="(max-width: 768px) 224px, 33vw"
                   priority // Prioritize loading the main image
                 />
              </div>
              {/* Position, Links at the bottom */}
              <div className="mt-auto w-full flex flex-col items-center md:items-start space-y-3 pt-4">
                <p className="text-lg text-accent uppercase tracking-wider font-semibold text-center md:text-left w-full mb-1">{member.position}</p>
                {member.linkedin && member.linkedin !== '#' && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    View LinkedIn Profile
                  </a>
                )}
                <Link href="/team" passHref>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    <Users className="mr-2 h-4 w-4" />
                    View All Profiles
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Bio and Details */}
            <div className="md:col-span-2">
               <SectionHeading title="About" className="mb-6" />
               <div className="prose prose-lg max-w-none text-foreground/90 space-y-4">
                 {/* Split bio into paragraphs */}
                 {member.bio.split('\n').filter(para => para.trim() !== '').map((paragraph, index) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }}/>
                 ))}

                 {/* Add more sections if there's more detailed info, e.g., Education, Publications */}
                 {/* Example structure:
                 <h3 className="font-semibold font-heading text-xl mt-8">Education</h3>
                 <ul className="list-disc pl-5">
                    <li>[Degree Name], [University Name], [Year]</li>
                 </ul>

                 <h3 className="font-semibold font-heading text-xl mt-8">Publications</h3>
                 <ul className="list-disc pl-5">
                    <li>"[Article Title]", [Publication Name], [Year]</li>
                 </ul>
                 */}
               </div>
            </div>
          </div>
        </div>
      </section>

       {/* Contact CTA - Optional */}
       <section className="section-padding-sm bg-secondary">
         <div className="container-max text-center max-w-3xl mx-auto">
           <SectionHeading title={`Connect with ${member.name.split(' ')[0]}`} centered />
           <p className="text-lg text-muted-foreground mb-8">
             If you wish to discuss a matter related to {member.name}'s expertise, please reach out through our main contact channels.
           </p>
           <Link href="/contact" passHref>
             <Button className="btn-cta">
               Contact Our Firm
             </Button>
           </Link>
         </div>
       </section>
    </>
  );
}

// Ensure all necessary components and utils are imported
export const dynamicParams = true; // Allow slugs not generated at build time if needed later
