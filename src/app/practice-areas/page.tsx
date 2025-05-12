import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';
import { ArrowRight, Briefcase, Landmark, Scale, CheckSquare, FileText, UserCheck, Building } from 'lucide-react'; // Use consistent icons
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';


// Use a consistent set or map icons properly
const practiceAreaDetails = [
  { name: "Corporate & Commercial Law", icon: Briefcase, description: "Providing end-to-end legal support, from formation to dispute resolution.", href: "/practice-areas/corporate-law" }, // Updated Name/Desc
  { name: "Commercial Litigation", icon: Scale, description: "Representing clients in complex business disputes, arbitration, and mediation.", href: "/practice-areas/commercial-litigation" },
  { name: "Intellectual Property", icon: Landmark, description: "Protecting trademarks, copyrights, patents, designs, and trade secrets.", href: "/practice-areas/intellectual-property" },
  { name: "Real Estate Law", icon: Building, description: "Handling property transactions, leasing, zoning, and development projects.", href: "/practice-areas/real-estate-law" }, // Changed Icon
  { name: "Employment Law", icon: UserCheck, description: "Advising on labor regulations, contracts, policies, and workplace disputes.", href: "/practice-areas/employment-law" }, // Changed Icon
  { name: "Regulatory Compliance", icon: CheckSquare, description: "Navigating complex regulatory landscapes across various Indian industries.", href: "/practice-areas/regulatory-compliance" }, // Updated Desc
  { name: "Tax Law", icon: FileText, description: "Providing strategic advice on direct and indirect taxation matters.", href: "/practice-areas/tax-law" }, // Example additional area
  { name: "Insolvency & Bankruptcy", icon: Briefcase, description: "Assisting creditors and debtors through insolvency proceedings under IBC.", href: "/practice-areas/insolvency-bankruptcy" }, // Example additional area, Updated Desc
  // Add more practice areas if needed, ensuring icons are imported and assigned.
];

export default function PracticeAreasPage() {
  return (
    <>
      {/* Hero Section */}
      <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }} // Adjusted for header height
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Subtle overlay */}
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Practice Areas' }]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             Practice Areas
           </h1>
         </div>
       </section>

      {/* Intro Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max max-w-4xl mx-auto text-center">
           <SectionHeading title="Comprehensive Legal Expertise Across India" centered />
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Law Chambers of G.R. Hari offers a wide spectrum of specialized legal services across key practice areas relevant to the Indian legal and business environment. Our team possesses deep domain knowledge and extensive practical experience gained from representing clients before various courts and tribunals in India. We are committed to providing effective, strategic, and tailored solutions to meet the specific needs of our clients, whether they are large multinational corporations, growing domestic businesses, or individuals seeking expert legal guidance.
          </p>
        </div>
      </section>

      {/* Practice Areas Grid Section */}
      <section className="section-padding-sm bg-secondary">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreaDetails.map((area) => {
               const Icon = area.icon || Briefcase; // Fallback icon
              return (
                <Card key={area.name} className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col group border border-transparent hover:border-accent/50 aspect-[4/3] md:aspect-auto"> {/* Added aspect ratio for consistent card size */}
                   <CardHeader className="items-center text-center pt-6 pb-2"> {/* Adjusted padding */}
                      <div className="p-3 bg-accent/10 rounded-full mb-3 transition-colors duration-300 group-hover:bg-accent"> {/* Adjusted margin */}
                          <Icon className="w-8 h-8 text-accent transition-colors duration-300 group-hover:text-white" />
                      </div>
                      <CardTitle className="font-heading text-xl font-semibold">{area.name}</CardTitle>
                   </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between text-center px-6 pb-6 pt-2"> {/* Adjusted padding */}
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{area.description}</p> {/* Adjusted margin */}
                    <Link href={area.href} className="inline-flex items-center justify-center text-sm font-semibold text-primary hover:text-accent group/link mt-auto">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

       {/* Contact CTA Section */}
       <section className="section-padding-sm bg-white">
         <div className="container-max text-center max-w-3xl mx-auto">
            <SectionHeading title="Need Specialized Legal Assistance in India?" centered />
           <p className="text-lg text-muted-foreground mb-8">
             Our diverse practice areas cover a wide range of legal needs within the Indian jurisdiction. Contact us today to discuss how our specialized expertise can help you navigate your specific legal challenges effectively.
           </p>
           <Link href="/contact" passHref>
             <Button className="btn-cta">
               Request a Consultation
             </Button>
           </Link>
         </div>
       </section>
    </>
  );
}
