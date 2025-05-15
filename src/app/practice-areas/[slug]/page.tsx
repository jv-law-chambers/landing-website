// src/app/practice-areas/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, UserCheck, FileText, Briefcase, Scale, Landmark, CheckSquare, Building, Minus, Plus, Handshake, User, YoutubeIcon, Brain, MapPinHouseIcon, Columns4Icon } from 'lucide-react'; // Added Building, Minus, Plus
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils'; // Import cn utility
import type { Metadata } from 'next';

// Define TypeScript interfaces for your data structure
interface RelatedLink {
  name: string;
  href: string;
}

interface PracticeAreaData {
  name: string;
  introduction?: string;
  relatedAreaNames?: string[];
  relatedAreas?: string[];
  relatedLinks?: RelatedLink[];
  services?: {
    [key: string]: string | string[];
  };
  // Add other properties your data has
}

// Define the shape of your main data object
interface PracticeAreaDataMap {
  [slug: string]: PracticeAreaData;
}

// --- Mock Data ---
// In a real app, this would come from a database or CMS
const practiceAreaData: { [key: string]: any } = {
  "business-law":{
    name: "Business Law",
    icon: Handshake,
    introduction: "The Law Chambers of G.R. Hari deliver holistic legal solutions designed to empower businesses across all stages of their lifecycle. Recognizing the intricate dynamics of the Indian commercial landscape, we provide astute guidance and robust representation, enabling our clients to proactively navigate legal hurdles, secure their assets, and drive sustainable growth. Our seasoned team of business law practitioners is committed to delivering actionable, results-oriented counsel, always prioritizing efficiency and cost-effectiveness. Our expertise extends across diverse industries, including IT, manufacturing, pharmaceuticals, renewable energy, and more. We pride ourselves in being a trusted partner, offering support from nascent startups to well-established multinational corporations."
  },
  "corporate-law": {
    name: "Corporate & Commercial Law", // Updated Name
    icon: Briefcase,
    introduction: "Our Corporate & Commercial Law practice forms the cornerstone of our business law offerings, providing end-to-end legal support to organizations. We advise on a wide spectrum of corporate matters, ensuring strict adherence to legal frameworks while safeguarding our clients' strategic objectives. We address areas such as company formation, corporate governance, mergers and acquisitions, foreign investment, contract management, and commercial dispute resolution, offering seamless legal services to businesses in India and abroad.", // Updated from OCR
    services: {
      "Advisory Services": [ // Renamed from "Advisory Services" for clarity based on OCR section
        "Corporate Structuring and Restructuring: Navigating the complexities of choosing the correct business entity is critical for long-term success. Our expertise extends to advising on optimal legal structures, be it a sole proprietorship, partnership, private limited company, public limited company, or even a Limited Liability Partnership (LLP), ensuring compliance with the Companies Act, 2013. We meticulously consider factors like tax implications, liability exposure, capital requirements, and scalability to recommend the most suitable structure. Furthermore, we provide expert guidance on restructuring existing businesses to unlock greater operational efficiency, mitigate inherent risks, and pave the way for strategic expansion or corporate turnaround, always mindful of the provisions of the Insolvency and Bankruptcy Code, 2016 (IBC) where applicable. We also advise on cross-border restructuring involving Indian entities.", // Updated from OCR
        "Regulatory Compliance Consulting: The Indian business environment demands stringent adherence to a complex web of regulations. Our team provides unparalleled support in navigating this landscape, ensuring full compliance with key legislation such as the Companies Act, 2013, Securities and Exchange Board of India (SEBI) regulations, environmental protection statutes under the Environment (Protection) Act, 1986, labor laws such as the Factories Act, 1948 and the Minimum Wages Act, 1948, and sector-specific directives. We offer proactive monitoring of regulatory changes, conduct thorough compliance audits, and develop robust internal control mechanisms to minimize the risk of penalties or legal action. Our services cover critical aspects such as GST compliance, corporate social responsibility (CSR) as per Section 135 of the Companies Act, adherence to industry-specific standards, and compliance with regulations related to data privacy and cybersecurity.", // Updated from OCR
        "Due Diligence: Informed decision-making is paramount in today's business world. Our due diligence services provide a comprehensive assessment of legal, financial, and operational risks associated with mergers and acquisitions, investments, joint ventures, and other strategic transactions. We conduct thorough investigations, analyze key documents, and identify potential red flags, empowering our clients to make sound investment choices and negotiate favorable transaction terms. Our expertise encompasses legal due diligence, financial due diligence, environmental due diligence, intellectual property due diligence, and tax due diligence, ensuring compliance with all regulatory stipulations under applicable laws. We have significant experience in conducting due diligence for businesses in the IT, pharmaceutical, and manufacturing sectors.", // Updated from OCR
        "Contract Drafting and Review: Contracts are the bedrock of any successful business operation. Our skilled legal professionals meticulously draft, review, and negotiate a wide range of commercial contracts, ensuring that our clients' interests are protected, and their legal rights are clearly defined. We handle diverse agreements, encompassing sales agreements, supply agreements, distribution agreements, licensing agreements, service agreements, confidentiality agreements, e-commerce agreements, and cloud computing agreements. Our focus is on creating clear, unambiguous contracts that minimize the potential for disputes and ensure enforceability under Indian law, specifically the Indian Contract Act, 1872. We advise on crucial clauses like force majeure, dispute resolution mechanisms, termination clauses, and limitation of liability.",
        "Corporate Governance Advisory: Sound corporate governance is essential for building trust and ensuring long-term sustainability. We provide expert guidance to boards of directors and senior management on implementing best practices in corporate governance, promoting transparency, accountability, and ethical conduct. Our services encompass advising on board composition, committee structures, shareholder rights, internal controls, and compliance with the requirements of the Companies Act, 2013 and SEBI regulations. We assist in developing and implementing robust corporate governance policies and procedures, ensuring alignment with global best practices and addressing emerging issues such as ESG (Environmental, Social, and Governance) compliance. We also advise on director and officer liability insurance (D&O Insurance) and conduct related party transaction reviews to ensure fairness and transparency.", // Kept similar
        "Mergers and Acquisitions Planning: Navigating the complexities of mergers and acquisitions requires strategic legal counsel and meticulous execution. Our team provides end-to-end support throughout the M&A process, from initial negotiations to post-merger integration. We conduct thorough due diligence, structure the transaction to optimize tax efficiency, negotiate favorable terms, secure regulatory approvals, and seamlessly integrate the acquired business into the client's existing operations. Our services encompass share purchase agreements, asset purchase agreements, mergers, demergers, and slump sales, ensuring compliance with the Competition Act, 2002 where applicable. We have expertise in both domestic and cross-border M&A transactions, as well as representing clients in private equity and venture capital investments.", // Kept similar
        "Foreign Investment Advisory: Attracting foreign investment is crucial for economic growth, but navigating the intricacies of Indian regulations can be challenging. We provide comprehensive legal and regulatory advice to foreign companies seeking to invest in India, assisting with structuring investments, obtaining necessary approvals from the Reserve Bank of India (RBI) and other government agencies, and complying with Indian laws and regulations, including the Foreign Exchange Management Act (FEMA), 1999. We assist with setting up branch offices, liaison offices, project offices, and wholly owned subsidiaries, guiding clients through the maze of approvals and compliance requirements.",
        "Joint Venture Structuring: Strategic alliances can unlock significant growth opportunities but require careful structuring to ensure alignment of interests and mitigate potential risks. We assist businesses in forming joint ventures, drafting comprehensive joint venture agreements that clearly define the rights, responsibilities, and obligations of each party. Our services encompass advising on equity participation, profit sharing, management control, dispute resolution mechanisms, and exit strategies, ensuring compliance with relevant provisions of the Indian Partnership Act, 1932 and other relevant legislation.",
      ],
      "Litigation & Dispute Resolution": [ // Kept as is, may need further content
          "Commercial Contract Disputes: Contractual disputes can disrupt business operations and lead to significant financial losses. Our litigation team possesses extensive experience in representing businesses in a wide range of commercial contract disputes, including breach of contract claims, warranty claims, fraud claims, and specific performance actions. We employ a strategic and results-oriented approach, exploring all available legal remedies, including negotiation, mediation, arbitration, and litigation, to achieve the best possible outcome for our clients within the framework of the Specific Relief Act, 1963 and the Code of Civil Procedure, 1908.",
          "Shareholder Disputes: Internal conflicts within a company can severely undermine its value and stability. We represent shareholders in disputes with other shareholders or with the company itself, handling cases involving minority shareholder rights, oppression, mismanagement, breach of fiduciary duty, and challenges to corporate decisions. We are adept at navigating the complexities of shareholder litigation, protecting our clients' interests and ensuring fair treatment under the law, often relying on provisions within the Companies Act, 2013, specifically addressing issues under Sections 241-246. We also represent clients before the National Company Law Tribunal (NCLT) and the National Company Law Appellate Tribunal (NCLAT) in these matters.",
          "Corporate Fraud Litigation: Corporate fraud can devastate a business, leading to financial ruin and reputational damage. We represent both businesses that have been victims of fraud and individuals accused of corporate fraud. Our expertise encompasses investigating and prosecuting complex fraud schemes, including embezzlement, accounting fraud, securities fraud, and Ponzi schemes, often involving provisions of the Indian Penal Code, 1860 and the Prevention of Corruption Act, 1988. We work closely with forensic accountants and other experts to uncover the truth and pursue all available legal remedies to recover losses and hold perpetrators accountable.",
          "Insolvency Proceedings: Financial distress requires prompt and strategic legal intervention. We represent both creditors and debtors in insolvency proceedings under the Insolvency and Bankruptcy Code (IBC), 2016, providing expert guidance on debt restructuring, resolution plans, liquidation, and other insolvency-related matters. We assist creditors in maximizing their recovery from distressed assets and advise debtors on navigating the insolvency process and achieving a fresh start, always ensuring compliance with the provisions of the IBC. We represent clients before the National Company Law Tribunal (NCLT) and the National Company Law Appellate Tribunal (NCLAT) in these proceedings, guiding them through every stage of the process, including corporate insolvency resolution processes (CIRP).",
          "Regulatory Enforcement Matters: Navigating regulatory scrutiny requires experienced counsel and a proactive approach. We represent businesses and individuals in regulatory enforcement actions brought by government agencies, such as the Securities and Exchange Board of India (SEBI), the Reserve Bank of India (RBI), the Directorate of Revenue Intelligence (DRI), and other regulatory bodies. We assist our clients in responding to investigations, defending against charges, negotiating settlements, and challenging regulatory orders in appellate tribunals and courts, drawing on our deep understanding of the relevant legislation and regulatory frameworks.",
          "International Commercial Arbitration: In an increasingly globalized world, international commercial disputes are becoming more common. Our firm provides robust representation in international commercial arbitration proceedings under various arbitration rules, such as the ICC Rules, the UNCITRAL Rules, and the SIAC Rules. We have extensive experience in enforcing arbitral awards in India and abroad, enabling our clients to effectively resolve cross-border disputes and protect their international business interests, relying on the provisions of the Arbitration and Conciliation Act, 1996.",
          "Banking and Finance Disputes: The financial sector faces unique legal challenges. We represent banks and other financial institutions in disputes with borrowers, guarantors, and other parties, handling cases involving loan recovery, mortgage foreclosures, enforcement of security interests, and other banking and finance-related matters. We have a deep understanding of banking regulations and lending practices, enabling us to provide effective and strategic legal representation to our clients in the financial sector, particularly in relation to the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002 (SARFAESI Act) and the Recovery of Debts Due to Banks and Financial Institutions Act, 1993 (RDDBFI Act)."
        ],
      "Documentation": [ // Kept as is, may need further content
          "Commercial Agreements and Contracts: We meticulously draft and review various agreements such as sale agreements, purchase agreements, service agreements, distribution agreements, franchise agreements, licensing agreements, and joint venture agreements. We ensure that these documents accurately reflect the intentions of the parties, comply with applicable laws, and minimize potential disputes, adhering to the principles of the Indian Contract Act, 1872.",
          "Shareholders' Agreements: These agreements govern the relationship between shareholders and the company, outlining the rights, responsibilities, and obligations of each party. We advise on key provisions such as voting rights, transfer restrictions, dividend policies, and dispute resolution mechanisms, ensuring compliance with the Companies Act, 2013.",
          "Joint Venture Agreements: Strategic alliances require carefully crafted joint venture agreements that define the scope of the venture, the contributions of each party, the management structure, and the profit-sharing arrangement. We ensure that these agreements are legally sound and protect our clients' interests, considering the provisions of the Indian Partnership Act, 1932 and other relevant legislation.",
          "Distribution Agreements: These agreements govern the distribution of goods or services through a network of distributors. We advise on key provisions such as territory restrictions, exclusivity rights, pricing policies, and termination clauses, ensuring compliance with competition law and other relevant regulations.",
          "Employment Contracts: Our skilled legal team drafts and reviews employment contracts that clearly define the terms and conditions of employment, protecting the interests of both the employer and the employee. We ensure compliance with applicable labor laws and regulations, including the Factories Act, 1948, the Minimum Wages Act, 1948, the Contract Labour (Regulation and Abolition) Act, 1970, and the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act).",
          "Non-Disclosure Agreements: We draft robust non-disclosure agreements (NDAs) to protect confidential information from unauthorized disclosure. These agreements are critical for safeguarding trade secrets, proprietary data, and other sensitive business information.",
          "Licensing Agreements: Our expertise extends to drafting and reviewing licensing agreements, which govern the use of intellectual property rights, such as patents, trademarks, and copyrights. We ensure that these agreements protect the licensor's rights and provide clear guidelines for the licensee's use of the intellectual property, ensuring compliance with the Copyright Act, 1957, the Trademarks Act, 1999, and the Patents Act, 1970.",
          "Corporate Policies and Procedures: We assist businesses in developing comprehensive corporate policies and procedures that promote ethical conduct, ensure compliance with laws and regulations, and mitigate risk. These policies cover areas such as anti-corruption, data protection, whistleblowing, conflict of interest, and prevention of sexual harassment (POSH), ensuring adherence to the principles of good corporate governance and compliance with the Companies Act, 2013 and the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.",
          "Supply Chain Agreements: We help businesses establish robust and legally sound relationships with their suppliers by drafting and reviewing supply chain agreements that outline key terms, responsibilities, and risk mitigation strategies.",
          "E-commerce Agreements: We specialize in creating clear and compliant agreements for online businesses, addressing issues such as terms of service, privacy policies, and online payment processing.",
          "Cloud Computing Agreements: Our legal team ensures that your cloud computing agreements with service providers are legally sound, addressing data security, liability, and service level agreements.",
          "Technology Licensing Agreements: We provide expert legal services for technology licensing, helping businesses protect and monetize their innovative solutions through effective licensing agreements."
      ],
    },
    serviceDetails: { // New section for accordion content - refined based on OCR and previous structure
        "Corporate Structuring and Restructuring" : "Navigating the complexities of choosing the correct business entity is critical for long-term success. Our expertise extends to advising on optimal legal structures, be it a sole proprietorship, partnership, private limited company, public limited company, or even a Limited Liability Partnership (LLP), ensuring compliance with the Companies Act, 2013. We meticulously consider factors like tax implications, liability exposure, capital requirements, and scalability to recommend the most suitable structure. Furthermore, we provide expert guidance on restructuring existing businesses to unlock greater operational efficiency, mitigate inherent risks, and pave the way for strategic expansion or corporate turnaround, always mindful of the provisions of the Insolvency and Bankruptcy Code, 2016 (IBC) where applicable. We also advise on cross-border restructuring involving Indian entities.", // Updated from OCR
        "Regulatory Compliance Consulting" : "The Indian business environment demands stringent adherence to a complex web of regulations. Our team provides unparalleled support in navigating this landscape, ensuring full compliance with key legislation such as the Companies Act, 2013, Securities and Exchange Board of India (SEBI) regulations, environmental protection statutes under the Environment (Protection) Act, 1986, labor laws such as the Factories Act, 1948 and the Minimum Wages Act, 1948, and sector-specific directives. We offer proactive monitoring of regulatory changes, conduct thorough compliance audits, and develop robust internal control mechanisms to minimize the risk of penalties or legal action. Our services cover critical aspects such as GST compliance, corporate social responsibility (CSR) as per Section 135 of the Companies Act, adherence to industry-specific standards, and compliance with regulations related to data privacy and cybersecurity.", // Updated from OCR
        "Due Diligence" : "Informed decision-making is paramount in today's business world. Our due diligence services provide a comprehensive assessment of legal, financial, and operational risks associated with mergers and acquisitions, investments, joint ventures, and other strategic transactions. We conduct thorough investigations, analyze key documents, and identify potential red flags, empowering our clients to make sound investment choices and negotiate favorable transaction terms. Our expertise encompasses legal due diligence, financial due diligence, environmental due diligence, intellectual property due diligence, and tax due diligence, ensuring compliance with all regulatory stipulations under applicable laws. We have significant experience in conducting due diligence for businesses in the IT, pharmaceutical, and manufacturing sectors.", // Updated from OCR
        "Contract Drafting and Review" : "Contracts are the bedrock of any successful business operation. Our skilled legal professionals meticulously draft, review, and negotiate a wide range of commercial contracts, ensuring that our clients' interests are protected, and their legal rights are clearly defined. We handle diverse agreements, encompassing sales agreements, supply agreements, distribution agreements, licensing agreements, service agreements, confidentiality agreements, e-commerce agreements, and cloud computing agreements. Our focus is on creating clear, unambiguous contracts that minimize the potential for disputes and ensure enforceability under Indian law, specifically the Indian Contract Act, 1872. We advise on crucial clauses like force majeure, dispute resolution mechanisms, termination clauses, and limitation of liability.",
        "Corporate Governance Advisory" : "Sound corporate governance is essential for building trust and ensuring long-term sustainability. We provide expert guidance to boards of directors and senior management on implementing best practices in corporate governance, promoting transparency, accountability, and ethical conduct. Our services encompass advising on board composition, committee structures, shareholder rights, internal controls, and compliance with the requirements of the Companies Act, 2013 and SEBI regulations. We assist in developing and implementing robust corporate governance policies and procedures, ensuring alignment with global best practices and addressing emerging issues such as ESG (Environmental, Social, and Governance) compliance. We also advise on director and officer liability insurance (D&O Insurance) and conduct related party transaction reviews to ensure fairness and transparency.", // Kept similar
        "Mergers and Acquisitions Planning" : "Navigating the complexities of mergers and acquisitions requires strategic legal counsel and meticulous execution. Our team provides end-to-end support throughout the M&A process, from initial negotiations to post-merger integration. We conduct thorough due diligence, structure the transaction to optimize tax efficiency, negotiate favorable terms, secure regulatory approvals, and seamlessly integrate the acquired business into the client's existing operations. Our services encompass share purchase agreements, asset purchase agreements, mergers, demergers, and slump sales, ensuring compliance with the Competition Act, 2002 where applicable. We have expertise in both domestic and cross-border M&A transactions, as well as representing clients in private equity and venture capital investments.", // Kept similar
        "Foreign Investment Advisory" : "Attracting foreign investment is crucial for economic growth, but navigating the intricacies of Indian regulations can be challenging. We provide comprehensive legal and regulatory advice to foreign companies seeking to invest in India, assisting with structuring investments, obtaining necessary approvals from the Reserve Bank of India (RBI) and other government agencies, and complying with Indian laws and regulations, including the Foreign Exchange Management Act (FEMA), 1999. We assist with setting up branch offices, liaison offices, project offices, and wholly owned subsidiaries, guiding clients through the maze of approvals and compliance requirements.",
        "Joint Venture Structuring" : "Strategic alliances can unlock significant growth opportunities but require careful structuring to ensure alignment of interests and mitigate potential risks. We assist businesses in forming joint ventures, drafting comprehensive joint venture agreements that clearly define the rights, responsibilities, and obligations of each party. Our services encompass advising on equity participation, profit sharing, management control, dispute resolution mechanisms, and exit strategies, ensuring compliance with relevant provisions of the Indian Partnership Act, 1932 and other relevant legislation.",// "Corporate Restructuring" merged into "Corporate Law Advisory" detail above.
    },
    expertiseHighlights: [
      { title: "Cross-Border M&A in Pharma", description: "Successfully advised a European pharmaceutical company on its acquisition of a significant stake in an Indian generic drug manufacturer, navigating complex regulatory hurdles." },
      { title: "Technology Startup Funding", description: "Assisted a fast-growing Indian tech startup in structuring and closing its Series B funding round from international venture capital firms." },
      { title: "NCLT Representation", description: "Effectively represented minority shareholders in an oppression and mismanagement case before the National Company Law Tribunal, securing favourable interim relief." },
    ],
    team: [ { name: "G.R. Hari", image: "https://picsum.photos/seed/grhari/100/100", position: "Senior Advocate" }, { name: "Advocate Name 1", image: "https://picsum.photos/seed/associateA/100/100", position: "Senior Associate" }], // Replace with actual team members
    relatedAreas: ["commercial-litigation", "tax-law", "employment-law", "regulatory-compliance"], // Use slugs
  },
  "personal-law": {
    name: "Personal Law",
    icon: User,
    introduction: "Law Chambers of G.R. Hari understands that personal legal matters require sensitivity, compassion, and a commitment to achieving the best possible outcome for our clients. We provide expert legal guidance and representation in a range of personal law matters, prioritizing your needs and protecting your rights. We are experienced in handling sensitive personal legal matters in Chennai and throughout Tamil Nadu, providing compassionate legal support and results-oriented advocacy. Whether you are facing a divorce, seeking child custody, or navigating complex personal legal issues, our dedicated team is here to guide you.",
     services: {
       "Marital Disputes": [
            "Divorce and Separation: We handle all aspects of divorce and separation proceedings, ensuring that your rights are protected, and your voice is heard. Our expertise covers: Contested Divorce: Representing clients in contested divorce proceedings, advocating for their rights and interests in matters of property division, alimony, and child custody, relying on provisions within the Hindu Marriage Act, 1955, the Dissolution of Muslim Marriages Act, 1939, the Indian Divorce Act, 1869 (for Christians), and the Special Marriage Act, 1954 (for inter-religious marriages).Mutual Consent Divorce: Assisting clients in preparing and filing the necessary paperwork for a mutual consent divorce, ensuring that the process is as smooth and efficient as possible. Our services include drafting divorce petitions, settlement agreements, and other required documents, adhering to the requirements of the relevant personal law.Judicial Separation: Advising clients on whether judicial separation is the right option for them and representing them in judicial separation proceedings under the applicable personal law.Annulment of Marriage: Advising clients on whether annulment is an option for them and representing them in annulment of marriage proceedings, demonstrating adherence to the legal requirements for annulment under relevant statutes.",
            "Child Custody and Visitation: We help parents secure their rights and protect their children's well-being in child custody and visitation matters.Guardianship Petitions: Assisting parents and other family members in seeking guardianship of children, ensuring that the children are properly cared for and protected under the Guardians and Wards Act, 1890 and the Hindu Minority and Guardianship Act, 1956 (where applicable).Child Abduction Matters: Representing parents in cases of child abduction, both within India and internationally, taking swift action to locate abducted children and return them to their rightful custody, utilizing legal remedies under Indian law and international conventions.Visitation Rights: Helping parents establish and enforce their visitation rights, ensuring that they have regular and meaningful contact with their children, creating visitation schedules that are in the best interests of the children",
            "Maintenance and Alimony: We fight for fair and just financial support for our clients in maintenance and alimony proceedings.Interim Maintenance: Assisting spouses in seeking interim maintenance during the pendency of divorce proceedings, ensuring that they have adequate financial support during this difficult time, based on provisions within the relevant personal law.Permanent Alimony: Representing clients in determining the appropriate amount of permanent alimony to be paid following a divorce, considering factors such as the length of the marriage and the financial resources of each party under the applicable personal law.Enforcement of Maintenance Orders: Assisting clients in enforcing maintenance orders, ensuring that they receive the financial support to which they are entitled under court orders, taking swift action to collect overdue maintenance payments.",
            "Property Division: We help clients divide their matrimonial assets fairly and equitably in divorce proceedings.Division of Matrimonial Assets: Assisting clients in dividing their matrimonial assets fairly and equitably, considering the contributions of each spouse to the marriage, including real estate, bank accounts, investments, and other assets, adhering to principles of fairness and equity under the relevant personal law.Dowry Claims: Representing clients in dowry claims, seeking to recover dowry that was given at the time of marriage in violation of the Dowry Prohibition Act, 1961.",
            "Domestic Violence: We provide compassionate and effective legal representation to victims of domestic violence, helping them to secure their safety and protect their rights under the Protection of Women from Domestic Violence Act, 2005.Protection Orders: Assisting victims of domestic violence in obtaining protection orders from the court, protecting them from further abuse.Compensation Claims: Representing victims of domestic violence in seeking compensation for their injuries and losses.Criminal Défense for False Allegations: Provide robust legal defence for individuals falsely accused of domestic violence, ensuring fair representation and protection of their rights.Assistance with Dowry Prohibition Act Cases: Provide robust legal support and representation in cases related to offences under the Dowry Prohibition Act 1961 for both the accused and the victim.Restitution of Conjugal Rights: We represent clients in seeking restitution of conjugal rights, attempting to restore their marital relationship through court intervention under the relevant personal law.",
            "NRI Divorces: We have specific expertise in handling divorces where one or both parties are Non-Resident Indians (NRIs), addressing jurisdictional issues, cross-border asset division, and other unique challenges.",
            "Mediation Services: Law Chambers of G.R. Hari offers mediation services to promote amicable settlement with or without court intervention to avoid heavy expenses during trial. Our legal experts also assist in drafting settlement agreement to make it legally valid and binding in a court of law."
       ],
       "Surrogacy": [
            "Legal Guidance & Agreements for Intended Parents: Eligibility Assessment under Surrogacy Act: We meticulously assess the eligibility of intended parents under the Surrogacy (Regulation) Act, 2021, ensuring compliance with all criteria related to marital status, medical conditions, and other requirements.Surrogacy Agreements (Drafting & Review): We draft and review surrogacy agreements to ensure that they are legally sound, ethical, and protect the rights and interests of both the intended parents and the surrogate mother, as per the provisions of the Surrogacy (Regulation) Act, 2021.Donor Agreements (Egg/Sperm): We prepare and review donor agreements for egg and sperm donation, addressing issues such as parental rights, confidentiality, and compensation, ensuring compliance with relevant ART (Assisted Reproductive Technology) guidelines.Legal Counselling on Surrogacy Options: We provide comprehensive legal counselling on the various surrogacy options available in India, including gestational surrogacy and traditional surrogacy, helping clients to make informed decisions based on their individual circumstances.Assistance with OCI (Overseas Citizen of India) related Surrogacy: We assist OCI cardholders with navigating the specific regulations and potential complexities relating to OCI status and surrogacy in India, ensuring compliance with immigration laws and citizenship requirements.",
            "Legal Guidance & Agreements for Surrogate Mothers: Surrogacy Agreements (Explanation & Review): We explain the terms of the surrogacy agreement to surrogate mothers, ensuring that they fully understand their rights and responsibilities before entering the arrangement.Legal Rights and Responsibilities Counselling: We provide legal counselling to surrogate mothers on their legal rights and responsibilities throughout the surrogacy process, ensuring their well-being and protecting them from exploitation.",
            "Assistance with Approvals and Permissions: Application for Parentage Orders: We assist intended parents in applying for parentage orders, legally recognizing them as the parents of the child born through surrogacy and ensuring that the child's birth certificate reflects their parentage.Assistance with Court Approvals: We assist clients in obtaining necessary court approvals for surrogacy arrangements, ensuring compliance with legal requirements and validating the surrogacy agreement.Compliance with Surrogacy Regulations: We ensure that all surrogacy arrangements comply with all applicable regulations under the Surrogacy (Regulation) Act, 2021, minimizing the risk of legal challenges.",
            "Post-Surrogacy Legal Services: Birth Certificate Assistance: We assist intended parents in obtaining a birth certificate for the child born through surrogacy, ensuring that their names are listed as the parents.Citizenship/Passport Assistance: We assist intended parents in obtaining citizenship and passports for the child born through surrogacy, ensuring that the child can travel internationally and obtain the necessary legal status.Adoption (if required): We assist intended parents in completing the adoption process, if required, to further secure their parental rights.",
       ],
       "Family Property Division": [
            "Law Chambers of G.R. Hari provides legal guidance and representation to families seeking to divide property and assets fairly and equitably, regardless of marital status. We assist with a range of issues, from inheritance disputes to partition suits, ensuring that your family's wealth is protected and managed effectively. Our experienced team understands the sensitive dynamics of family relationships and strives to achieve amicable and just outcomes.Partition Suits: Assisting family members in filing and defending partition suits to divide jointly owned property, ensuring compliance with the Partition Act, 1893 and relevant state laws.Declaration Suits: Seeking declarations of ownership rights in property, clarifying legal ownership and preventing future disputes through court decrees.Injunction Suits: Obtaining injunctions to prevent the illegal transfer or alienation of family property, protecting valuable assets from being improperly disposed of through court orders.Settlement Negotiations: Facilitating amicable settlements among family members to avoid protracted litigation, promoting cooperation and preserving family relationships through mediation and negotiation.Assistance in mutation of property records: Helping clients update property records to reflect changes in ownership, ensuring accurate and legally compliant documentation for all family property.Navigating ancestral property rights: Expert legal service pertaining to advise the clients on their and other family members individual shares on the ancestral property. This service adheres to respective laws regarding property rights.Tax Implications of Property Division: Provide expert advice on the tax implications of dividing family property, including capital gains tax and stamp duty, minimizing tax liabilities and maximizing financial benefits for our clients.Management of Joint Family Property (HUF): Advisory services related to the management and division of Hindu Undivided Family (HUF) property, ensuring compliance with relevant laws and regulations.",
            "Succession and Inheritance: Law Chambers of G.R. Hari provides expert legal guidance and representation in matters of succession and inheritance, helping clients navigate the complexities of transferring property and assets to their loved ones. We handle all aspects of estate planning, will drafting, probate, and inheritance disputes, ensuring that your wishes are respected, and your family's future is secure. Our expertise extends to all communities, including Hindus, Muslims, Christians, and others, with tailored advice based on their specific personal laws.Will Drafting and Execution: We assist clients in drafting valid and enforceable wills that accurately reflect their wishes for the distribution of their assets, minimizing the risk of disputes and ensuring that their loved ones are provided for.Probate and Administration of Estates: We assist executors and administrators in probating wills and administering estates, ensuring that assets are distributed in accordance with the law and the terms of the will, handling all legal and administrative tasks efficiently and effectively.Intestate Succession: We advise clients on the laws of intestate succession, which govern the distribution of property when a person dies without a valid will, helping them understand their rights and entitlements under the law.Inheritance Disputes: We represent clients in inheritance disputes, including challenges to wills, claims of undue influence, and disputes over the distribution of assets, advocating for their rights and seeking a fair and just resolution in courts.Estate Planning: We provide comprehensive estate planning services, including drafting wills, trusts, and other documents to minimize taxes and ensure the smooth transfer of assets to future generations, protecting your family's wealth and security.Muslim Law of Inheritance: Advising on inheritance as per Muslim personal law, ensuring compliance with Sharia principles and protecting the rights of heirs under the Muslim Personal Law (Shariat) Application Act, 1937.Hindu Law of Inheritance: Advising on inheritance as per Hindu personal law, ensuring compliance with the Hindu Succession Act, 1956 and protecting the rights of heirs.Christian Law of Inheritance: Advising on inheritance as per Christian personal law, ensuring compliance with the Indian Succession Act, 1925 and protecting the rights of heirs.Property Partition Suits: Provide effective resolution of property disputes and family feuds regarding the distribution of assets among family members.Legal Heir Certificate: Help with the process of acquiring the appropriate Legal Heir Certificate",
            "Adoption: Law Chambers of G.R. Hari is dedicated to assisting individuals and families through the often complex and emotionally sensitive process of adoption. We provide expert legal guidance and support at every stage, ensuring compliance with all applicable laws and regulations and helping you build your family with love and security. We handle all types of adoption cases in India, providing compassionate and professional service.Legal Guidance on Adoption Procedures: We provide comprehensive legal guidance on the adoption process in India, explaining the eligibility criteria, documentation requirements, and procedural steps involved under the Juvenile Justice (Care and Protection of Children) Act, 2015 and the Adoption Regulations, 2022. We help you understand your rights and obligations as prospective adoptive parents, ensuring a smooth and ethical process.Inter-Country Adoption: Guidance on the complex legal requirements for adopting children from other countries, ensuring compliance with both Indian and international laws, including the Hague Convention on Intercountry Adoption (if applicable). We assist with preparing and filing the necessary paperwork, navigating immigration procedures, and ensuring a smooth transition for the child into your family, fulfilling all regulatory requirements.Adoption of Special Needs Children: Support and expertise in navigating the specific challenges and requirements involved in adopting children with special needs. We connect you with resources and support services and ensure that the adoption process is in the best interests of the child.* Representation Before the Courts: We represent prospective adoptive parents in court proceedings related to adoption, advocating for their rights and ensuring that the adoption process is handled fairly and efficiently.Liaison with Adoption Agencies: We assist clients in working with recognized adoption agencies in India, facilitating communication and ensuring compliance with agency procedures, supporting you in every step of the process.",
            "Post-Adoption Legal Services: We provide ongoing legal support after the adoption is finalized, addressing any legal issues that may arise and ensuring the long-term well-being of the child.",
            "Name Change and Gender Affirmation: Law Chambers of G.R. Hari recognizes the importance of legal recognition of identity and is committed to providing sensitive and expert legal assistance to individuals seeking to affirm their identity through name change and gender affirmation. We understand the unique challenges faced by transgender and gender-nonconforming individuals and are dedicated to protecting their rights and dignity. We offer compassionate and knowledgeable legal services for name change and gender marker change in accordance with Indian law.Legal Guidance on Name Change Procedures: We provide comprehensive *legal guidance* on the procedures for *changing your name* in India, including preparing *affidavits*, publishing notices in newspapers as per the guidelines, and obtaining *gazette notifications*. Our lawyers are knowledgeable in all aspects of procedures that are to be followed according to the current law, ensuring a smooth and legally compliant process.Assistance with Gender Affirmation: We assist *transgender* and *gender-nonconforming individuals* with the *legal processes* involved in changing their *gender* on official documents, including *birth certificates, Aadhar cards, PAN cards, passports*, and *educational certificates*. We help you navigate the complex requirements of the **Transgender Persons (Protection of Rights) Act, 2019** and other relevant laws, providing support and advocacy throughout the process.Representation in Court Proceedings: If necessary, we represent clients in *court proceedings* related to *name change* or *gender affirmation*, advocating for their rights and ensuring a smooth and respectful process.",
            "Mental Health Law: Law Chambers of G.R. Hari provides compassionate and knowledgeable legal assistance to individuals and families dealing with mental health issues, ensuring that their rights are protected, and their well-being is prioritized. We understand the sensitive nature of these matters and are dedicated to providing supportive and effective legal representation for individuals with mental illness and their families. Guardianship for Individuals with Mental Illness: Assisting families in obtaining guardianship for individuals with mental illness who are unable to make decisions for themselves, ensuring their well-being and protecting their rights under the Mental Healthcare Act, 2017. This includes preparing and filing petitions, representing clients in court proceedings, and ensuring that the guardianship order is in the best interests of the individual, providing ongoing support and advocacy.Assistance with Mental Health Act Compliance: Providing guidance on complying with the provisions of the Mental Healthcare Act, 2017, including issues related to admission, treatment, and discharge of individuals with mental illness. We help ensure compliance with patient rights, confidentiality requirements, and other legal obligations under the Act, advocating for their access to appropriate care and treatment."
       ],
     },
    serviceDetails: {
        "Divorce and Separation" : "We handle all aspects of divorce and separation proceedings, ensuring that your rights are protected, and your voice is heard. Our expertise covers: Contested Divorce: Representing clients in contested divorce proceedings, advocating for their rights and interests in matters of property division, alimony, and child custody, relying on provisions within the Hindu Marriage Act, 1955, the Dissolution of Muslim Marriages Act, 1939, the Indian Divorce Act, 1869 (for Christians), and the Special Marriage Act, 1954 (for inter-religious marriages).Mutual Consent Divorce: Assisting clients in preparing and filing the necessary paperwork for a mutual consent divorce, ensuring that the process is as smooth and efficient as possible. Our services include drafting divorce petitions, settlement agreements, and other required documents, adhering to the requirements of the relevant personal law.Judicial Separation: Advising clients on whether judicial separation is the right option for them and representing them in judicial separation proceedings under the applicable personal law.Annulment of Marriage: Advising clients on whether annulment is an option for them and representing them in annulment of marriage proceedings, demonstrating adherence to the legal requirements for annulment under relevant statutes.",
        "Child Custody and Visitation" : "We help parents secure their rights and protect their children's well-being in child custody and visitation matters.Guardianship Petitions: Assisting parents and other family members in seeking guardianship of children, ensuring that the children are properly cared for and protected under the Guardians and Wards Act, 1890 and the Hindu Minority and Guardianship Act, 1956 (where applicable).Child Abduction Matters: Representing parents in cases of child abduction, both within India and internationally, taking swift action to locate abducted children and return them to their rightful custody, utilizing legal remedies under Indian law and international conventions.Visitation Rights: Helping parents establish and enforce their visitation rights, ensuring that they have regular and meaningful contact with their children, creating visitation schedules that are in the best interests of the children",
        "Maintenance and Alimony" : "We fight for fair and just financial support for our clients in maintenance and alimony proceedings.Interim Maintenance: Assisting spouses in seeking interim maintenance during the pendency of divorce proceedings, ensuring that they have adequate financial support during this difficult time, based on provisions within the relevant personal law.Permanent Alimony: Representing clients in determining the appropriate amount of permanent alimony to be paid following a divorce, considering factors such as the length of the marriage and the financial resources of each party under the applicable personal law.Enforcement of Maintenance Orders: Assisting clients in enforcing maintenance orders, ensuring that they receive the financial support to which they are entitled under court orders, taking swift action to collect overdue maintenance payments.",
        "Property Division" : "We help clients divide their matrimonial assets fairly and equitably in divorce proceedings.Division of Matrimonial Assets: Assisting clients in dividing their matrimonial assets fairly and equitably, considering the contributions of each spouse to the marriage, including real estate, bank accounts, investments, and other assets, adhering to principles of fairness and equity under the relevant personal law.Dowry Claims: Representing clients in dowry claims, seeking to recover dowry that was given at the time of marriage in violation of the Dowry Prohibition Act, 1961.",
        "Domestic Violence" : "We provide compassionate and effective legal representation to victims of domestic violence, helping them to secure their safety and protect their rights under the Protection of Women from Domestic Violence Act, 2005.Protection Orders: Assisting victims of domestic violence in obtaining protection orders from the court, protecting them from further abuse.Compensation Claims: Representing victims of domestic violence in seeking compensation for their injuries and losses.Criminal Défense for False Allegations: Provide robust legal defence for individuals falsely accused of domestic violence, ensuring fair representation and protection of their rights.Assistance with Dowry Prohibition Act Cases: Provide robust legal support and representation in cases related to offences under the Dowry Prohibition Act 1961 for both the accused and the victim.Restitution of Conjugal Rights: We represent clients in seeking restitution of conjugal rights, attempting to restore their marital relationship through court intervention under the relevant personal law.",
        "NRI Divorces" : "We have specific expertise in handling divorces where one or both parties are Non-Resident Indians (NRIs), addressing jurisdictional issues, cross-border asset division, and other unique challenges.",
        "Mediation Services" : "Law Chambers of G.R. Hari offers mediation services to promote amicable settlement with or without court intervention to avoid heavy expenses during trial. Our legal experts also assist in drafting settlement agreement to make it legally valid and binding in a court of law."
    },
    expertiseHighlights: [
      { title: "High-Stake Infrastructure Arbitration", description: "Secured a multi-million dollar award for an international construction company in a complex arbitration concerning a major infrastructure project in India." },
      { title: "Successful IBC Representation", description: "Successfully represented a consortium of financial creditors in the Corporate Insolvency Resolution Process (CIRP) of a major manufacturing company, leading to a favorable resolution plan." },
      { title: "Supreme Court Injunction", description: "Obtained a crucial injunction from the Supreme Court of India, protecting our client's intellectual property rights in a landmark case." },
    ],
     team: [ { name: "G.R. Hari", image: "https://picsum.photos/seed/grhari/100/100", position: "Senior Advocate" }, { name: "Advocate Name 2", image: "https://picsum.photos/seed/associateB/100/100", position: "Associate" }], // Replace
    relatedAreas: ["personal-law"], // Use slugs
  },
  "youtube-takedown-services": {
    name: "YouTube Takedown Services",
    icon: YoutubeIcon,
    introduction: "Whether you're a copyright owner protecting your intellectual property or a content creator responding to a takedown, our YouTube Takedown Services provide expert support on both sides of the copyright equation.",
     services: {
       "For Copyright Owners": [
            "DMCA Takedown Notices: Preparing and sending Digital Millennium Copyright Act (DMCA) takedown notices to YouTube to remove infringing content.",
            "Copyright Infringement Monitoring: Actively monitoring YouTube for unauthorized uses of your copyrighted material and sending takedown notices as needed.",
            "Counter-Notification Assistance: Helping you respond to counter-notifications from users who believe their content was wrongly taken down.",
            "Negotiating Licenses: Assisting you in negotiating licenses with YouTube users who wish to use your copyrighted material legally.",
            "YouTube Content ID System: Helping you enroll in YouTube's Content ID system to automatically identify and monetize your copyrighted content."
       ],
       "For YouTube Content Creators (Defendants)": [
            "Evaluating the Claim: Determining whether the copyright claim is valid and whether your content is infringing.",
            "Fair Use Analysis: Assessing whether your use of the copyrighted material qualifies as 'fair use' under copyright law.",
            "Preparing Counter-Notifications: Preparing and submitting counter-notifications to YouTube, arguing that your content does not infringe or that your use is permitted under fair use principles.",
            "Negotiating with Copyright Holders: Assisting you in negotiating with copyright holders to resolve the dispute and get your content reinstated.",
            "Defending Against Copyright Infringement Lawsuits: If a copyright holder sues you for infringement, we will provide a vigorous defense, protecting your rights and minimizing your liability."
       ],
     },
    serviceDetails: {
        "DMCA Takedown Notices" : "Preparing and sending Digital Millennium Copyright Act (DMCA) takedown notices to YouTube to remove infringing content.",
        "Copyright Infringement Monitoring" : "Actively monitoring YouTube for unauthorized uses of your copyrighted material and sending takedown notices as needed.",
        "Counter-Notification Assistance" : "Helping you respond to counter-notifications from users who believe their content was wrongly taken down.",
        "Negotiating Licenses" : "Assisting you in negotiating licenses with YouTube users who wish to use your copyrighted material legally.",
        "YouTube Content ID System" : "Helping you enroll in YouTube's Content ID system to automatically identify and monetize your copyrighted content.",
        "Evaluating the Claim" : "Determining whether the copyright claim is valid and whether your content is infringing.",
        "Fair Use Analysis" : "Assessing whether your use of the copyrighted material qualifies as 'fair use' under copyright law.",
        "Preparing Counter-Notifications" : "Preparing and submitting counter-notifications to YouTube, arguing that your content does not infringe or that your use is permitted under fair use principles.",
        "Negotiating with Copyright Holders" : "Assisting you in negotiating with copyright holders to resolve the dispute and get your content reinstated.",
        "Defending Against Copyright Infringement Lawsuits" : "If a copyright holder sues you for infringement, we will provide a vigorous defense, protecting your rights and minimizing your liability."
    },
    expertiseHighlights: [
      { title: "High-Stake Infrastructure Arbitration", description: "Secured a multi-million dollar award for an international construction company in a complex arbitration concerning a major infrastructure project in India." },
      { title: "Successful IBC Representation", description: "Successfully represented a consortium of financial creditors in the Corporate Insolvency Resolution Process (CIRP) of a major manufacturing company, leading to a favorable resolution plan." },
      { title: "Supreme Court Injunction", description: "Obtained a crucial injunction from the Supreme Court of India, protecting our client's intellectual property rights in a landmark case." },
    ],
     team: [ { name: "G.R. Hari", image: "https://picsum.photos/seed/grhari/100/100", position: "Senior Advocate" }, { name: "Advocate Name 2", image: "https://picsum.photos/seed/associateB/100/100", position: "Associate" }], // Replace
    relatedAreas: ["youtube-takedown-services", "youtube-services"], // Use slugs
  },
   // --- Placeholder Data for other areas (Expand with actual content) ---
   "intellectual-property": {
      name: "Intellectual Property",
      icon: Brain,
      introduction: "Law Chambers of G.R. Hari provides strategic and comprehensive legal services to protect and enforce your intellectual property rights in India and internationally. We understand the critical importance of trademarks, patents, copyrights, designs, and trade secrets in today's competitive marketplace. Our team of experienced IP attorneys assists clients in securing, managing, and commercializing their valuable IP assets, safeguarding their brand identity and fostering innovation. We handle all aspects of IP protection, IP enforcement, IP litigation, and IP commercialization, ensuring that your innovations and brand identity are safeguarded. We specialize in navigating the intricacies of the Trademarks Act, 1999, the Copyright Act, 1957, the Patents Act, 1970, and the Designs Act, 2000, as well as international IP treaties and conventions.",
      services: {
         "Advisory Services": [
            "IP Strategy Development: We work closely with clients to develop comprehensive IP strategies that align with their business goals. This includes identifying key IP assets, assessing risks and opportunities, and developing a plan for protecting and commercializing those assets. Our strategic approach considers both Indian IP law and international best practices.", 
            "Patent Availability Analysis (Patentability Search): Before investing in the patent process, it's crucial to determine if your invention is novel and non-obvious. We conduct thorough patentability searches using advanced databases and search techniques to assess the likelihood of obtaining a patent under the Patents Act, 1970.", 
            "Freedom to Operate (FTO) Search: This search helps determine whether your product or process infringes upon existing patents. An FTO search is crucial before launching a new product or service to minimize the risk of patent infringement lawsuits. We provide detailed FTO reports, analyzing the potential risks and providing strategies for mitigating them.", 
            "Trademark Availability Search: Before adopting a new trademark, it's essential to ensure that it is available and does not infringe upon existing trademarks. We conduct comprehensive trademark searches using the Indian Trademark Registry database and international databases to identify any potential conflicts and assess the registrability of the mark under the Trademarks Act, 1999.",
            "Copyright Protection Strategy: We advise clients on strategies for protecting their creative works, including literary works, musical works, artistic works, and software. This includes advising on copyright registration with the Indian Copyright Office, fair use, and copyright infringement issues under the Copyright Act, 1957. We also advise on digital rights management (DRM) strategies to protect online content.",
            "Trade Secret Protection Planning: Trade secrets can be an asset, but they require careful protection. We help clients develop and implement trade secret protection plans, including confidentiality agreements, employee training, and security measures, complying with common law principles and contractual obligations regarding trade secret protection.",
            "IP Portfolio Management: Managing a portfolio of IP assets can be complex. We provide ongoing support to help clients manage their IP portfolios effectively, including monitoring deadlines, renewing registrations, and enforcing their IP rights. We use sophisticated IP management software to track and manage our clients' IP assets.",
            "Licensing Strategy: We advise clients on licensing their IP assets to generate revenue and expand their market reach. This includes negotiating license agreements, drafting license agreements, and enforcing license agreements. Our licensing strategies are tailored to each client's specific business goals.",
            "IP Valuation Consultation: Understanding the value of your IP assets is essential for strategic decision-making. We provide IP valuation services to help clients determine the fair market value of their IP assets for licensing, sale, or investment purposes.",
            "Franchising Advice: As franchising involves the licensing of trademarks, know-how and other intellectual property, we advise on the structuring and documentation of franchise agreements to protect the brand and ensure compliance.",
            "IP Audit and Valuation: Conduct comprehensive audits of your IP assets and provide valuations for strategic decision-making or transactions, helping you understand the true worth of your intellectual property.",
            "IP Commercialization: Develop strategies for monetizing your IP assets through licensing, sales, or other means, maximizing the return on your IP investment.",
            "Due Diligence (IP assets in M&A): Performing due diligence on intellectual property assets to ensure compliance and assess their value in mergers and acquisitions.",
            "Contract Review and Negotiation: Reviewing lease agreements, land purchase documents, and project development agreements, ensuring they're favorable to your interests, particularly concerning long-term access and operational rights. G.R. Hari, Advocate, has successfully advised several renewable energy companies on land acquisition and regulatory compliance in Karnataka and Tamil Nadu.",
        ],
         "Prosecution and Registration:": [
            "Patent Prosecution and Filing (India & International): We assist clients with preparing and filing patent applications in India and internationally, complying with the Patents Act, 1970 and the Patent Cooperation Treaty (PCT). This includes drafting patent specifications, responding to office actions, and prosecuting the patent application to grant.", 
            "Trademark Prosecution and Registration (India & International): We assist clients with selecting, clearing, and registering trademarks in India and internationally, complying with the Trademarks Act, 1999 and the Madrid Protocol. This includes conducting trademark searches, preparing and filing trademark applications, and responding to office actions.", 
            "Copyright Registration: We assist clients with registering their copyrights with the Indian Copyright Office, protecting their creative works under the Copyright Act, 1957.", 
            "Design Registration: We assist clients with registering their industrial designs with the Indian Designs Office, protecting the ornamental or aesthetic aspects of their products under the Designs Act, 2000.",
            "Geographical Indication (GI) Registration: We assist clients with registering geographical indications (GIs), which are used to identify products that originate from a specific region and have a unique quality or reputation, complying with the Geographical Indications of Goods (Registration and Protection) Act, 1999.",
            "Plant Variety Protection: Assisting breeders in obtaining protection for new plant varieties under the Protection of Plant Varieties and Farmers' Rights Act, 2001.",
            "Trade Dress Registration: We help clients protect their unique visual appearance of a product or its packaging through trade dress registration, enhancing brand recognition and preventing imitation.",
            "Semiconductor Integrated Circuits Layout Design Registration: We assist clients in registering their Semiconductor Integrated Circuits Layout Design with the respective authority, protecting their unique designs under the Semiconductor Integrated Circuits Layout-Design Act, 2000.",
        ],
         "Enforcement & Litigation": [
            "Patent Infringement Actions: We represent clients in patent infringement lawsuits, both as plaintiffs (patent holders) and defendants (alleged infringers). This is a complex process governed by the Patents Act, 1970 and the Code of Civil Procedure, 1908.", 
            "Infringement Analysis: Conducting a thorough analysis of the allegedly infringing product or process to determine whether it infringes the claims of the patent. This requires a deep understanding of both the patented technology and the infringing technology.", 
            "Claim Construction (Interpretation): This is a crucial step in patent litigation, where the court determines the meaning and scope of the patent claims. We present persuasive arguments to the court to ensure that the claims are interpreted in a way that supports our client's case.", 
            "Evidence Gathering: Gathering evidence of infringement, which may include technical documents, expert testimony, and evidence of sales and marketing activities. We work with technical experts to analyze the infringing product or process and provide expert testimony.",
            "Pleadings and Motions: Preparing and filing all necessary pleadings and motions, including the plaint, written statement, injunction applications, and other court documents. We ensure that all documents are well-researched, clearly written, and persuasive.",
            "Injunctions: Seeking injunctions to prevent the alleged infringer from continuing to infringe the patent during the litigation process (interim injunction) and permanently after a finding of infringement (permanent injunction).",
            "Damages Assessment: Assessing the damages caused by the infringement. This may include lost profits, reasonable royalties, and other damages. We work with financial experts to quantify the damages.",
            "Settlement Negotiations: Attempting to negotiate a settlement with the opposing party to resolve the dispute without going to trial. We are skilled negotiators and strive to achieve the best possible settlement for our clients.",
            "Trial and Appeal: If a settlement cannot be reached, we are prepared to litigate the case at trial and on appeal, presenting our client's case effectively and persuasively to the court.",
            "Validity Challenges: Preparing to defend from actions by the defendant to revoke or invalidate the patent.",
            "Trademark Opposition Proceedings: We represent clients in trademark opposition proceedings before the Indian Trademark Registry. This includes preparing and filing oppositions, gathering evidence, and arguing the case before the Trademark Registry, relying on the provisions of the Trademarks Act, 1999.",
            "Trademark Rectification Actions: We represent clients in trademark rectification actions before the Intellectual Property Appellate Board (IPAB) to remove improperly registered trademarks. This includes challenging the validity of existing trademarks and seeking their removal from the register.",
            "Copyright Infringement Cases: We represent clients in copyright infringement lawsuits, both as plaintiffs and defendants. This includes investigating infringement, preparing pleadings, conducting discovery, and litigating the case at trial and on appeal, ensuring compliance with the Copyright Act, 1957 and relevant case law.",
            "Trade Secret Misappropriation: We represent clients in trade secret misappropriation cases, protecting their confidential information from unauthorized use or disclosure. This includes investigating misappropriation, preparing pleadings, conducting discovery, and litigating the case at trial and on appeal.",
            "Domain Name Disputes: We represent clients in domain name disputes, including proceedings before the World Intellectual Property Organization (WIPO) under the Uniform Domain Name Dispute Resolution Policy (UDRP) and proceedings before Indian courts under the Information Technology Act, 2000. Our services include: Filing UDRP complaints: We prepare and file UDRP complaints with WIPO to recover domain names that have been registered in bad faith.Defending against UDRP complaints: We defend clients against UDRP complaints, protecting their legitimate domain name registrations.Domain Name Recovery in India: Pursuing litigation in Indian Courts to recover domain names, in addition to UDRP proceedings.",
            "IP Licensing Disputes: We represent clients in IP licensing disputes, including breach of contract claims, royalty disputes, and termination disputes. Our expertise in IP law and contract law enables us to achieve favorable outcomes for our clients.",
            "Unfair Competition Matters: We represent clients in unfair competition cases, including passing off, false advertising, and other deceptive business practices. We work to protect our clients' brand reputation and prevent unfair competition.",
            "Customs Recordal and Enforcement: We assist clients with recording their trademarks and copyrights with Indian Customs to prevent the importation of counterfeit goods. We also assist with enforcing IP rights at the border, working with customs officials to seize infringing goods.",
            "Anti-Counterfeiting Measures: Developing and implementing anti-counterfeiting strategies to combat the production and sale of fake goods, including online monitoring and investigations.",
            "Border Enforcement: Working with customs officials to seize counterfeit goods at the border, preventing their entry into the Indian market.",
            "Passing Off Actions: We represent businesses in passing off actions, where a competitor is misrepresenting their goods or services as those of our client, protecting their brand reputation and goodwill.",
            "Threats Proceedings: We advise and represent clients who are facing threats of intellectual property infringement, ensuring their rights are protected and preventing baseless claims from harming their business.",
            "Online Brand Protection: Monitoring and enforcing intellectual property rights in the online marketplace, including taking down infringing content on websites, social media platforms, and e-commerce sites."
        ],
        "Documentation & Agreements": [
          "IP Assignment Agreements: We draft and review IP assignment agreements, which transfer ownership of IP rights from one party to another.",
          "Licensing Agreements: We draft and review IP licensing agreements, which grant another party the right to use your IP rights under certain terms and conditions.",
          "Technology Transfer Agreements: We draft and review technology transfer agreements, which transfer technology from one party to another, ensuring compliance with relevant regulations and protecting valuable innovations.",
          "Non-disclosure Agreements (NDAs): We draft and review non-disclosure agreements (NDAs) to protect confidential information shared during business negotiations, collaborations, or employment relationships. These agreements are essential for safeguarding trade secrets and other proprietary information.",
          "IP security Agreements: We draft and review IP security agreements, which grant a security interest in IP rights to a lender as collateral for a loan. These agreements are often used in financing transactions involving IP assets.",
          "Franchise Agreements: We provide comprehensive legal support for franchising, including drafting and reviewing franchise agreements to ensure compliance with Indian franchise law and protect the franchisor's brand and intellectual property.",
          "Co-existence Agreements: When similar trademarks are in use, we negotiate and draft co-existence agreements to define the boundaries of each party's rights, minimizing the risk of future trademark disputes.",
          "Material Transfer Agreements (MTAs): We draft and review Material Transfer Agreements (MTAs) for the transfer of research materials, ensuring proper handling and use of the materials and protecting any associated intellectual property.",
          "Software Development Agreements: We provide legal support for software development projects, including drafting and reviewing agreements that protect the intellectual property rights in the software and address key issues such as ownership, licensing, and confidentiality."
        ]
      },
      serviceDetails: {
        "IP Strategy Development" : "We work closely with clients to develop comprehensive IP strategies that align with their business goals. This includes identifying key IP assets, assessing risks and opportunities, and developing a plan for protecting and commercializing those assets. Our strategic approach considers both Indian IP law and international best practices.", 
        "Patent Availability Analysis (Patentability Search)" : "Before investing in the patent process, it's crucial to determine if your invention is novel and non-obvious. We conduct thorough patentability searches using advanced databases and search techniques to assess the likelihood of obtaining a patent under the Patents Act, 1970.", 
        "Freedom to Operate (FTO) Search" : "This search helps determine whether your product or process infringes upon existing patents. An FTO search is crucial before launching a new product or service to minimize the risk of patent infringement lawsuits. We provide detailed FTO reports, analyzing the potential risks and providing strategies for mitigating them.", 
        "Trademark Availability Search" : "Before adopting a new trademark, it's essential to ensure that it is available and does not infringe upon existing trademarks. We conduct comprehensive trademark searches using the Indian Trademark Registry database and international databases to identify any potential conflicts and assess the registrability of the mark under the Trademarks Act, 1999.",
        "Copyright Protection Strategy": "We advise clients on strategies for protecting their creative works, including literary works, musical works, artistic works, and software. This includes advising on copyright registration with the Indian Copyright Office, fair use, and copyright infringement issues under the Copyright Act, 1957. We also advise on digital rights management (DRM) strategies to protect online content.",
        "Trade Secret Protection Planning" : "Trade secrets can be an asset, but they require careful protection. We help clients develop and implement trade secret protection plans, including confidentiality agreements, employee training, and security measures, complying with common law principles and contractual obligations regarding trade secret protection.",
        "IP Portfolio Management" : "Managing a portfolio of IP assets can be complex. We provide ongoing support to help clients manage their IP portfolios effectively, including monitoring deadlines, renewing registrations, and enforcing their IP rights. We use sophisticated IP management software to track and manage our clients' IP assets.",
        "Licensing Strategy" : "We advise clients on licensing their IP assets to generate revenue and expand their market reach. This includes negotiating license agreements, drafting license agreements, and enforcing license agreements. Our licensing strategies are tailored to each client's specific business goals.",
        "IP Valuation Consultation" : "Understanding the value of your IP assets is essential for strategic decision-making. We provide IP valuation services to help clients determine the fair market value of their IP assets for licensing, sale, or investment purposes.",
        "Franchising Advice" : "As franchising involves the licensing of trademarks, know-how and other intellectual property, we advise on the structuring and documentation of franchise agreements to protect the brand and ensure compliance.",
        "IP Audit and Valuation" : "Conduct comprehensive audits of your IP assets and provide valuations for strategic decision-making or transactions, helping you understand the true worth of your intellectual property.",
        "IP Commercialization" : "Develop strategies for monetizing your IP assets through licensing, sales, or other means, maximizing the return on your IP investment.",
        "Due Diligence (IP assets in M&A)" : "Performing due diligence on intellectual property assets to ensure compliance and assess their value in mergers and acquisitions.",
        "Contract Review and Negotiation" : "Reviewing lease agreements, land purchase documents, and project development agreements, ensuring they're favorable to your interests, particularly concerning long-term access and operational rights. G.R. Hari, Advocate, has successfully advised several renewable energy companies on land acquisition and regulatory compliance in Karnataka and Tamil Nadu.",
      },
      expertiseHighlights: [
         { title: "Successful Trademark Litigation", description: "Secured a permanent injunction against a major competitor for trademark infringement in the FMCG sector."},
         { title: "Patent Portfolio Management", description: "Developed and currently managing the global patent portfolio for a leading Indian technology company."},
      ],
      team: [{ name: "Advocate Name 2", image: "https://picsum.photos/seed/associateB/100/100", position: "Associate" }], // Replace
      relatedAreas: ["intellectual-property", "intellectual-law", "regulatory-compliance"]
   },
   "real-estate-law": {
      name: "Real Estate Law",
      icon: Building,
      introduction: "Navigating the complexities of real estate transactions, development, and regulations in India. We advise developers, investors, corporations, and individuals on all aspects of property law.",
      services: {
         "Advisory Services": [
            "Title investigation and verification: Our team conducts thorough title investigations to verify ownership and identify any encumbrances or legal issues that may affect the property. We meticulously examine all relevant records, including sale deeds, mortgage documents, revenue records, and court orders, ensuring that our clients have clear and marketable title to their property under the Transfer of Property Act, 1882 and the Tamil Nadu Patta Passbook Act, 1983. Our title investigation services are essential for minimizing risk in property transactions.", 
            "Property documentation review: We review all types of property documentation, including sale agreements, lease agreements, mortgage documents, building plans, power of attorney, and succession certificates, to ensure that they are legally sound and protect our clients' interests. Our meticulous documentation review services help our clients avoid potential disputes and ensure compliance with all applicable laws and regulations, including the Registration Act, 1908 and the Stamp Act. We pay particular attention to clauses related to transfer of property, easements, and covenants.", 
            "Development project structuring: We advise developers on structuring real estate development projects to maximize profitability and minimize risk. Our services include advising on land acquisition, financing, regulatory approvals, and construction contracts. We help our clients navigate the complexities of real estate development and ensure that their projects are successful. This includes advising on compliance with local planning regulations under the Tamil Nadu Town and Country Planning Act, 1971.", 
            "Real estate investment advisory: We provide legal advice to investors on all aspects of real estate investment, including property selection, financing, and management. Our services include conducting due diligence, reviewing investment agreements, and advising on tax implications. We help our clients make informed investment decisions and achieve their real estate investment goals. We also advise compliance with the Benami Transactions (Prohibition) Act, 1988 to ensure legitimacy of investments.",
            "Joint development consulting: We assist landowners and developers in structuring joint development projects to maximize their returns and minimize their risks. Our services include drafting joint development agreements, advising on profit sharing arrangements, and assisting with regulatory approvals. We help our clients navigate the complexities of joint development projects and ensure that their interests are protected, adhering to the principles of the Indian Contract Act, 1872 and ensuring equitable distribution of rights and responsibilities.",
            "RERA compliance advisory: We advise developers and buyers on compliance with the Real Estate (Regulation and Development) Act, 2016 (RERA). Our services include assisting with project registration, drafting sale agreements that comply with RERA requirements, and representing clients in RERA proceedings before the Tamil Nadu Real Estate Regulatory Authority (TNRERA). We help our clients navigate the complexities of RERA and ensure compliance with all applicable regulations, including those related to project timelines, disclosures, and dispute resolution. G.R. Hari, Advocate, has extensive experience in representing clients in RERA-related matters, providing expert guidance on compliance and dispute resolution.",
            "Land use and zoning consultation: We provide legal advice on land use and zoning regulations, helping our clients understand the restrictions and opportunities associated with their property. Our services include advising on zoning approvals, obtaining variances, and challenging zoning decisions. We help our clients maximize the value of their property and ensure compliance with all applicable land use regulations under the Tamil Nadu Town and Country Planning Act, 1971.",
            "Due diligence for property transactions: We conduct thorough due diligence investigations for property transactions, including title searches, property inspections, and environmental assessments. Our due diligence reports provide our clients with a comprehensive assessment of the risks and opportunities associated with the transaction. We help our clients make informed decisions and avoid costly mistakes, examining compliance with all relevant laws including the Transfer of Property Act, 1882, the Registration Act, 1908, and local regulations.",
            "Real Estate Due Diligence for Renewable Energy (Karnataka & Tamil Nadu): The renewable energy sector in Karnataka and Tamil Nadu presents exciting opportunities but also demands thorough real estate due diligence to secure project success. Our law firm's dedicated team specializes in identifying land-related risks and complexities for solar, wind, and other renewable energy ventures within these states. This includes:",
            "Thorough Title Examination: We meticulously investigate land ownership records, verifying clear title and identifying any encumbrances, easements, or local restrictions that could impede project development, ensuring compliance with state-specific land revenue codes.",
            "Land Use and Zoning: Our deep understanding of regulations in Karnataka and Tamil Nadu helps verify proper zoning for renewable energy projects, securing necessary permits and ensuring long-term compliance with local planning authorities and regulations.",
            "Environmental Considerations: We carefully examine potential environmental liabilities, past land usage, and ecological sensitivities to mitigate risks and ensure compliance with environmental regulations under the Environment (Protection) Act, 1986.",
            "Community and Stakeholder Engagement: Identifying local stakeholders, potential conflicts, and strategies for building strong community relationships are essential for smooth project execution.",
            "Contract Review and Negotiation: Reviewing lease agreements, land purchase documents, and project development agreements, ensuring they're favorable to your interests, particularly concerning long-term access and operational rights. G.R. Hari, Advocate, has successfully advised several renewable energy companies on land acquisition and regulatory compliance in Karnataka and Tamil Nadu.",
        ],
         "Litigation & Dispute Resolution": [
            "Property title disputes: We represent clients in all types of property title disputes, including ownership claims, boundary disputes, and easement disputes. We have extensive experience in litigating property title cases and protecting our clients' ownership rights.", 
            "Construction disputes: We represent owners, contractors, and subcontractors in construction disputes, including breach of contract claims, construction defect claims, and payment disputes. We have a deep understanding of the construction industry and provide effective legal representation to our clients.", 
            "Landlord-tenant conflicts: We represent both landlords and tenants in landlord-tenant conflicts, including eviction proceedings, lease disputes, and property damage claims. We are knowledgeable about landlord-tenant law and provide effective legal representation to our clients.", 
            "Real estate recovery matters: We assist lenders and other secured creditors in recovering their investments in real estate, including foreclosures, receiverships, and other enforcement actions. We have extensive experience in real estate recovery matters and provide effective legal representation to our clients.",
            "RERA proceedings: We represent developers and buyers in RERA proceedings, including complaints about project delays, construction defects, and violations of RERA regulations. We help our clients navigate the complexities of RERA and ensure compliance with all applicable regulations. G.R. Hari, Advocate, is a recognized expert in RERA law and has successfully represented numerous clients before the Tamil Nadu Real Estate Regulatory Authority (TNRERA).",
            "Land acquisition disputes: We represent landowners and government agencies in land acquisition disputes, including compensation claims, challenges to acquisition notifications, and disputes over land use. We have extensive experience in land acquisition matters and provide effective legal representation to our clients.",
            "Enforcement of property rights: We assist property owners in enforcing their property rights, including obtaining injunctions against trespassers, removing encroachments, and protecting easements. We have extensive experience in enforcing property rights and provide effective legal representation to our clients.",
            "Development agreement disputes: We represent landowners and developers in disputes over development agreements, including breach of contract claims, challenges to development approvals, and disputes over project financing. We have a deep understanding of real estate development and provide effective legal representation to our clients.",
        ],
         "Documentation": [
            "Sale deeds and agreements: We prepare and review sale deeds and agreements to ensure that they accurately reflect the terms of the transaction and comply with all applicable laws, including the Transfer of Property Act, 1882 and the Registration Act, 1908. Our sale deed and agreement services are essential for minimizing risk in property transactions.", 
            "Lease agreements: We prepare and review lease agreements to ensure that they are legally sound and protect the interests of both the landlord and the tenant. Our lease agreement services help our clients avoid potential disputes and ensure compliance with all applicable laws and regulations, including the Tamil Nadu Buildings (Lease and Rent Control) Act, 1960 (if applicable).", 
            "Development agreements: We prepare and review development agreements to ensure that they clearly define the rights and responsibilities of the parties involved in the development project. Our development agreement services help our clients navigate the complexities of real estate development and ensure that their projects are successful.", 
            "Construction contracts: We prepare and review construction contracts to ensure that they are legally sound and protect the interests of both the owner and the contractor. Our construction contract services help our clients avoid potential disputes and ensure that their construction projects are completed on time and within budget.",
            "Property transfer documents: We prepare all types of property transfer documents, including gift deeds, partition deeds, and release deeds, to ensure that the transfer is legally valid and complies with all applicable laws. Our property transfer document services are essential for ensuring that property is transferred smoothly and efficiently, adhering to the requirements of the Registration Act, 1908.",
            "Joint development agreements: We prepare and review joint development agreements to ensure that they clearly define the rights and responsibilities of the parties involved in the joint development project. Our joint development agreement services help our clients navigate the complexities of joint development projects and ensure that their interests are protected.",
            "License agreements: We prepare and review license agreements for the use of property, ensuring that they are legally sound and protect the interests of both the licensor and the licensee. Our license agreement services help our clients avoid potential disputes and ensure compliance with all applicable laws and regulations.",
            "Mortgage documentation: We prepare and review mortgage documentation to ensure that it is legally sound and protects the interests of the lender. Our mortgage documentation services help our clients make secure real estate loans and enforce their rights in the event of default, adhering to the requirements of the Transfer of Property Act, 1882"
        ],
      },
      serviceDetails: {
        "Title investigation and verification" : "Our team conducts thorough title investigations to verify ownership and identify any encumbrances or legal issues that may affect the property. We meticulously examine all relevant records, including sale deeds, mortgage documents, revenue records, and court orders, ensuring that our clients have clear and marketable title to their property under the Transfer of Property Act, 1882 and the Tamil Nadu Patta Passbook Act, 1983. Our title investigation services are essential for minimizing risk in property transactions.", 
        "Property documentation review" : "We review all types of property documentation, including sale agreements, lease agreements, mortgage documents, building plans, power of attorney, and succession certificates, to ensure that they are legally sound and protect our clients' interests. Our meticulous documentation review services help our clients avoid potential disputes and ensure compliance with all applicable laws and regulations, including the Registration Act, 1908 and the Stamp Act. We pay particular attention to clauses related to transfer of property, easements, and covenants.", 
        "Development project structuring" : "We advise developers on structuring real estate development projects to maximize profitability and minimize risk. Our services include advising on land acquisition, financing, regulatory approvals, and construction contracts. We help our clients navigate the complexities of real estate development and ensure that their projects are successful. This includes advising on compliance with local planning regulations under the Tamil Nadu Town and Country Planning Act, 1971.", 
        "Real estate investment advisory" : "We provide legal advice to investors on all aspects of real estate investment, including property selection, financing, and management. Our services include conducting due diligence, reviewing investment agreements, and advising on tax implications. We help our clients make informed investment decisions and achieve their real estate investment goals. We also advise compliance with the Benami Transactions (Prohibition) Act, 1988 to ensure legitimacy of investments.",
        "Joint development consulting" : "We assist landowners and developers in structuring joint development projects to maximize their returns and minimize their risks. Our services include drafting joint development agreements, advising on profit sharing arrangements, and assisting with regulatory approvals. We help our clients navigate the complexities of joint development projects and ensure that their interests are protected, adhering to the principles of the Indian Contract Act, 1872 and ensuring equitable distribution of rights and responsibilities.",
        "RERA compliance advisory" : "We advise developers and buyers on compliance with the Real Estate (Regulation and Development) Act, 2016 (RERA). Our services include assisting with project registration, drafting sale agreements that comply with RERA requirements, and representing clients in RERA proceedings before the Tamil Nadu Real Estate Regulatory Authority (TNRERA). We help our clients navigate the complexities of RERA and ensure compliance with all applicable regulations, including those related to project timelines, disclosures, and dispute resolution. G.R. Hari, Advocate, has extensive experience in representing clients in RERA-related matters, providing expert guidance on compliance and dispute resolution.",
        "Land use and zoning consultation" : "We provide legal advice on land use and zoning regulations, helping our clients understand the restrictions and opportunities associated with their property. Our services include advising on zoning approvals, obtaining variances, and challenging zoning decisions. We help our clients maximize the value of their property and ensure compliance with all applicable land use regulations under the Tamil Nadu Town and Country Planning Act, 1971.",
        "Due diligence for property transactions" : "We conduct thorough due diligence investigations for property transactions, including title searches, property inspections, and environmental assessments. Our due diligence reports provide our clients with a comprehensive assessment of the risks and opportunities associated with the transaction. We help our clients make informed decisions and avoid costly mistakes, examining compliance with all relevant laws including the Transfer of Property Act, 1882, the Registration Act, 1908, and local regulations.",
        "Real Estate Due Diligence for Renewable Energy (Karnataka & Tamil Nadu)" : "The renewable energy sector in Karnataka and Tamil Nadu presents exciting opportunities but also demands thorough real estate due diligence to secure project success. Our law firm's dedicated team specializes in identifying land-related risks and complexities for solar, wind, and other renewable energy ventures within these states. This includes:",
        "Thorough Title Examination" : "We meticulously investigate land ownership records, verifying clear title and identifying any encumbrances, easements, or local restrictions that could impede project development, ensuring compliance with state-specific land revenue codes.",
        "Land Use and Zoning" : "Our deep understanding of regulations in Karnataka and Tamil Nadu helps verify proper zoning for renewable energy projects, securing necessary permits and ensuring long-term compliance with local planning authorities and regulations.",
        "Environmental Considerations" : "We carefully examine potential environmental liabilities, past land usage, and ecological sensitivities to mitigate risks and ensure compliance with environmental regulations under the Environment (Protection) Act, 1986.",
        "Community and Stakeholder Engagement" : "Identifying local stakeholders, potential conflicts, and strategies for building strong community relationships are essential for smooth project execution.",
        "Contract Review and Negotiation" : "Reviewing lease agreements, land purchase documents, and project development agreements, ensuring they're favorable to your interests, particularly concerning long-term access and operational rights. G.R. Hari, Advocate, has successfully advised several renewable energy companies on land acquisition and regulatory compliance in Karnataka and Tamil Nadu.",
      },
      expertiseHighlights: [
         { title: "Large Scale Township Development", description: "Provided end-to-end legal advisory for the development of a major residential township project, including land acquisition and RERA compliance."},
         { title: "Commercial Leasing", description: "Negotiated and finalized high-value commercial lease agreements for multinational corporations setting up offices in India."},
      ],
      team: [{ name: "Advocate Name 3", image: "https://picsum.photos/seed/associateC/100/100", position: "Associate" }], // Replace
      relatedAreas: ["corporate-law", "commercial-litigation", "tax-law"]
   },
   "rera-specific-services": {
      name: "RERA-Specific Services",
      icon: MapPinHouseIcon,
      introduction: "The Real Estate (Regulation and Development) Act, 2016 (RERA) was enacted to bring transparency, accountability, and efficiency to the Indian real estate sector, protecting the interests of homebuyers and promoting fair practices. Law Chambers of G.R. Hari provides expert legal guidance to both developers and homebuyers to navigate the complexities of RERA and achieve their objectives. Our RERA-specific services are tailored to ensure compliance with both the central Act and the specific regulations of the Tamil Nadu Real Estate Regulatory Authority (TNRERA). We assist clients in the Chennai real estate market and across Tamil Nadu in achieving RERA compliance.",
      services: {
         "RERA-Specific Services": [
            "RERA Project Registration Assistance: We guide developers through the entire RERA project registration process, ensuring compliance with all requirements and timely submission of necessary documents to the Tamil Nadu Real Estate Regulatory Authority (TNRERA). Our services include preparing project plans, financial statements, legal documents, and other information required for registration, minimizing delays and maximizing the chances of a successful application. We are experts in RERA project registration in Chennai and across Tamil Nadu, ensuring adherence to Section 3 of the RERA Act and all associated regulations for seamless project launches and approvals.", 
            "RERA Compliance Audits for Developers: We conduct comprehensive RERA compliance audits for developers to identify and rectify any potential violations of the Act. Our audits cover all aspects of project development, from advertising and marketing compliance to construction timelines and financial management, helping developers avoid penalties and maintain a positive reputation. We focus on the rules and guidelines articulated in Section 4 of the RERA Act, providing developers with a clear pathway to achieving and maintaining RERA compliance in Tamil Nadu.", 
            "Drafting and Review of RERA-Compliant Agreements for Sale: We draft and review agreements for sale to ensure that they comply with all mandatory provisions of RERA, protecting the interests of both developers and homebuyers. Our agreements clearly outline the rights and obligations of each party, minimizing the risk of future disputes and adhering to the stipulations of Section 13 of the RERA Act. We specialize in crafting robust and enforceable RERA compliant agreements that provide peace of mind for all parties involved in the real estate transaction.", 
            "Representation in RERA Disputes (Developers & Homebuyers): We provide skilled legal representation to both developers and homebuyers in RERA disputes before the TNRERA and the Real Estate Appellate Tribunal. We handle a wide range of disputes, including project delays, construction defects, unfair practices, and violations of RERA regulations, advocating for our clients' rights and seeking just resolutions. Law Chambers of G.R. Hari is a leading provider of legal services for RERA disputes in Chennai, with a proven track record of success in representing clients in complex RERA litigation and dispute resolution. Our expertise includes navigating the specific procedures and precedents set by the TNRERA.",
            "Guidance on RERA Regulations for Real Estate Agents: We advise real estate agents on their obligations under RERA, including registration requirements, ethical conduct, and disclosure requirements, helping them operate their businesses in a compliant and professional manner. This ensures they comply with Section 9 and Section 10 of the RERA Act, safeguarding their licenses and promoting ethical practices in the Tamil Nadu real estate market.",
            "Assistance with Filing Complaints under RERA: We assist homebuyers in preparing and filing complaints with the TNRERA against developers for violations of RERA regulations, such as project delays, construction defects, and unfair practices. We provide expert guidance throughout the complaint process, ensuring that our clients' rights are protected. We also assist developers to file applications with the RERA Authority for seeking various approvals under RERA.",
            "Advising on RERA Implications for Existing Projects: We provide legal guidance to developers on how RERA impacts their ongoing projects, helping them understand their obligations and implement strategies to comply with the Act's requirements, minimizing disruption and ensuring a smooth transition. This advice is particularly useful to developers in projects which are not complete as on the date of coming into force of the RERA Act, ensuring they can achieve RERA compliance for ongoing projects. We help developers understand the specific requirements and expectations of the TNRERA for existing projects.",
            "Strategic Advice on RERA Litigation: We provide clients with strategic advice on the best course of action in RERA-related litigation, carefully assessing the merits of their case and developing a legal strategy that maximizes their chances of success. This involves carefully analysing the provisions of the RERA Act and associated case law, as well as the specific procedures and decisions of the TNRERA, to build a robust and effective legal defense or claim.",
        ],
         "Litigation & Dispute Resolution": [
            "Property title disputes: We represent clients in all types of property title disputes, including ownership claims, boundary disputes, and easement disputes. We have extensive experience in litigating property title cases and protecting our clients' ownership rights.", 
            "Construction disputes: We represent owners, contractors, and subcontractors in construction disputes, including breach of contract claims, construction defect claims, and payment disputes. We have a deep understanding of the construction industry and provide effective legal representation to our clients.", 
            "Landlord-tenant conflicts: We represent both landlords and tenants in landlord-tenant conflicts, including eviction proceedings, lease disputes, and property damage claims. We are knowledgeable about landlord-tenant law and provide effective legal representation to our clients.", 
            "Real estate recovery matters: We assist lenders and other secured creditors in recovering their investments in real estate, including foreclosures, receiverships, and other enforcement actions. We have extensive experience in real estate recovery matters and provide effective legal representation to our clients.",
            "RERA proceedings: We represent developers and buyers in RERA proceedings, including complaints about project delays, construction defects, and violations of RERA regulations. We help our clients navigate the complexities of RERA and ensure compliance with all applicable regulations. G.R. Hari, Advocate, is a recognized expert in RERA law and has successfully represented numerous clients before the Tamil Nadu Real Estate Regulatory Authority (TNRERA).",
            "Land acquisition disputes: We represent landowners and government agencies in land acquisition disputes, including compensation claims, challenges to acquisition notifications, and disputes over land use. We have extensive experience in land acquisition matters and provide effective legal representation to our clients.",
            "Enforcement of property rights: We assist property owners in enforcing their property rights, including obtaining injunctions against trespassers, removing encroachments, and protecting easements. We have extensive experience in enforcing property rights and provide effective legal representation to our clients.",
            "Development agreement disputes: We represent landowners and developers in disputes over development agreements, including breach of contract claims, challenges to development approvals, and disputes over project financing. We have a deep understanding of real estate development and provide effective legal representation to our clients.",
        ],
         "Documentation": [
            "Sale deeds and agreements: We prepare and review sale deeds and agreements to ensure that they accurately reflect the terms of the transaction and comply with all applicable laws, including the Transfer of Property Act, 1882 and the Registration Act, 1908. Our sale deed and agreement services are essential for minimizing risk in property transactions.", 
            "Lease agreements: We prepare and review lease agreements to ensure that they are legally sound and protect the interests of both the landlord and the tenant. Our lease agreement services help our clients avoid potential disputes and ensure compliance with all applicable laws and regulations, including the Tamil Nadu Buildings (Lease and Rent Control) Act, 1960 (if applicable).", 
            "Development agreements: We prepare and review development agreements to ensure that they clearly define the rights and responsibilities of the parties involved in the development project. Our development agreement services help our clients navigate the complexities of real estate development and ensure that their projects are successful.", 
            "Construction contracts: We prepare and review construction contracts to ensure that they are legally sound and protect the interests of both the owner and the contractor. Our construction contract services help our clients avoid potential disputes and ensure that their construction projects are completed on time and within budget.",
            "Property transfer documents: We prepare all types of property transfer documents, including gift deeds, partition deeds, and release deeds, to ensure that the transfer is legally valid and complies with all applicable laws. Our property transfer document services are essential for ensuring that property is transferred smoothly and efficiently, adhering to the requirements of the Registration Act, 1908.",
            "Joint development agreements: We prepare and review joint development agreements to ensure that they clearly define the rights and responsibilities of the parties involved in the joint development project. Our joint development agreement services help our clients navigate the complexities of joint development projects and ensure that their interests are protected.",
            "License agreements: We prepare and review license agreements for the use of property, ensuring that they are legally sound and protect the interests of both the licensor and the licensee. Our license agreement services help our clients avoid potential disputes and ensure compliance with all applicable laws and regulations.",
            "Mortgage documentation: We prepare and review mortgage documentation to ensure that it is legally sound and protects the interests of the lender. Our mortgage documentation services help our clients make secure real estate loans and enforce their rights in the event of default, adhering to the requirements of the Transfer of Property Act, 1882"
        ],
      },
      serviceDetails: {
        "Title investigation and verification" : "Our team conducts thorough title investigations to verify ownership and identify any encumbrances or legal issues that may affect the property. We meticulously examine all relevant records, including sale deeds, mortgage documents, revenue records, and court orders, ensuring that our clients have clear and marketable title to their property under the Transfer of Property Act, 1882 and the Tamil Nadu Patta Passbook Act, 1983. Our title investigation services are essential for minimizing risk in property transactions.", 
        "Property documentation review" : "We review all types of property documentation, including sale agreements, lease agreements, mortgage documents, building plans, power of attorney, and succession certificates, to ensure that they are legally sound and protect our clients' interests. Our meticulous documentation review services help our clients avoid potential disputes and ensure compliance with all applicable laws and regulations, including the Registration Act, 1908 and the Stamp Act. We pay particular attention to clauses related to transfer of property, easements, and covenants.", 
        "Development project structuring" : "We advise developers on structuring real estate development projects to maximize profitability and minimize risk. Our services include advising on land acquisition, financing, regulatory approvals, and construction contracts. We help our clients navigate the complexities of real estate development and ensure that their projects are successful. This includes advising on compliance with local planning regulations under the Tamil Nadu Town and Country Planning Act, 1971.", 
        "Real estate investment advisory" : "We provide legal advice to investors on all aspects of real estate investment, including property selection, financing, and management. Our services include conducting due diligence, reviewing investment agreements, and advising on tax implications. We help our clients make informed investment decisions and achieve their real estate investment goals. We also advise compliance with the Benami Transactions (Prohibition) Act, 1988 to ensure legitimacy of investments.",
        "Joint development consulting" : "We assist landowners and developers in structuring joint development projects to maximize their returns and minimize their risks. Our services include drafting joint development agreements, advising on profit sharing arrangements, and assisting with regulatory approvals. We help our clients navigate the complexities of joint development projects and ensure that their interests are protected, adhering to the principles of the Indian Contract Act, 1872 and ensuring equitable distribution of rights and responsibilities.",
        "RERA compliance advisory" : "We advise developers and buyers on compliance with the Real Estate (Regulation and Development) Act, 2016 (RERA). Our services include assisting with project registration, drafting sale agreements that comply with RERA requirements, and representing clients in RERA proceedings before the Tamil Nadu Real Estate Regulatory Authority (TNRERA). We help our clients navigate the complexities of RERA and ensure compliance with all applicable regulations, including those related to project timelines, disclosures, and dispute resolution. G.R. Hari, Advocate, has extensive experience in representing clients in RERA-related matters, providing expert guidance on compliance and dispute resolution.",
        "Land use and zoning consultation" : "We provide legal advice on land use and zoning regulations, helping our clients understand the restrictions and opportunities associated with their property. Our services include advising on zoning approvals, obtaining variances, and challenging zoning decisions. We help our clients maximize the value of their property and ensure compliance with all applicable land use regulations under the Tamil Nadu Town and Country Planning Act, 1971.",
        "Due diligence for property transactions" : "We conduct thorough due diligence investigations for property transactions, including title searches, property inspections, and environmental assessments. Our due diligence reports provide our clients with a comprehensive assessment of the risks and opportunities associated with the transaction. We help our clients make informed decisions and avoid costly mistakes, examining compliance with all relevant laws including the Transfer of Property Act, 1882, the Registration Act, 1908, and local regulations.",
        "Real Estate Due Diligence for Renewable Energy (Karnataka & Tamil Nadu)" : "The renewable energy sector in Karnataka and Tamil Nadu presents exciting opportunities but also demands thorough real estate due diligence to secure project success. Our law firm's dedicated team specializes in identifying land-related risks and complexities for solar, wind, and other renewable energy ventures within these states. This includes:",
        "Thorough Title Examination" : "We meticulously investigate land ownership records, verifying clear title and identifying any encumbrances, easements, or local restrictions that could impede project development, ensuring compliance with state-specific land revenue codes.",
        "Land Use and Zoning" : "Our deep understanding of regulations in Karnataka and Tamil Nadu helps verify proper zoning for renewable energy projects, securing necessary permits and ensuring long-term compliance with local planning authorities and regulations.",
        "Environmental Considerations" : "We carefully examine potential environmental liabilities, past land usage, and ecological sensitivities to mitigate risks and ensure compliance with environmental regulations under the Environment (Protection) Act, 1986.",
        "Community and Stakeholder Engagement" : "Identifying local stakeholders, potential conflicts, and strategies for building strong community relationships are essential for smooth project execution.",
        "Contract Review and Negotiation" : "Reviewing lease agreements, land purchase documents, and project development agreements, ensuring they're favorable to your interests, particularly concerning long-term access and operational rights. G.R. Hari, Advocate, has successfully advised several renewable energy companies on land acquisition and regulatory compliance in Karnataka and Tamil Nadu.",
      },
      expertiseHighlights: [
         { title: "Large Scale Township Development", description: "Provided end-to-end legal advisory for the development of a major residential township project, including land acquisition and RERA compliance."},
         { title: "Commercial Leasing", description: "Negotiated and finalized high-value commercial lease agreements for multinational corporations setting up offices in India."},
      ],
      team: [{ name: "Advocate Name 3", image: "https://picsum.photos/seed/associateC/100/100", position: "Associate" }], // Replace
      relatedAreas: ["rera", "rera-specific-services"]
   },
   "employment-law": {
     name: "Employment Law",
     icon: UserCheck,
     introduction: "Our Employment Law (Business Side) practice is dedicated to assisting businesses in navigating the complexities of labor laws and regulations, fostering a legally compliant and productive work environment. We offer proactive guidance on all aspects of employment law, encompassing hiring practices, workplace policies, employee relations, and termination procedures. Our goal is to minimize the risk of legal disputes and empower our clients to create a positive and compliant workplace culture.",
     services: {
        "Advisory Services": [
            "Employment Policy Development: We collaborate closely with businesses to create comprehensive employment policies that align with their organizational values and comply with all applicable Indian labor laws. Our policies address critical areas such as recruitment, hiring, compensation, benefits, performance management, disciplinary actions, and termination procedures, ensuring compliance with the Industrial Employment (Standing Orders) Act, 1946 where applicable, and the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act). This includes drafting a clear and accessible POSH policy that is compliant with current legislation.",
            "HR Compliance Advisory: Navigating the ever-changing landscape of labor laws requires proactive and informed guidance. Our HR compliance advisory services provide businesses with ongoing support in staying up to date with new regulations, understanding their obligations, and implementing best practices in HR management. We conduct regular compliance audits, advise on employee classification issues, and provide training to HR personnel on key legal requirements under statutes such as the Factories Act, 1948, the Employees' Provident Funds and Miscellaneous Provisions Act, 1952, the Employees' State Insurance Act, 1948, and the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. This includes guidance on setting up Internal Complaints Committees (ICC) as mandated by the POSH Act and ensuring ongoing training for ICC members.",
            "Workplace Investigation Guidance: Conducting thorough and impartial workplace investigations is essential for addressing employee complaints, allegations of misconduct, and other sensitive matters, particularly those related to sexual harassment. We guide businesses through the investigation process, ensuring that investigations are conducted fairly, objectively, and in accordance with legal requirements, including the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, and principles of natural justice. We assist with gathering evidence, interviewing witnesses, and preparing comprehensive investigation reports that are legally defensible.",
            "Performance Management Consulting: A robust performance management system is crucial for driving employee productivity and at Workplace (Prevention, Prohibition and Redressal) Act, 2013**, and principles of natural justice. We assist with gathering evidence, interviewing witnesses, and preparing comprehensive investigation reports that are legally defensible.",
            "Restructuring Advisory: Businesses undergoing restructuring, downsizing, or mergers face complex legal and HR challenges. We provide expert legal advice and support to ensure that these processes are conducted in compliance with labor laws and minimize the risk of legal disputes. We assist with developing restructuring plans, conducting workforce reductions, negotiating severance agreements, managing employee communications, and complying with the Industrial Disputes Act, 1947.",
            "Executive Compensation Planning: Designing competitive and legally sound executive compensation packages is critical for attracting and retaining top talent. We advise businesses on structuring executive compensation arrangements that align with company performance, comply with tax regulations, and minimize potential legal risks. We assist with drafting employment contracts, stock option plans, bonus plans, deferred compensation arrangements, and other executive compensation agreements.",
            "Social Security Compliance: Businesses are required to comply with various social security laws, including the Employees' Provident Funds and Miscellaneous Provisions Act, the Employees' State Insurance Act, and the Payment of Gratuity Act. We advise businesses on their obligations under these laws, assist with registration and compliance procedures, and represent them in any disputes with social security authorities, ensuring timely and accurate compliance.",
            "Industrial Relations Advisory: Maintaining positive industrial relations is essential for promoting workplace harmony and avoiding labor unrest. We provide advice and representation in industrial relations matters, including union negotiations, collective bargaining agreements, conciliation proceedings, and labor court litigation. We assist businesses in developing effective communication strategies, managing employee grievances, and resolving labor disputes in a fair and efficient manner, always ensuring compliance with the Industrial Disputes Act, 1947.",
            "Data Privacy: In an increasingly data-driven world, businesses must comply with Indian data privacy laws when handling employee data. We advise on data privacy compliance in the employment context, including developing data protection policies, obtaining employee consent for data processing, and responding to data breaches. We ensure businesses comply with the Information Technology Act, 2000 and related regulations.",
            "Global Mobility: For businesses employing foreign workers, immigration compliance is crucial. We advise on all aspects of immigration compliance, including obtaining work visas, sponsoring employees for permanent residency, and ensuring compliance with immigration laws and regulations. We ensure compliance with the Foreigners Act, 1946 and related regulations."
        ],
        "Litigation & Dispute Resolution": [
            "Representing clients before Labor Courts, Industrial Tribunals, High Courts, and the Supreme Court in employment disputes.",
            "Handling cases related to wrongful termination, wage disputes, breach of employment contracts, and enforcement of non-compete clauses.",
            "Defending employers against claims of unfair labor practices.",
            "Representation in matters concerning trade unions and collective bargaining.",
        ],
        "Documentation": [
            "Employment Agreements: We craft comprehensive employment agreements that clearly define the terms and conditions of employment, encompassing job responsibilities, compensation, benefits, working hours, confidentiality obligations, and termination procedures. We ensure that these agreements comply with all applicable labor laws and regulations, including the Factories Act, 1948, the Minimum Wages Act, 1948, the Contract Labour (Regulation and Abolition) Act, 1970, and the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act).",
            "HR Policies and Manuals: We develop customized HR policies and manuals that provide a comprehensive framework for managing employees, addressing key areas such as recruitment, hiring, compensation, benefits, performance management, disciplinary actions, termination procedures, and prevention of sexual harassment. We ensure that these policies are clearly written, easily accessible to employees, and consistently enforced.", 
            "Termination Documents: Terminating an employee requires strict adherence to legal procedures. We prepare legally sound termination documents, including termination letters, show cause notices, and other related paperwork, ensuring that all legal requirements are met and minimizing the risk of wrongful termination claims.", 
            "Settlement Agreements: Resolving employment disputes through settlement agreements can be a cost-effective and efficient alternative to litigation. We negotiate and draft settlement agreements that protect our clients' interests and ensure a full and final resolution of all claims, ensuring compliance with applicable labor laws and regulations.", 
            "Non-Compete Agreements: In certain circumstances, it may be necessary to protect a business's confidential information and customer relationships through non-compete agreements. We draft and review these agreements to ensure that they are enforceable under applicable law and reasonably tailored to protect the business's legitimate interests.", 
            "Confidentiality Agreements: Safeguarding trade secrets and proprietary information is crucial for maintaining a competitive advantage. We prepare confidentiality agreements that legally bind employees to protect a business's confidential information during and after their employment.", 
            "Employee Handbooks: Comprehensive employee handbooks serve as a valuable resource for employees, providing clear guidelines on company policies, procedures, and employee rights and responsibilities. We develop customized employee handbooks that align with our clients' organizational values and comply with all applicable laws and regulations, including a clear and accessible POSH policy.",
            "Disciplinary Procedures: Consistent and fair disciplinary procedures are essential for addressing employee misconduct and maintaining workplace order. We develop disciplinary procedures that are fair, transparent, and compliant with labor laws, ensuring that employees are treated with respect and that disciplinary actions are taken appropriately.",
            "Equity-Based Compensation Plans: We assist companies in designing and implementing equity-based compensation plans to attract and retain employees. Our services include structuring stock option plans, employee stock purchase plans, and restricted stock unit plans.",
            "Deferred Compensation Arrangements: We help businesses create deferred compensation arrangements that align with company performance, comply with tax regulations, and minimize potential legal risks. Our services include drafting deferred compensation plans, rabbi trusts, and secular trusts.",
        ],
      },
     serviceDetails: {
          "Employment Policy Development": "We collaborate closely with businesses to create comprehensive employment policies that align with their organizational values and comply with all applicable Indian labor laws. Our policies address critical areas such as recruitment, hiring, compensation, benefits, performance management, disciplinary actions, and termination procedures, ensuring compliance with the Industrial Employment (Standing Orders) Act, 1946 where applicable, and the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act). This includes drafting a clear and accessible POSH policy that is compliant with current legislation.",
          "HR Compliance Advisory": "Navigating the ever-changing landscape of labor laws requires proactive and informed guidance. Our HR compliance advisory services provide businesses with ongoing support in staying up to date with new regulations, understanding their obligations, and implementing best practices in HR management. We conduct regular compliance audits, advise on employee classification issues, and provide training to HR personnel on key legal requirements under statutes such as the Factories Act, 1948, the Employees' Provident Funds and Miscellaneous Provisions Act, 1952, the Employees' State Insurance Act, 1948, and the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. This includes guidance on setting up Internal Complaints Committees (ICC) as mandated by the POSH Act and ensuring ongoing training for ICC members.",
          "Workplace Investigation Guidance": "Conducting thorough and impartial workplace investigations is essential for addressing employee complaints, allegations of misconduct, and other sensitive matters, particularly those related to sexual harassment. We guide businesses through the investigation process, ensuring that investigations are conducted fairly, objectively, and in accordance with legal requirements, including the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, and principles of natural justice. We assist with gathering evidence, interviewing witnesses, and preparing comprehensive investigation reports that are legally defensible.",
          "Performance Management Consulting": "A robust performance management system is crucial for driving employee productivity and at Workplace (Prevention, Prohibition and Redressal) Act, 2013**, and principles of natural justice. We assist with gathering evidence, interviewing witnesses, and preparing comprehensive investigation reports that are legally defensible.",
          "Restructuring Advisory" : "Businesses undergoing restructuring, downsizing, or mergers face complex legal and HR challenges. We provide expert legal advice and support to ensure that these processes are conducted in compliance with labor laws and minimize the risk of legal disputes. We assist with developing restructuring plans, conducting workforce reductions, negotiating severance agreements, managing employee communications, and complying with the Industrial Disputes Act, 1947.",
          "Executive Compensation Planning": "Designing competitive and legally sound executive compensation packages is critical for attracting and retaining top talent. We advise businesses on structuring executive compensation arrangements that align with company performance, comply with tax regulations, and minimize potential legal risks. We assist with drafting employment contracts, stock option plans, bonus plans, deferred compensation arrangements, and other executive compensation agreements.",
          "Social Security Compliance": "Businesses are required to comply with various social security laws, including the Employees' Provident Funds and Miscellaneous Provisions Act, the Employees' State Insurance Act, and the Payment of Gratuity Act. We advise businesses on their obligations under these laws, assist with registration and compliance procedures, and represent them in any disputes with social security authorities, ensuring timely and accurate compliance.",
          "Industrial Relations Advisory": "Maintaining positive industrial relations is essential for promoting workplace harmony and avoiding labor unrest. We provide advice and representation in industrial relations matters, including union negotiations, collective bargaining agreements, conciliation proceedings, and labor court litigation. We assist businesses in developing effective communication strategies, managing employee grievances, and resolving labor disputes in a fair and efficient manner, always ensuring compliance with the Industrial Disputes Act, 1947.",
          "Data Privacy" : "In an increasingly data-driven world, businesses must comply with Indian data privacy laws when handling employee data. We advise on data privacy compliance in the employment context, including developing data protection policies, obtaining employee consent for data processing, and responding to data breaches. We ensure businesses comply with the Information Technology Act, 2000 and related regulations.",
          "Global Mobility" : "For businesses employing foreign workers, immigration compliance is crucial. We advise on all aspects of immigration compliance, including obtaining work visas, sponsoring employees for permanent residency, and ensuring compliance with immigration laws and regulations. We ensure compliance with the Foreigners Act, 1946 and related regulations."
     },
     expertiseHighlights: [
         { title: "Handling Complex Terminations", description: "Advised a multinational company on the lawful termination process for senior executives, mitigating legal risks."},
         { title: "POSH Compliance Audit", description: "Conducted comprehensive POSH Act compliance audits for several large organizations, strengthening their internal processes."},
     ],
     team: [{ name: "Advocate Name 1", image: "https://picsum.photos/seed/associateA/100/100", position: "Senior Associate" }], // Replace
     relatedAreas: ["corporate-law", "commercial-litigation", "regulatory-compliance"]
   },
   "criminal-law-services": {
      name: "Criminal Law Services",
      icon: Columns4Icon,
      introduction: "Law Chambers of G.R. Hari provides comprehensive legal services encompassing all aspects of criminal law, from initial investigations to appellate advocacy. The firm is committed to providing informed counsel and skilled representation to individuals and organizations facing criminal charges. Services span the entire criminal justice process, including pre-trial, trial, and post-conviction proceedings.", // Updated from OCR
      services: {
          "Crime": [
            "White-Collar Crime: White-collar crime encompasses a range of nonviolent offenses characterized by deceit, concealment, or violation of trust. These crimes are typically motivated by financial gain and often involve sophisticated schemes targeting businesses, investors, and government entities. Areas of focus include securities fraud, insider trading, embezzlement, bribery, corruption, and various forms of financial fraud. Addressing white-collar crime requires specialized knowledge of corporate law, securities regulations, accounting principles, and investigative techniques. Legal expertise is essential to navigate the complexities of these cases, which often involve voluminous financial records and intricate business transactions. Recent cases under the Companies Act, 2013 and SEBI regulations are closely followed.", 
            "Economic Offences: Economic offenses represent a broad category of crimes that undermine the financial stability and economic well-being of the country. These offenses typically involve large-scale fraud, financial irregularities, and violations of economic regulations. Key areas of focus include tax evasion, money laundering, bank fraud, customs and excise violations, and offenses under the Foreign Exchange Management Act (FEMA). Combating economic offenses requires a coordinated effort by law enforcement agencies, regulatory bodies, and the judiciary. Effective prosecution of these cases demands specialized knowledge of financial markets, banking laws, and international trade regulations.", 
            "Indian Penal Code (IPC) Offences: Offenses under the Indian Penal Code (IPC) cover a wide spectrum of criminal conduct, ranging from petty theft to serious violent crimes. The IPC defines various offenses, including theft, robbery, extortion, cheating, forgery, assault, battery, homicide, and offenses against women. Each offense is defined with specific elements that must be proven beyond a reasonable doubt to secure a conviction. The firm provides legal representation for individuals accused of IPC offenses, ensuring due process and protecting their rights under the law. The IPC remains a foundational piece of legislation in the Indian criminal justice system.",
            "Serious Fraud Investigation Office (SFIO): The Serious Fraud Investigation Office (SFIO) is a specialized agency responsible for investigating complex corporate fraud cases in India. The SFIO investigates offenses involving intricate financial transactions, regulatory violations, and large-scale corporate mismanagement. SFIO investigations often involve coordination with other law enforcement agencies, regulatory bodies, and forensic experts. Successfully defending against SFIO charges requires specialized knowledge of corporate law, accounting standards, and investigative procedures.",
            "Prevention of Money Laundering Act (PMLA): The Prevention of Money Laundering Act (PMLA) is a stringent law enacted to combat money laundering in India. The PMLA criminalizes the act of concealing or disguising the proceeds of crime, making it difficult to trace the illicit funds back to their source. PMLA investigations often target individuals and entities involved in drug trafficking, terrorism financing, corruption, and other serious crimes. Defending against PMLA charges requires specialized knowledge of financial regulations, banking laws, and international anti-money laundering standards.",
            "Prevention of Corruption Act: The Prevention of Corruption Act aims to curb bribery and corruption among public servants in India. The Act criminalizes the act of taking gratification by public servants and punishes those who offer bribes to influence official action. Cases under the Prevention of Corruption Act often involve complex investigations, surveillance, and the gathering of evidence to prove corrupt practices. A strategic defence requires meticulous scrutiny of evidence, understanding of administrative procedures, and a robust presentation of factual and legal arguments."
          ], // Re-categorized from OCR
          "Core Criminal Law Services": [
            "Criminal Trial Representation (Prosecution and Defence): Skilled advocacy in criminal trials before all levels of courts, involving thorough preparation, presentation of evidence, cross-examination of witnesses, and compelling legal arguments.", 
            "Bail Applications: Preparation and filing of bail applications to secure the release of individuals pending trial or appeal, presenting persuasive arguments based on the facts, circumstances, and legal principles.",
            "Anticipatory Bail Applications (Section 438 CrPC): Seeking anticipatory bail (also known as pre-arrest bail) to protect individuals from imminent arrest, presenting arguments demonstrating the absence of a reasonable apprehension of arrest.",
            "Quashing of FIRs (Section 482 CrPC): Seeking the quashing of First Information Reports (FIRs) to terminate frivolous, malicious, or baseless criminal proceedings, invoking the inherent powers of the High Court to prevent abuse of the legal process.",
            "Return of Property Applications: Filing applications for the return of property seized by law enforcement agencies during investigations, demonstrating rightful ownership and lawful possession.",
            "Criminal Appeals and Revisions: Filing and arguing criminal appeals and revisions to challenge convictions, sentences, or interlocutory orders, presenting cogent legal arguments based on errors of law or fact.",
            "Complaint Cases (Section 200 CrPC): Drafting and filing criminal complaints before Magistrates, initiating criminal proceedings against individuals or entities for various offenses.",
            "Criminal Breach of Trust (Section 405 IPC): Legal representation in cases involving criminal breach of trust, representing both complainants and accused.",
            "Cheating and Fraud (Section 415 IPC, etc.): Providing legal services related to cheating and various forms of fraud, including financial and economic offenses.",
            "Forgery and Counterfeiting (Section 463 IPC, etc.): Legal representation in cases involving forgery, counterfeiting, and related offenses.",
            "Homicide and Violent Crimes (Section 302 IPC, etc.): Defending clients accused of homicide and other violent crimes.",
            "Offences Against Women (Section 376 IPC, 498A IPC, etc.): Providing representation in cases involving offences against women, including rape, sexual harassment, domestic violence, and dowry-related offenses.",
            "Property Offences (Section 378 IPC, etc.): Handling legal matters related to theft, burglary, robbery, and other property-related crimes.",
            "White Collar Crimes (Various Statutes): Providing representation in cases involving fraud, embezzlement, bribery, corruption, and other financial crimes.",
            "Economic Offences (Various Statutes): Handling legal matters related to tax evasion, money laundering, securities fraud, and other economic crimes.",
            "Cyber Crimes (Information Technology Act): Representing clients in cases involving cybercrime, including hacking, data theft, and online fraud."
          ],
      },
      serviceDetails: {
          "Criminal Trial Representation (Prosecution and Defence)" : "Skilled advocacy in criminal trials before all levels of courts, involving thorough preparation, presentation of evidence, cross-examination of witnesses, and compelling legal arguments.", 
          "Bail Applications" : "Preparation and filing of bail applications to secure the release of individuals pending trial or appeal, presenting persuasive arguments based on the facts, circumstances, and legal principles.",
          "Anticipatory Bail Applications (Section 438 CrPC)" : "Seeking anticipatory bail (also known as pre-arrest bail) to protect individuals from imminent arrest, presenting arguments demonstrating the absence of a reasonable apprehension of arrest.",
          "Quashing of FIRs (Section 482 CrPC)" : "Seeking the quashing of First Information Reports (FIRs) to terminate frivolous, malicious, or baseless criminal proceedings, invoking the inherent powers of the High Court to prevent abuse of the legal process.",
          "Return of Property Applications" : "Filing applications for the return of property seized by law enforcement agencies during investigations, demonstrating rightful ownership and lawful possession.",
          "Criminal Appeals and Revisions" : "Filing and arguing criminal appeals and revisions to challenge convictions, sentences, or interlocutory orders, presenting cogent legal arguments based on errors of law or fact.",
          "Complaint Cases (Section 200 CrPC)" : "Drafting and filing criminal complaints before Magistrates, initiating criminal proceedings against individuals or entities for various offenses.",
          "Criminal Breach of Trust (Section 405 IPC)" : "Legal representation in cases involving criminal breach of trust, representing both complainants and accused.",
          "Cheating and Fraud (Section 415 IPC, etc.)" : "Providing legal services related to cheating and various forms of fraud, including financial and economic offenses.",
          "Forgery and Counterfeiting (Section 463 IPC, etc.)" : "Legal representation in cases involving forgery, counterfeiting, and related offenses.",
          "Homicide and Violent Crimes (Section 302 IPC, etc.)" : "Defending clients accused of homicide and other violent crimes.",
          "Offences Against Women (Section 376 IPC, 498A IPC, etc.)" : "Providing representation in cases involving offences against women, including rape, sexual harassment, domestic violence, and dowry-related offenses.",
          "Property Offences (Section 378 IPC, etc.)" : "Handling legal matters related to theft, burglary, robbery, and other property-related crimes.",
          "White Collar Crimes (Various Statutes)" : "Providing representation in cases involving fraud, embezzlement, bribery, corruption, and other financial crimes.",
          "Economic Offences (Various Statutes)" : "Handling legal matters related to tax evasion, money laundering, securities fraud, and other economic crimes.",
          "Cyber Crimes (Information Technology Act)" : "Representing clients in cases involving cybercrime, including hacking, data theft, and online fraud."
      },
      expertiseHighlights: [
          { title: "Telecom Licensing", description: "Successfully assisted a foreign telecom company in obtaining necessary licenses and approvals to launch services in India."},
          { title: "Data Privacy Implementation", description: "Advised a leading e-commerce platform on developing and implementing a comprehensive data privacy framework compliant with Indian law."},
      ],
      team: [{ name: "Advocate Name 1", image: "https://picsum.photos/seed/associateA/100/100", position: "Senior Associate" }], // Replace
      relatedAreas: ["criminal-law", "criminal-law-services"]
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

            {/* Tabs for Desktop - Horizontal tabs on top, content below */}
            <Tabs defaultValue={Object.keys(data.services)[0]} className="hidden md:block">
              <TabsList className="flex overflow-x-auto w-full mb-6 bg-muted rounded-lg">
                {Object.keys(data.services).map((tabKey) => (
                  <TabsTrigger 
                    key={tabKey} 
                    value={tabKey} 
                    className="py-3 px-6 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    {tabKey}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="tab-content-container">
                {Object.entries(data.services).map(([tabKey, servicesList]) => (
                  <TabsContent key={tabKey} value={tabKey} className="mt-0">
                    <Card className="p-6 bg-white shadow-sm">
                      {Array.isArray(servicesList) ? (
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          {(servicesList as string[]).map((service, index) => (
                            <li key={index}>{service}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">
                          {typeof servicesList === 'string' ? servicesList : 'Service description unavailable'}
                        </p>
                      )}
                    </Card>
                  </TabsContent>
                ))}
              </div>
            </Tabs>

            {/* Accordion for Mobile - Unchanged */}
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
                      <p>{typeof servicesList === 'string' ? servicesList : 'Service description unavailable'}</p>
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
                       {typeof description === 'string' ? description : ""}
                     </AccordionContent>
                   </AccordionItem>
                 ))}
               </Accordion>
            </div>
         </section>
       )}


       {/* Case Studies/Expertise Highlights
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
                   {/* </CardContent>
                 </Card>
               ))}
             </div>
           </div>
         </section>
       )} */} 

      {/* Team Members Specializing */}
       {/* {data.team && data.team.length > 0 && (
         <section className="section-padding-sm bg-white">
           <div className="container-max">
             <SectionHeading title={`Our Experts in ${data.name}`} centered />
              {/* Simple Grid Layout - Consider Carousel for many members */}
             {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:max-w-5xl md:mx-auto">
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
       )} */}

       {/* Related Practice Areas */}
       {relatedLinks.length > 0 && (
         <section className="section-padding-sm bg-primary text-primary-foreground">
           <div className="container-max">
              <SectionHeading title="Related Practice Areas" centered accentColor='text-accent' className="text-white" />
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
