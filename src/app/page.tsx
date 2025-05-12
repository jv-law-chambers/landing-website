
import Link from "next/link";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, Landmark, Scale } from "lucide-react"; // Example icons
import { SectionHeading } from "@/components/section-heading";
import { Building, CheckSquare, FileText, UserCheck, Banknote, Ship, Anchor } from 'lucide-react'; // Added more icons

// Replace with actual icons or a library
const practiceAreaIcons = {
  "Corporate & Commercial Law": Briefcase,
  "Commercial Litigation": Scale,
  "Intellectual Property": Landmark,
  "Real Estate Law": Building,
  "Employment Law": UserCheck,
  "Regulatory Compliance": CheckSquare,
  "Tax Law": FileText, // Added icon
  "Insolvency & Bankruptcy": Anchor, // Changed Icon
  "Banking & Finance": Banknote, // Added icon
  "Maritime Law": Ship, // Added icon
};


const practiceAreas = [
  { title: "Corporate & Commercial Law", description: "Advising on company formation, M&A, JVs, corporate governance, FDI, and contract management.", href: "/practice-areas/corporate-law" },
  { title: "Commercial Litigation", description: "Representing clients in complex business disputes, arbitration, IBC matters, and appellate practice.", href: "/practice-areas/commercial-litigation" },
  { title: "Intellectual Property", description: "Protecting trademarks, copyrights, patents, designs, and handling IP enforcement.", href: "/practice-areas/intellectual-property" },
  { title: "Real Estate Law", description: "Handling property transactions, due diligence, RERA compliance, and development projects.", href: "/practice-areas/real-estate-law" },
  { title: "Employment Law", description: "Advising on labor regulations, contracts, POSH Act compliance, and workplace disputes.", href: "/practice-areas/employment-law" },
  { title: "Regulatory Compliance", description: "Navigating complex regulatory landscapes including FEMA, Competition Act, and Data Privacy.", href: "/practice-areas/regulatory-compliance" },
  // Added more areas from the document
  { title: "Tax Law", description: "Strategic advisory on direct/indirect taxes, transfer pricing, GST, and tax litigation.", href: "/practice-areas/tax-law" },
  { title: "Insolvency & Bankruptcy", description: "Expertise in IBC proceedings, representing creditors, debtors, and resolution professionals.", href: "/practice-areas/insolvency-bankruptcy" },
  { title: "Banking & Finance", description: "Advising on banking regulations, financing agreements, loan documentation, and recovery.", href: "/practice-areas/banking-finance" }, // New
  { title: "Maritime Law", description: "Handling shipping disputes, cargo claims, vessel arrests, and maritime contracts.", href: "/practice-areas/maritime-law" }, // New
];


export default function Home() {
  const contactPhoneNumber = "+91 91766 24466"; // Updated Number
  const contactPhoneNumberHref = `tel:${contactPhoneNumber.replace(/\s/g, '')}`;

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-[#1a2a43] to-[#2c3e50] text-white flex items-center justify-center text-center"
        style={{ minHeight: 'calc(60vh - 80px)' }} // Adjusted for header height
      >
         {/* Optional: Add a subtle background pattern or image */}
        <div className="absolute inset-0 bg-black/10 z-0"></div> {/* Subtle overlay */}
        <div className="container-max relative z-10 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight animate-fade-in-up">
            Comprehensive Legal Services in India
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Navigating Complexity, Delivering Clarity. The Law Chambers of G.R. Hari provides expert counsel and dedicated representation across a spectrum of legal fields in India.
          </p>
          <Link href="/contact?subject=Consultation" passHref>
            <Button className="btn-cta animate-fade-in-up animation-delay-400">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
        {/* Add subtle parallax effect later if needed */}
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container-max grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
             <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
               Law Chambers of G.R. Hari
             </h2>
             <div className="mt-2 h-0.5 w-10 bg-accent" />
          </div>
          <div className="md:col-span-3">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Welcome to the Law Chambers of G.R. Hari, a distinguished law firm based in India, renowned for its comprehensive legal services and unwavering commitment to client success. Established with a vision to provide expert legal counsel and representation, our firm stands on the pillars of integrity, professionalism, and deep legal expertise. We cater to a diverse clientele, including corporations, businesses, and individuals, offering tailored solutions to navigate the complexities of the Indian legal system.
            </p>
             {/* Add subtle divider line */}
             <hr className="mt-8 border-t border-gray-200" />
          </div>
        </div>
      </section>

      {/* Practice Areas Highlight Section */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <SectionHeading title="Our Practice Areas" centered subtitle="We offer specialized expertise across a diverse range of legal fields to meet the complex needs of our clients." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.slice(0, 6).map((area) => { // Display first 6 areas
              const Icon = practiceAreaIcons[area.title as keyof typeof practiceAreaIcons] || Briefcase; // Default icon
              return (
                <Card key={area.title} className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-8 h-8 text-accent flex-shrink-0" />
                      <CardTitle className="font-heading text-xl font-semibold">{area.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                    <Link href={area.href} className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent group mt-auto">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
           <div className="text-center mt-12">
              <Link href="/practice-areas" passHref>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                      View All Practice Areas
                  </Button>
              </Link>
           </div>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-max grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
            <Image
              src="https://picsum.photos/seed/lawfirm/400/400" // Placeholder
              alt="Law Chambers of G.R. Hari Office"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
             <SectionHeading title="Decades of Legal Excellence" />
            <p className="text-muted-foreground leading-relaxed">
              Founded on principles of integrity and driven by a passion for justice, the Law Chambers of G.R. Hari brings decades of collective experience to every case. Our team is dedicated to understanding your unique needs and crafting effective legal strategies tailored to the Indian legal environment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe in a client-centric approach, ensuring clear communication and transparency throughout the legal process. Discover how our commitment to excellence and deep understanding of Indian law can benefit you.
            </p>
            <Link href="/about" passHref>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Get Expert Legal Guidance Today
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Facing a legal challenge or seeking proactive advice in India? Let our experienced team provide the clarity and strategic support you need. Schedule a consultation to discuss your specific situation.
          </p>
          <Link href="/contact" passHref>
            <Button className="btn-cta">
              Contact Us Now
            </Button>
          </Link>
          <a href={contactPhoneNumberHref} className="block mt-6 text-lg font-semibold hover:text-accent transition-colors">
            Or call us at {contactPhoneNumber}
          </a>
        </div>
      </section>
    </>
  );
}

// Basic animation definitions (add to globals.css or use a library)
/*
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
*/
