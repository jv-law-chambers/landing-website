import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';
import { CheckCircle, Target, Users, Scale } from 'lucide-react'; // Example Icons
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';

// Updated team member previews based on team page data
const teamMembersPreview = [
  { name: "Hari G Ramasubramanian", position: "Founder", image: "/images/team/hari/hari1.jpg", slug: "hari-g-ramasubramanian" },
  { name: "Varsha Chandrasekaran", position: "Principal Associate", image: "/images/team/varsha/varsha1.jpg", slug: "varsha-chandrasekaran" },
  { name: "S. A. Johnson", position: "Associate", image: "/images/team/johnson/johnson1.jpg", slug: "s-a-johnson" },
  // Add more previews if desired, ensure they match slugs on team page
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-primary text-white flex items-center justify-center text-center"
        style={{ minHeight: 'calc(40vh - 80px)' }} // Adjusted for header height
      >
        <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Subtle overlay */}
        <div className="container-max relative z-10 py-12 md:py-16">
          {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} /> */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
            About Us
          </h1>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <SectionHeading title="Our Mission" />
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
              Our mission is to empower you, our client, to confidently navigate the complexities of the Indian legal system. We are dedicated to upholding the highest standards of legal excellence to ensure justice and fairness in every case we handle. We strive to provide pragmatic legal solutions that protect your rights and interests, allowing you to achieve your goals with clarity and peace of mind. We are committed to being your trusted advocate and partner, providing unwavering support and guidance every step of the way.
            </p>
          </div>
          <div>
            <SectionHeading title="Our Values" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {[
                { icon: CheckCircle, title: "Integrity", description: "Upholding the highest ethical standards in all our dealings and advice." },
                { icon: Target, title: "Client-Centricity", description: "Prioritizing client needs, offering tailored solutions, and ensuring clear communication." },
                { icon: Users, title: "Expertise", description: "Leveraging deep legal knowledge, continuous learning, and sector-specific insights." },
                { icon: Scale, title: "Professionalism", description: "Maintaining diligence, respect, timeliness, and excellence in our practice." },
              ].map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <value.icon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-lg mb-1">{value.title}</h5>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Firm History & Approach Section */}
      <section className="section-padding-sm bg-secondary">
        <div className="container-max max-w-4xl mx-auto text-left md:text-center">
          <SectionHeading title="Our History & Approach" centered/>
          <div className="prose prose-lg max-w-none text-foreground/90 text-left space-y-6">
             <h3 className="font-semibold font-heading text-2xl">Firm History</h3>
            <p>
               Founded by Hari G Ramasubramanian, a seasoned legal professional with decades of experience, the Law Chambers of G.R. Hari was established with a clear vision: to create a law firm that combines deep legal expertise with a client-first philosophy. Over the years, we have grown into a respected institution known for tackling complex legal challenges across various sectors within the Indian context. Our journey is marked by a consistent commitment to legal excellence and client satisfaction.
            </p>
             <h3 className="font-semibold font-heading text-2xl">Our Approach</h3>
            {/* Quote Block */}
            <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-foreground/80 my-8">
              "Our approach is rooted in a thorough understanding of the law and a commitment to achieving the best possible results for our clients, ethically and efficiently within the framework of the Indian legal system." - Hari G Ramasubramanian
            </blockquote>
            <p>
              We adopt a collaborative and strategic approach, working closely with clients to understand their objectives and the specific nuances of their situation. Our methodology integrates rigorous legal analysis with practical business acumen, ensuring that our advice is not only legally sound but also commercially viable and contextually relevant to India. We invest in continuous learning, stay updated on evolving Indian legislation and jurisprudence, and leverage technology to enhance efficiency and stay ahead in the dynamic legal environment of India.
            </p>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max">
          <SectionHeading title="Our Team" centered subtitle="Meet some of the dedicated professionals driving our success."/>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembersPreview.map((member, index) => (
              <Link key={index} href={`/team/${member.slug}`} passHref className="group">
                <Card className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-none bg-transparent h-full flex flex-col"> {/* Remove card border/bg, make flex col */}
                   {/* Make image container circular */}
                  <div className="relative aspect-square w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-md border-2 border-secondary group-hover:border-accent/30 transition-colors">
                     <Image src={member.image} alt={member.name} fill style={{ objectFit: 'cover', objectPosition: '25% center' }} sizes="160px" />
                  </div>
                  <CardContent className="p-2 flex-grow flex flex-col justify-center"> {/* Adjusted padding, flex grow */}
                    <h5 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">{member.name}</h5>
                    <p className="text-sm text-accent uppercase tracking-wide">{member.position}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/team" passHref>
              <Button className="btn-cta">Meet Our Full Team</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
