import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from '@/components/section-heading';
import { Target, Microscope, BrainCircuit, Users, GraduationCap, Building, Scale, BookOpen, Briefcase, Lightbulb, CheckSquare, Database, Search } from 'lucide-react'; // Example Icons
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';

const coreMission = [
  { icon: Target, title: "Deep Dive Analysis", text: "Meticulously examining the full spectrum of Supreme Court judgments, uncovering hidden connections, evolving legal principles, and nuanced interpretations." },
  { icon: Microscope, title: "Practical Application", text: "Providing actionable insights, empowering our users to develop more effective legal strategies and policies grounded in a thorough understanding of precedent." },
  { icon: BrainCircuit, title: "Efficient Resource Utilization", text: "Streamlining the research process, enabling our users to leverage comprehensive insights while maximizing their time and resources." },
  { icon: Users, title: "Evidence-Based Knowledge", text: "Transforming complex legal data into clear and accessible intelligence, allowing for more informed decisions and robust argumentation." },
];

const methodologyPoints = [
 { icon: CheckSquare, title: "Interpret with Context", text: "Move beyond surface-level readings to grasp the subtle nuances, contextual implications, and evolving interpretations of legal language in judgments." },
 { icon: Database, title: "Identify Interconnectedness", text: "Reveal the intricate relationships between cases, tracing the development of legal doctrines and the interconnectedness of the judicial system." },
 { icon: Search, title: "Provide Holistic Perspectives", text: "Explore majority opinions, dissenting views, and supporting arguments, providing a complete and nuanced perspective on each judgment." },
 { icon: Lightbulb, title: "Spot Emerging Trends", text: " Detect recurring patterns and evolving legal landscapes, providing insights into potential future developments and shifts in judicial thinking." },
 { icon: Briefcase, title: "Present Information Clearly", text: "Organize our findings in easily understandable formats, enabling users to readily utilize research findings for practical purposes." },
];

const expertisePoints = [
  { icon: Scale, title: "Ensure Legal Accuracy", text: "Our experienced legal researchers ensure the accuracy, relevance, and practical applicability of our findings." },
  { icon: GraduationCap, title: "Continuously Enhance Our Capabilities", text: "We are committed to refining our methodologies and adapting to the constantly evolving landscape of legal research and technology." },
  { icon: Building, title: "Uphold Ethical Practices", text: "We are dedicated to transparent and responsible research practices, guided by the highest ethical standards." },
  { icon: BookOpen, title: "Foster Knowledge Sharing", text: "We believe in the power of collaboration and contribute to the growth and innovation of the legal profession." },
];

const beneficiaries = [
 { icon: Briefcase, title: "Legal Practitioners", description: "Offering a powerful resource to enhance case preparation and develop well-supported legal arguments." },
 { icon: GraduationCap, title: "Legal Academics", description: "Supporting in-depth scholarship, identifying research gaps, and fostering a more nuanced understanding of the law." },
 { icon: Building, title: "Policymakers", description: "Providing an evidence-based foundation for sound legislative and policy decisions." },
 { icon: Users, title: "Legal Students", description: "Enriching their understanding of the legal system by providing exposure to innovative analytical methods and a deeper comprehension of legal reasoning." },
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
              At the Law Chambers of G.R. Hari, our dedicated Research Wing is committed to advancing the understanding of Indian law. We specialize in in-depth analysis of Supreme Court of India judgments, combining the power of technology with the profound skills of experienced legal researchers. Our goal is to provide transformative insights that empower legal professionals, academics, and policymakers alike.
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
           <p className="text-center text-lg text-muted-foreground mb-10">
             We strive to provide legal research of the highest caliber, moving beyond the limitations of traditional methods. Our mission is defined by
          </p>
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
             Our methodology is built on a foundation of rigorous legal analysis, enhanced by cutting-edge technology. We leverage artificial intelligence as a powerful tool that amplifies the skills of our researchers, enabling them to:
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
          <SectionHeading title="The Expertise Behind the Innovation" centered accentColor='text-accent' className="text-white"/>
          <p className="text-center text-lg text-muted-foreground text-white mb-10">
             Our research team is composed of seasoned legal professionals, data analysts, and technology experts who bring their diverse backgrounds to our collaborative research process. This team approach allows us to
          </p>
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
              We invite you to explore our research, engage with our insights, and join us in our mission to elevate legal understanding through expert-driven analysis.
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
