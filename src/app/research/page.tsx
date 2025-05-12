import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from '@/components/section-heading';
import { Target, Microscope, BrainCircuit, Users, GraduationCap, Building, Scale, BookOpen, Briefcase, Lightbulb, CheckSquare, Database, Search } from 'lucide-react'; // Example Icons
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';

const coreMission = [
  { icon: Target, title: "Deep Legal Understanding", text: "To delve into the nuances of Indian law, providing clarity on complex legal principles and their practical applications in the contemporary legal and business environment." },
  { icon: Microscope, title: "Practical Application", text: "To bridge the gap between theoretical legal knowledge and its real-world implementation, offering actionable insights relevant to legal practice and business decisions in India." },
  { icon: BrainCircuit, title: "Anticipating Trends", text: "To identify emerging legal trends, legislative changes, and judicial pronouncements in India, equipping stakeholders with foresight for future legal landscapes." },
  { icon: Users, title: "Fostering Dialogue", text: "To stimulate informed discussion and debate within the Indian legal community, contributing to the evolution of legal thought and the development of jurisprudence." },
];

const methodologyPoints = [
 { icon: CheckSquare, title: "Rigorous Legal Analysis", text: "Employing meticulous examination of Indian statutes, landmark case law, legislative history, and regulatory frameworks." },
 { icon: Database, title: "Comprehensive Data Synthesis", text: "Integrating diverse data sources, including judicial pronouncements from various Indian courts, legislative materials, government reports, and academic literature." },
 { icon: Search, title: "Comparative Jurisprudence", text: "Drawing relevant insights from international legal systems and best practices to enrich the understanding and application of Indian law, where appropriate." },
 { icon: Lightbulb, title: "Expert Collaboration", text: "Engaging with subject-matter experts, senior advocates, and industry practitioners across India to ensure practical relevance and contemporary insights." },
 { icon: Briefcase, title: "Technology Integration", text: "Utilizing advanced legal research databases, AI-powered analytical tools, and legal tech platforms for efficiency, depth, and comprehensive analysis." },
];

const expertisePoints = [
  { icon: Scale, title: "Seasoned Legal Professionals", text: "Our core research team comprises experienced lawyers with deep domain knowledge across various facets of Indian law." },
  { icon: GraduationCap, title: "Academic Rigor", text: "We collaborate with leading legal academics and research institutions in India for theoretical depth and scholarly perspectives." },
  { icon: Building, title: "Industry Insights", text: "Input from industry specialists and business leaders ensures the practical applicability and commercial relevance of our research." },
  { icon: BookOpen, title: "Dedicated Research Team", text: "A specialized team focuses solely on legal research, analysis, and the creation of insightful content, ensuring quality and focus." },
];

const beneficiaries = [
 { icon: Briefcase, title: "Legal Practitioners", description: "Enhancing case strategies, legal arguments, and client advisory with in-depth analysis and current legal intelligence specific to India." },
 { icon: GraduationCap, title: "Legal Academics", description: "Providing rich material for research, teaching, and scholarly debate on contemporary issues in Indian law." },
 { icon: Building, title: "Corporations & Businesses", description: "Informing compliance strategies, risk management frameworks, and strategic decision-making within the Indian regulatory environment." },
 { icon: Users, title: "Policymakers & Regulators", description: "Contributing data-driven insights and analysis for legislative drafting, policy formulation, and regulatory development in India." },
];

export default function ResearchPage() {
  return (
    <>
      {/* Hero Section */}
       <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }} // Adjusted for header height
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Subtle overlay */}
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Research' }]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             Research
           </h1>
         </div>
       </section>

      {/* Intro Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max">
          <SectionHeading title="Elevating Legal Research with Expert-Driven Insights" />
          <div className="prose prose-lg max-w-4xl mx-auto text-foreground/90">
            <p>
              At the Law Chambers of G.R. Hari, we recognize that robust legal practice is built upon a foundation of thorough and insightful research. Our dedicated research division, accessible at <Link href="https://research.grhari.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent font-semibold">research.grhari.com</Link>, embodies our commitment to advancing the understanding and application of Indian law. We delve into complex legal issues, analyze emerging trends, scrutinize judicial pronouncements, and dissect legislative developments to provide valuable resources for legal professionals, academics, businesses, and policymakers across India.
            </p>
             <div className="text-center mt-8">
                <Link href="https://research.grhari.com" target="_blank" rel="noopener noreferrer" passHref>
                   <Button className="btn-cta">
                     Visit Our Research Platform
                   </Button>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Core Mission Section */}
      <section className="section-padding-sm bg-secondary">
        <div className="container-max">
          <SectionHeading title="Our Core Mission" centered/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreMission.map((item, index) => (
              <Card key={index} className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                   <item.icon className="w-10 h-10 text-accent mb-3" />
                   <CardTitle className="font-heading text-xl font-semibold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  {item.text}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max max-w-4xl mx-auto">
          <SectionHeading title="Our Methodology: The Synergy of Expertise and Technology" centered />
          <p className="text-center text-lg text-muted-foreground mb-10">
             Our research methodology is meticulously designed to deliver comprehensive, reliable, and contextually relevant insights into Indian law. We combine traditional legal scholarship with modern analytical tools and collaborative expertise.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {methodologyPoints.map((point, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                   <div className="flex items-center space-x-3">
                      <point.icon className="w-5 h-5 text-primary"/>
                      <span>{point.title}</span>
                   </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-8 pt-2">
                  {point.text}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

       {/* Expertise Section */}
      <section className="section-padding-sm bg-primary text-primary-foreground">
        <div className="container-max">
          <SectionHeading title="The Expertise Behind the Innovation" centered className="text-white"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {expertisePoints.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="w-10 h-10 text-accent mb-4" />
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-primary-foreground/80">{item.text}</p>
                 {/* Subtle gold accent */}
                 <div className="mt-4 h-px w-8 bg-accent/50"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficiaries Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max">
          <SectionHeading title="Who Benefits from Our Research" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficiaries.map((item, index) => (
               <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-accent pt-4">
                 <CardHeader className="items-center pb-2">
                    <item.icon className="w-10 h-10 text-primary mb-3" />
                    <CardTitle className="font-heading text-xl font-semibold">{item.title}</CardTitle>
                 </CardHeader>
                 <CardContent className="text-sm text-muted-foreground">
                   {item.description}
                 </CardContent>
                 {/* Add subtle divider if needed between cards on desktop */}
                 {/* {index < beneficiaries.length - 1 && (
                    <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-px bg-border -mr-4"></div>
                 )} */}
               </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding-sm bg-secondary">
        <div className="container-max text-center max-w-3xl mx-auto">
           <SectionHeading title="Join Our Pursuit of Deep Legal Understanding" centered />
           <p className="text-lg text-muted-foreground mb-8">
              Explore our dedicated research platform to access publications, articles, and analyses on critical aspects of Indian law. Engage with our findings, share your perspectives, and contribute to the ongoing dialogue shaping the future of law in India. For specific research inquiries or collaboration proposals, please do not hesitate to reach out.
           </p>
           <div className="space-x-4">
              <Link href="https://research.grhari.com" target="_blank" rel="noopener noreferrer" passHref>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    Explore Research Platform
                  </Button>
              </Link>
              <Link href="/contact?subject=Research Inquiry" passHref>
                <Button className="btn-cta">Contact Research Team</Button>
              </Link>
           </div>
        </div>
      </section>
    </>
  );
}
