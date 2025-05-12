// src/app/practice-areas/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, UserCheck, FileText, Briefcase, Scale, Landmark, CheckSquare, Building, Minus, Plus } from 'lucide-react'; // Added Building, Minus, Plus
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils'; // Import cn utility
import type { Metadata } from 'next';

// --- Mock Data ---
// In a real app, this would come from a database or CMS
const practiceAreaData: { [key: string]: any } = {
  "corporate-law": {
    name: "Corporate & Commercial Law", // Updated Name
    icon: Briefcase,
    introduction: "Our Corporate & Commercial Law practice forms the cornerstone of our business law offerings, providing end-to-end legal support to organizations. We advise on a wide spectrum of corporate matters, ensuring strict adherence to legal frameworks while safeguarding our clients' strategic objectives. We address areas such as company formation, corporate governance, mergers and acquisitions, foreign investment, contract management, and commercial dispute resolution, offering seamless legal services to businesses in India and abroad.", // Updated from OCR
    services: {
      "Advisory Services": [ // Renamed from "Advisory Services" for clarity based on OCR section
        "Corporate Structuring and Restructuring: Advising on optimal legal structures (sole proprietorship, partnership, private/public limited company, LLP) considering tax, liability, capital, scalability, and compliance with the Companies Act, 2013. Guidance on restructuring for efficiency, risk mitigation, strategic expansion, turnaround, IBC provisions, and cross-border restructuring.", // Updated from OCR
        "Regulatory Compliance Consulting: Ensuring full compliance with key Indian legislation (Companies Act 2013, SEBI regulations, Environment Protection Act 1986, Factories Act 1948, Minimum Wages Act 1948, sector-specific directives). Proactive monitoring, compliance audits, internal controls development, GST compliance, CSR (Section 135), industry standards, data privacy, and cybersecurity.", // Updated from OCR
        "Due Diligence: Comprehensive assessment of legal, financial, operational, environmental, IP, and tax risks for M&A, investments, JVs. Thorough investigations, document analysis, red flag identification, and negotiation support.", // Updated from OCR
        "Corporate Governance: Advising boards and management on best practices, listing obligations, director responsibilities, shareholder rights, and related party transactions.", // Kept similar
        "Structuring Investments & Joint Ventures: Designing optimal legal structures for FDI, joint ventures, strategic alliances, considering regulatory approvals (RBI, DPIIT) and tax implications.", // Kept similar
        "Regulatory Approvals & Licenses: Assisting in obtaining necessary approvals, licenses, and permits from various governmental and regulatory bodies.", // Kept similar
        "Secretarial Compliance: Ensuring adherence to statutory compliance under the Companies Act (registers, filings, meetings).", // Kept similar
      ],
      "Litigation & Dispute Resolution": [ // Kept as is, may need further content
          "Shareholder Disputes: Representing clients in disputes arising from shareholder agreements, oppression and mismanagement claims before the National Company Law Tribunal (NCLT).",
          "Contractual Disputes: Handling litigation related to breaches of commercial contracts, joint venture agreements, and shareholder agreements.",
          "Regulatory Investigations: Assisting companies and directors during investigations by regulatory authorities like SEBI, SFIO, or ROC.",
          "Insolvency Proceedings: Advising stakeholders in corporate insolvency resolution processes (CIRP) under the Insolvency and Bankruptcy Code (IBC).",
      ],
      "Documentation": [ // Kept as is, may need further content
          "Drafting and negotiation of various commercial agreements (e.g., supply, distribution, franchise, service agreements).",
          "Preparation of Shareholder Agreements, Share Purchase Agreements (SPAs), and Joint Venture Agreements.",
          "Drafting Partnership Deeds and LLP Agreements.",
          "Creation of Employee Stock Option Plans (ESOPs) documentation.",
          "Due Diligence Reports for M&A and investment transactions.",
      ],
    },
    serviceDetails: { // New section for accordion content - refined based on OCR and previous structure
        "Corporate Law Advisory": "Detailed advice on interpretations of the Companies Act, 2013, director duties, board procedures, related party transactions, compliance audits, and corporate restructuring strategies including IBC considerations and cross-border aspects.", // Merged restructuring
        "Mergers & Acquisitions (M&A)": "End-to-end legal support for M&A, including deal structuring, comprehensive due diligence (legal, financial, operational, environmental, IP, tax), drafting transaction documents (term sheets, SPAs, SSAs), negotiations, and regulatory filings.", // Enhanced with due diligence details
        "Private Equity & Venture Capital": "Advising investors and investee companies on funding rounds, term sheets, investment agreements, shareholder rights, and exit strategies.",
        "Foreign Direct Investment (FDI)": "Guidance on India's FDI policy, entry routes, sectoral caps, obtaining approvals, and compliance with FEMA regulations.",
        // "Corporate Restructuring" merged into "Corporate Law Advisory" detail above.
    },
    expertiseHighlights: [
      { title: "Cross-Border M&A in Pharma", description: "Successfully advised a European pharmaceutical company on its acquisition of a significant stake in an Indian generic drug manufacturer, navigating complex regulatory hurdles." },
      { title: "Technology Startup Funding", description: "Assisted a fast-growing Indian tech startup in structuring and closing its Series B funding round from international venture capital firms." },
      { title: "NCLT Representation", description: "Effectively represented minority shareholders in an oppression and mismanagement case before the National Company Law Tribunal, securing favourable interim relief." },
    ],
    team: [ { name: "G.R. Hari", image: "https://picsum.photos/seed/grhari/100/100", position: "Senior Advocate" }, { name: "Advocate Name 1", image: "https://picsum.photos/seed/associateA/100/100", position: "Senior Associate" }], // Replace with actual team members
    relatedAreas: ["commercial-litigation", "tax-law", "employment-law", "regulatory-compliance"], // Use slugs
  },
  "commercial-litigation": {
    name: "Commercial Litigation",
    icon: Scale,
    introduction: "Our Commercial Litigation practice provides robust representation for clients involved in complex business disputes across various judicial and quasi-judicial forums in India, including High Courts, the Supreme Court, NCLT, NCLAT, and specialized tribunals. We also possess significant expertise in domestic and international arbitration and alternative dispute resolution (ADR) mechanisms.",
     services: {
       "Litigation Services": [
            "Representation in Civil and Commercial Suits: Handling suits related to contract breaches, recovery of debts, property disputes, specific performance, and injunctions before civil courts and High Courts.",
            "Corporate Disputes: Expertise in shareholder disputes, oppression and mismanagement cases, derivative actions, and matters before the National Company Law Tribunal (NCLT) and National Company Law Appellate Tribunal (NCLAT).",
            "Writ Petitions: Challenging administrative actions and seeking constitutional remedies before High Courts and the Supreme Court.",
            "Recovery Proceedings: Representing financial institutions and creditors in recovery actions, including proceedings under the SARFAESI Act and Debt Recovery Tribunals (DRT).",
       ],
       "Arbitration & ADR": [
            "Domestic Arbitration: Representing clients in arbitrations governed by the Indian Arbitration and Conciliation Act, 1996, including drafting arbitration agreements, conducting proceedings, and challenging/enforcing awards.",
            "International Commercial Arbitration: Handling complex cross-border disputes under various institutional rules (e.g., SIAC, ICC, LCIA) and ad-hoc arbitrations.",
            "Mediation and Conciliation: Facilitating negotiated settlements through structured mediation and conciliation processes.",
            "Enforcement of Awards: Assisting in the enforcement of domestic and foreign arbitral awards in India.",
       ],
       "Specialized Areas": [
            "Insolvency and Bankruptcy Code (IBC): Representing creditors, debtors, and resolution professionals in CIRP and liquidation proceedings before NCLT.",
            "Intellectual Property Disputes: Handling infringement suits related to patents, trademarks, and copyrights.",
            "Competition Law Disputes: Representing clients before the Competition Commission of India (CCI) and the National Company Law Appellate Tribunal (NCLAT).",
            "White-Collar Crime & Investigations: Advising and representing clients in matters related to corporate fraud and economic offences.",
       ],
     },
    serviceDetails: {
        "Pre-Litigation Strategy & Advisory": "Analyzing disputes, advising on legal options, drafting legal notices, and exploring settlement possibilities before initiating formal proceedings.",
        "Interim Relief Applications": "Swiftly moving applications for urgent interim measures such as injunctions, stay orders, and appointment of receivers to protect client interests.",
        "Evidence Management & Trial Advocacy": "Meticulous preparation of pleadings, collection and presentation of evidence, cross-examination of witnesses, and persuasive oral arguments during trial.",
        "Appellate Practice": "Drafting and arguing appeals before High Courts and the Supreme Court of India against orders and judgments of lower courts and tribunals.",
    },
    expertiseHighlights: [
      { title: "High-Stake Infrastructure Arbitration", description: "Secured a multi-million dollar award for an international construction company in a complex arbitration concerning a major infrastructure project in India." },
      { title: "Successful IBC Representation", description: "Successfully represented a consortium of financial creditors in the Corporate Insolvency Resolution Process (CIRP) of a major manufacturing company, leading to a favorable resolution plan." },
      { title: "Supreme Court Injunction", description: "Obtained a crucial injunction from the Supreme Court of India, protecting our client's intellectual property rights in a landmark case." },
    ],
     team: [ { name: "G.R. Hari", image: "https://picsum.photos/seed/grhari/100/100", position: "Senior Advocate" }, { name: "Advocate Name 2", image: "https://picsum.photos/seed/associateB/100/100", position: "Associate" }], // Replace
    relatedAreas: ["corporate-law", "insolvency-bankruptcy", "intellectual-property", "regulatory-compliance"], // Use slugs
  },
   // --- Placeholder Data for other areas (Expand with actual content) ---
   "intellectual-property": {
      name: "Intellectual Property",
      icon: Landmark,
      introduction: "Protecting and enforcing your valuable intellectual property rights in India. We offer comprehensive services covering trademarks, patents, copyrights, designs, and trade secrets.",
      services: {
         "Registration & Prosecution": ["Trademark filing & prosecution", "Patent drafting & filing", "Copyright registration", "Design registration"],
         "Enforcement & Litigation": ["Infringement suits (Trademarks, Patents, Copyrights)", "Passing off actions", "IP disputes before courts and tribunals", "Customs recordal and border enforcement"],
         "Advisory & Transactions": ["IP due diligence", "Licensing and assignment agreements", "Technology transfer agreements", "IP portfolio management"],
      },
      serviceDetails: {
        "Trademark Strategy": "Advising on brand selection, conducting searches, and developing filing strategies.",
        "Patent Commercialization": "Assisting inventors and companies in licensing and monetizing their patented technologies.",
        "Copyright Monetization": "Structuring deals for licensing literary, artistic, musical works, and software.",
        "Design Protection": "Securing rights for novel industrial designs."
      },
      expertiseHighlights: [
         { title: "Successful Trademark Litigation", description: "Secured a permanent injunction against a major competitor for trademark infringement in the FMCG sector."},
         { title: "Patent Portfolio Management", description: "Developed and currently managing the global patent portfolio for a leading Indian technology company."},
      ],
      team: [{ name: "Advocate Name 2", image: "https://picsum.photos/seed/associateB/100/100", position: "Associate" }], // Replace
      relatedAreas: ["commercial-litigation", "corporate-law", "regulatory-compliance"]
   },
   "real-estate-law": {
      name: "Real Estate Law",
      icon: Building,
      introduction: "Navigating the complexities of real estate transactions, development, and regulations in India. We advise developers, investors, corporations, and individuals on all aspects of property law.",
      services: {
         "Property Transactions": ["Due diligence and title verification", "Drafting and negotiation of sale deeds, agreements for sale, lease deeds, mortgage deeds", "Registration of documents"],
         "Real Estate Development": ["Land acquisition advisory", "Compliance with RERA (Real Estate Regulation and Development Act)", "Joint Development Agreements (JDAs)", "Zoning and land use permissions"],
         "Litigation & Dispute Resolution": ["Property ownership disputes", "Landlord-tenant disputes", "Construction disputes", "Representation before RERA authorities and courts"],
      },
      serviceDetails: {
          "Title Due Diligence": "Comprehensive verification of property titles, encumbrances, and compliance history across various states in India.",
          "RERA Compliance": "Advising developers and promoters on registration, compliance obligations, and handling disputes under RERA.",
          "Lease Structuring": "Drafting and negotiating complex commercial and residential lease agreements.",
          "Construction Contracts": "Advising on and drafting construction contracts and related documentation.",
      },
      expertiseHighlights: [
         { title: "Large Scale Township Development", description: "Provided end-to-end legal advisory for the development of a major residential township project, including land acquisition and RERA compliance."},
         { title: "Commercial Leasing", description: "Negotiated and finalized high-value commercial lease agreements for multinational corporations setting up offices in India."},
      ],
      team: [{ name: "Advocate Name 3", image: "https://picsum.photos/seed/associateC/100/100", position: "Associate" }], // Replace
      relatedAreas: ["corporate-law", "commercial-litigation", "tax-law"]
   },
   "employment-law": {
     name: "Employment Law",
     icon: UserCheck,
     introduction: "Advising employers and employees on the full spectrum of Indian employment law, ensuring compliance with central and state labor regulations, managing workplace relations, and resolving disputes.",
     services: {
        "Advisory & Compliance": [
            "Compliance with Indian Labor Laws (e.g., Factories Act, Shops & Establishment Acts, EPF Act, ESI Act, Payment of Wages Act, Minimum Wages Act, POSH Act).",
            "Drafting and reviewing employment contracts, offer letters, and appointment letters.",
            "Developing HR policies, employee handbooks, and codes of conduct compliant with Indian law.",
            "Advising on termination procedures, retrenchment, and disciplinary actions.",
            "Structuring compensation and benefits, including ESOPs.",
            "Prevention of Sexual Harassment (POSH) Act compliance, including policy drafting, ICC formation, and training.",
        ],
        "Litigation & Dispute Resolution": [
            "Representing clients before Labor Courts, Industrial Tribunals, High Courts, and the Supreme Court in employment disputes.",
            "Handling cases related to wrongful termination, wage disputes, breach of employment contracts, and enforcement of non-compete clauses.",
            "Defending employers against claims of unfair labor practices.",
            "Representation in matters concerning trade unions and collective bargaining.",
        ],
        "Documentation": [
            "Employment Agreements", "Consultancy Agreements", "Non-Disclosure Agreements (NDAs)", "Non-Compete Agreements", "Settlement and Release Agreements", "Employee Stock Option Plans (ESOPs) Documentation", "HR Policy Manuals"
        ],
      },
     serviceDetails: {
        "Workforce Restructuring": "Advising on legal aspects of downsizing, layoffs, and voluntary retirement schemes (VRS) in compliance with Indian labor laws.",
        "POSH Act Implementation": "End-to-end assistance with POSH compliance, including setting up Internal Committees (IC), conducting inquiries, and awareness programs.",
        "Executive Compensation": "Structuring senior management contracts, including severance packages and restrictive covenants.",
        "Data Privacy in Employment": "Advising on employee data protection under Indian privacy laws.",
     },
     expertiseHighlights: [
         { title: "Handling Complex Terminations", description: "Advised a multinational company on the lawful termination process for senior executives, mitigating legal risks."},
         { title: "POSH Compliance Audit", description: "Conducted comprehensive POSH Act compliance audits for several large organizations, strengthening their internal processes."},
     ],
     team: [{ name: "Advocate Name 1", image: "https://picsum.photos/seed/associateA/100/100", position: "Senior Associate" }], // Replace
     relatedAreas: ["corporate-law", "commercial-litigation", "regulatory-compliance"]
   },
   "regulatory-compliance": {
      name: "Regulatory Compliance",
      icon: CheckSquare,
      introduction: "The Indian business environment demands stringent adherence to a complex web of regulations. Our team provides unparalleled support in navigating this landscape, ensuring full compliance with key legislation such as the Companies Act, 2013, Securities and Exchange Board of India (SEBI) regulations, environmental protection statutes under the Environment (Protection) Act, 1986, labor laws such as the Factories Act, 1948 and the Minimum Wages Act, 1948, and sector-specific directives.", // Updated from OCR
      services: {
          "Compliance Monitoring & Audits": ["Proactive monitoring of regulatory changes.", "Conducting thorough compliance audits.", "Developing robust internal control mechanisms to minimize penalties."], // Re-categorized from OCR
          "Sector-Specific Compliance": ["Advising businesses in regulated sectors like Pharmaceuticals, Telecommunications, Banking & Finance (NBFCs), Insurance, and E-commerce on specific licensing and operational requirements.", "Interfacing with regulators like RBI, SEBI, IRDAI, TRAI, etc."],
          "General Corporate Compliance": ["Compliance under Companies Act, 2013, FEMA regulations (Foreign Exchange Management Act), Competition Act, 2002.", "Data Privacy compliance under the Digital Personal Data Protection Act (DPDPA) and related rules.", "GST Compliance", "Corporate Social Responsibility (CSR) as per Section 135"], // Added GST, CSR from OCR
          "Environmental & Safety Laws": ["Advising on compliance with environmental regulations (Environment Protection Act 1986) and workplace health and safety laws (Factories Act 1948)."], // Added acts from OCR
          "Regulatory Due Diligence": ["Conducting compliance audits and regulatory due diligence for investments and M&A transactions."],
      },
      serviceDetails: {
          "FEMA Advisory": "Guidance on foreign exchange transactions, external commercial borrowings (ECBs), overseas direct investments (ODIs), and reporting requirements.",
          "Competition Law": "Advising on anti-competitive agreements, abuse of dominant position, merger control filings before the Competition Commission of India (CCI).",
          "Data Protection Framework": "Assisting organizations in implementing policies and processes to comply with India's data privacy and cybersecurity regulations.", // Added cybersecurity from OCR
          "License Procurement": "Managing the application process for various licenses and permits required to operate businesses in India.",
      },
      expertiseHighlights: [
          { title: "Telecom Licensing", description: "Successfully assisted a foreign telecom company in obtaining necessary licenses and approvals to launch services in India."},
          { title: "Data Privacy Implementation", description: "Advised a leading e-commerce platform on developing and implementing a comprehensive data privacy framework compliant with Indian law."},
      ],
      team: [{ name: "Advocate Name 1", image: "https://picsum.photos/seed/associateA/100/100", position: "Senior Associate" }], // Replace
      relatedAreas: ["corporate-law", "commercial-litigation", "intellectual-property", "tax-law"]
   },
   "tax-law": {
      name: "Tax Law",
      icon: FileText,
      introduction: "Providing strategic tax advisory and representation services covering both direct and indirect taxation in India. We assist businesses and individuals in optimizing tax structures, ensuring compliance, and resolving tax disputes.",
      services: {
          "Direct Taxation": ["Corporate Tax Planning and Advisory", "International Taxation (Transfer Pricing, DTAAs)", "Personal Income Tax Advisory", "Representation before Income Tax Authorities, CIT(Appeals), ITAT, High Courts, and Supreme Court."],
          "Indirect Taxation (GST)": ["GST Advisory and Compliance", "GST Registration, Return Filing, and Audits", "Structuring transactions for GST efficiency", "Representation before GST Authorities, Appellate Authorities, and Tribunals."],
          "Customs & Trade": ["Advisory on customs valuation, classification, and import/export procedures", "Handling customs duty disputes"],
          "Tax Due Diligence": ["Conducting tax due diligence for M&A, investments, and restructuring."],
      },
      serviceDetails: {
        "Transfer Pricing": "Advising multinational companies on transfer pricing documentation, benchmarking analysis, and representation during audits and appeals.",
        "Double Taxation Avoidance Agreements (DTAA)": "Advising on the applicability of DTAAs to minimize cross-border tax liabilities.",
        "GST Implementation & Optimization": "Assisting businesses in implementing GST-compliant processes and identifying opportunities for optimizing GST liabilities.",
        "Tax Litigation Strategy": "Developing effective strategies for handling complex tax disputes at various appellate levels.",
      },
      expertiseHighlights: [
          { title: "Successful Transfer Pricing Appeal", description: "Successfully represented a major IT company before the Income Tax Appellate Tribunal (ITAT) in a complex transfer pricing dispute."},
          { title: "GST Structuring for Supply Chain", description: "Advised a manufacturing company on restructuring its supply chain for optimal GST efficiency, resulting in significant cost savings."},
      ],
      team: [{ name: "G.R. Hari", image: "https://picsum.photos/seed/grhari/100/100", position: "Senior Advocate" }], // Replace
      relatedAreas: ["corporate-law", "commercial-litigation", "regulatory-compliance"]
   },
   "insolvency-bankruptcy": {
      name: "Insolvency & Bankruptcy",
      icon: Briefcase,
      introduction: "Providing comprehensive legal services under the Insolvency and Bankruptcy Code, 2016 (IBC). We represent creditors, debtors, resolution professionals, and other stakeholders throughout the insolvency and liquidation process in India.",
      services: {
          "Creditor Representation": ["Filing applications to initiate Corporate Insolvency Resolution Process (CIRP)", "Representing Financial and Operational Creditors in the Committee of Creditors (CoC)", "Advising on and challenging Resolution Plans"],
          "Debtor Advisory": ["Advising Corporate Debtors on initiating CIRP", "Assisting in negotiations with creditors and preparation for insolvency proceedings"],
          "Resolution Professionals (RP) Support": ["Providing legal counsel to RPs on conducting CIRP, verification of claims, and compliance with IBC regulations"],
          "Resolution Plan Advisory": ["Assisting Resolution Applicants in drafting and submitting compliant Resolution Plans", "Conducting due diligence on target companies under insolvency"],
          "Liquidation Process": ["Advising stakeholders during the liquidation process under the IBC"],
      },
      serviceDetails: {
        "CIRP Process Management": "Guiding clients through the entire CIRP timeline, from admission to approval of a resolution plan or liquidation.",
        "Avoidance Transactions": "Advising RPs and creditors on identifying and pursuing avoidance transactions (preferential, undervalued, fraudulent).",
        "Cross-Border Insolvency": "Advising on insolvency matters involving foreign creditors or assets, based on evolving Indian jurisprudence.",
        "Personal Guarantor Insolvency": "Representing creditors and personal guarantors in insolvency proceedings initiated against guarantors under the IBC.",
      },
      expertiseHighlights: [
          { title: "Representation in CoC", description: "Actively represented a major financial creditor in the Committee of Creditors for a large infrastructure company, influencing the outcome of the resolution plan."},
          { title: "Advisory to Resolution Professional", description: "Provided ongoing legal support to the Resolution Professional in the complex CIRP of a listed company."},
      ],
      team: [{ name: "G.R. Hari", image: "https://picsum.photos/seed/grhari/100/100", position: "Senior Advocate" }], // Replace
      relatedAreas: ["corporate-law", "commercial-litigation", "real-estate-law"]
   },
};


// Function to get slugs for related areas based on names (assuming names are unique identifiers here)
const getSlugFromName = (name: string): string | null => {
  const entry = Object.entries(practiceAreaData).find(([, data]) => data.name === name);
  return entry ? entry[0] : null;
}

// Dynamically create relatedLinks based on relatedArea names defined in the data
Object.keys(practiceAreaData).forEach(slug => {
   if (practiceAreaData[slug].relatedAreaNames) {
      practiceAreaData[slug].relatedLinks = practiceAreaData[slug].relatedAreaNames
         .map((name: string) => {
            const relatedSlug = getSlugFromName(name);
            return relatedSlug ? { name: name, href: `/practice-areas/${relatedSlug}` } : null;
         })
         .filter((item: any): item is { name: string; href: string } => item !== null);
   } else if (practiceAreaData[slug].relatedAreas) { // Fallback to using slugs if names aren't provided
       practiceAreaData[slug].relatedLinks = practiceAreaData[slug].relatedAreas
         .map((relatedSlug: string) => practiceAreaData[relatedSlug] ? { name: practiceAreaData[relatedSlug].name, href: `/practice-areas/${relatedSlug}` } : null)
         .filter((item: any): item is { name: string; href: string } => item !== null);
   }
});


// --- End Mock Data ---


// Generate static paths for Next.js build
export async function generateStaticParams() {
  return Object.keys(practiceAreaData).map((slug) => ({
    slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const data = practiceAreaData[slug];
  if (!data) {
    return { title: "Practice Area Not Found" };
  }
  const description = data.introduction ? data.introduction.substring(0, 160) + "..." : `Learn about our expertise in ${data.name} within the Indian legal system.`;
  return {
    title: `${data.name} | Law Chambers of G.R. Hari`,
    description: description,
    alternates: {
      canonical: `/practice-areas/${slug}`,
    },
  };
}


export default async function IndividualPracticeAreaPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const data = practiceAreaData[slug];

  if (!data) {
    notFound(); // Show 404 if data for the slug doesn't exist
  }

  // Use the pre-calculated relatedLinks
  const relatedLinks = data.relatedLinks || [];


  return (
    <>
      {/* Hero Section */}
      <section
         className="relative bg-primary text-white flex items-center justify-center text-center"
         style={{ minHeight: 'calc(40vh - 80px)' }} // Adjusted for header height
       >
         <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Subtle overlay */}
         <div className="container-max relative z-10 py-12 md:py-16">
           {/* <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Practice Areas', href: '/practice-areas' },
                { label: data.name }
            ]} /> */}
           <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
             {data.name}
           </h1>
         </div>
       </section>

      {/* Overview Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-max max-w-4xl mx-auto">
           <SectionHeading title="Overview" />
           <div className="prose prose-lg max-w-none text-foreground/90 space-y-4">
             <p>{data.introduction || 'Detailed information about this practice area.'}</p>
             {/* Key points can be added here if needed, potentially drawn from the introduction or a dedicated field */}
           </div>
        </div>
      </section>

       {/* Services Tabs/Accordion */}
       {data.services && Object.keys(data.services).length > 0 && (
         <section className="section-padding-sm bg-secondary">
            <div className="container-max max-w-5xl mx-auto">
               <SectionHeading title="Our Services in " centered suffix={data.name} />

               {/* Tabs for Desktop */}
               <Tabs defaultValue={Object.keys(data.services)[0]} className="hidden md:block">
                   <TabsList className={cn(
                       "grid w-full mb-6 bg-muted",
                       `grid-cols-${Math.min(Object.keys(data.services).length, 4)}` // Dynamic columns up to 4
                   )}>
                   {Object.keys(data.services).map((tabKey) => (
                       <TabsTrigger key={tabKey} value={tabKey} className="text-xs sm:text-sm px-2">{tabKey}</TabsTrigger> // Adjusted text size and padding
                   ))}
                   </TabsList>
                   {Object.entries(data.services).map(([tabKey, servicesList]) => (
                     <TabsContent key={tabKey} value={tabKey}>
                       <Card className="p-6 bg-white">
                         {Array.isArray(servicesList) ? (
                           <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                              {(servicesList as string[]).map((service, index) => (
                                 <li key={index}>{service}</li>
                              ))}
                           </ul>
                         ) : (
                           <p className="text-muted-foreground">{servicesList}</p> // Handle single string description
                         )}
                       </Card>
                     </TabsContent>
                   ))}
                 </Tabs>

                 {/* Accordion for Mobile */}
                <Accordion type="single" collapsible className="w-full md:hidden">
                  {Object.entries(data.services).map(([tabKey, servicesList], index) => (
                     <AccordionItem key={tabKey} value={`item-${index}`} className="border rounded-lg mb-4 shadow-sm overflow-hidden bg-white">
                        <AccordionTrigger className="text-base font-semibold px-4 py-3 hover:no-underline hover:bg-secondary transition-colors text-left">
                           {tabKey}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground pt-0 pb-4 px-4">
                           {Array.isArray(servicesList) ? (
                              <ul className="list-disc pl-5 space-y-2">
                                {(servicesList as string[]).map((service, sIndex) => (
                                  <li key={sIndex}>{service}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>{servicesList}</p> // Handle single string description
                            )}
                        </AccordionContent>
                     </AccordionItem>
                  ))}
                </Accordion>
            </div>
         </section>
       )}

       {/* Service Details Accordion */}
       {data.serviceDetails && Object.keys(data.serviceDetails).length > 0 && (
         <section className="section-padding-sm bg-white">
            <div className="container-max max-w-4xl mx-auto">
               <SectionHeading title="Service Details" centered />
               <Accordion type="multiple" className="w-full space-y-3">
                 {Object.entries(data.serviceDetails).map(([title, description], index) => (
                   <AccordionItem key={index} value={`detail-${index}`} className="border rounded-lg shadow-sm overflow-hidden">
                     <AccordionTrigger className="text-lg font-semibold px-6 py-4 hover:no-underline hover:bg-secondary transition-colors flex justify-between items-center text-left">
                       <span>{title}</span>
                       {/* Consider adding Plus/Minus icons if desired */}
                     </AccordionTrigger>
                     <AccordionContent className="text-base px-6 pb-6 pt-2 bg-white text-muted-foreground">
                       {description}
                     </AccordionContent>
                   </AccordionItem>
                 ))}
               </Accordion>
            </div>
         </section>
       )}


       {/* Case Studies/Expertise Highlights */}
       {data.expertiseHighlights && data.expertiseHighlights.length > 0 && (
         <section className="section-padding-sm bg-secondary">
           <div className="container-max">
             <SectionHeading title="Expertise Highlights" centered subtitle="Examples of our successful engagements in this area."/>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {data.expertiseHighlights.map((highlight: {title: string, description: string}, index: number) => (
                 <Card key={index} className="shadow-md bg-white hover:shadow-lg transition-shadow">
                   <CardHeader>
                     <CardTitle className="font-heading text-xl">{highlight.title}</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <p className="text-muted-foreground text-sm">{highlight.description}</p>
                     {/* Optional "Read More" link can be added if linking to full case study pages */}
                   </CardContent>
                 </Card>
               ))}
             </div>
           </div>
         </section>
       )}

      {/* Team Members Specializing */}
       {data.team && data.team.length > 0 && (
         <section className="section-padding-sm bg-white">
           <div className="container-max">
             <SectionHeading title={`Our Experts in ${data.name}`} centered />
              {/* Simple Grid Layout - Consider Carousel for many members */}
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:max-w-5xl md:mx-auto">
               {data.team.map((member: {name: string, image: string, position: string }, index: number) => (
                 <Card key={index} className="text-center shadow-sm hover:shadow-md transition-shadow duration-300 border overflow-hidden">
                   <div className="relative h-24 w-24 mx-auto mt-4 rounded-full overflow-hidden border-2 border-accent/20">
                     <Image src={member.image} alt={member.name} fill style={{ objectFit: 'cover' }} sizes="96px" />
                   </div>
                   <CardContent className="p-3">
                     <h5 className="font-semibold text-sm truncate">{member.name}</h5>
                     <p className="text-xs text-accent uppercase truncate">{member.position}</p>
                   </CardContent>
                 </Card>
               ))}
             </div>
              <div className="text-center mt-8 md:hidden">
                  <p className="text-xs text-muted-foreground italic">Scroll horizontally if needed</p>
              </div>
              <div className="text-center mt-12">
                  <Link href="/team" passHref>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                          Meet Our Full Team
                      </Button>
                  </Link>
              </div>
           </div>
         </section>
       )}

       {/* Related Practice Areas */}
       {relatedLinks.length > 0 && (
         <section className="section-padding-sm bg-primary text-primary-foreground">
           <div className="container-max">
              <SectionHeading title="Related Practice Areas" centered className="text-white" />
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
               {relatedLinks.map((link) => (
                 <Link key={link.href} href={link.href} className="block group">
                    <Card className="bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors duration-300 p-4 rounded-lg text-center shadow-inner h-full flex items-center justify-center">
                       <h5 className="font-semibold group-hover:text-accent transition-colors">{link.name}</h5>
                    </Card>
                 </Link>
               ))}
             </div>
           </div>
         </section>
       )}


      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-max text-center max-w-3xl mx-auto">
           <SectionHeading title={`Need Assistance With ${data.name}?`} centered />
           <p className="text-lg text-muted-foreground mb-8">
             If you require expert legal advice or representation concerning {data.name} within the Indian legal framework, please contact us to schedule a confidential consultation with our specialized team.
           </p>
           <Link href={`/contact?subject=Consultation - ${data.name}`} passHref>
             <Button className="btn-cta">
               Schedule a Consultation
             </Button>
           </Link>
        </div>
      </section>
    </>
  );
}
