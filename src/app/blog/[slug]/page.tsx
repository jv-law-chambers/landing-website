// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

// --- Mock Blog Data (Replace with TinaCMS fetch later) ---
const mockPostsData: { [key: string]: any } = {
  'understanding-recent-ibc-amendments': {
    slug: 'understanding-recent-ibc-amendments',
    title: 'Understanding Recent Amendments to the Insolvency and Bankruptcy Code (IBC)',
    content: `
      <p>The Insolvency and Bankruptcy Code (IBC), 2016, marked a significant shift in India's insolvency resolution framework. Recent amendments continue to refine the process, aiming for quicker resolutions and better outcomes. This post explores the key changes introduced in the latest amendment act and their potential impact.</p>
      <h3 class="font-semibold font-heading text-xl mt-6 mb-2">Key Amendment Highlights:</h3>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Pre-packaged Insolvency for MSMEs:</strong> Introduction of a streamlined pre-packaged insolvency resolution process (PPIRP) specifically designed for Micro, Small, and Medium Enterprises (MSMEs). This aims to provide a faster, cost-effective resolution mechanism while allowing existing management to retain control under supervision.</li>
        <li><strong>Cross-Border Insolvency Framework:</strong> While not fully implemented via this amendment, provisions lay the groundwork for adopting the UNCITRAL Model Law on Cross-Border Insolvency, facilitating cooperation between Indian courts and foreign jurisdictions.</li>
        <li><strong>Enhancements to CIRP:</strong> Clarifications regarding the treatment of avoidance transactions, distribution waterfalls, and timelines within the Corporate Insolvency Resolution Process (CIRP).</li>
        <li><strong>Strengthening Creditor Rights:</strong> Measures aimed at ensuring timely admission of applications and protecting the rights of financial and operational creditors during the process.</li>
      </ul>
      <h3 class="font-semibold font-heading text-xl mt-6 mb-2">Implications:</h3>
      <p>These amendments are expected to further improve the efficiency of the IBC framework, particularly benefiting the MSME sector. The focus on pre-packs could lead to less disruption for viable businesses. The move towards a formal cross-border insolvency regime is crucial for handling complex international insolvencies involving Indian entities.</p>
      <blockquote class="border-l-4 border-accent pl-6 py-2 italic text-foreground/80 my-6">
        "The continuous evolution of the IBC reflects India's commitment to creating a robust and globally benchmarked insolvency resolution ecosystem."
      </blockquote>
      <p>Businesses and creditors must stay abreast of these changes to effectively navigate the insolvency landscape. Understanding the nuances of PPIRP and the enhanced CIRP provisions will be key to leveraging the Code effectively.</p>
      `,
    date: new Date('2024-07-15'),
    author: 'Hari G Ramasubramanian',
    authorSlug: 'hari-g-ramasubramanian', // Link to author's team page profile
    image: 'https://picsum.photos/seed/blog1/800/400', // Larger image for detail page
    tags: ['IBC', 'Insolvency', 'Corporate Law', 'MSME'],
  },
  'navigating-data-privacy-dpdpa': {
    slug: 'navigating-data-privacy-dpdpa',
    title: 'Navigating India\'s Digital Personal Data Protection Act (DPDPA) 2023',
    content: `
      <p>India's Digital Personal Data Protection Act (DPDPA), 2023, introduces a comprehensive framework for processing personal data. Replacing earlier IT rules, the DPDPA imposes significant obligations on organizations (Data Fiduciaries) handling the data of individuals (Data Principals).</p>
      <h3 class="font-semibold font-heading text-xl mt-6 mb-2">Core Principles and Obligations:</h3>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Consent-Based Processing:</strong> Consent is the primary ground for processing personal data, requiring clear, informed, and specific consent obtained via a notice.</li>
        <li><strong>Legitimate Uses:</strong> The Act defines certain 'Legitimate Uses' where processing is permitted without explicit consent (e.g., voluntary data sharing, compliance with law, employment purposes).</li>
        <li><strong>Data Principal Rights:</strong> Individuals have rights to access, correct, erase their data, and grievance redressal.</li>
        <li><strong>Significant Data Fiduciaries (SDFs):</strong> Entities classified as SDFs based on data volume/sensitivity face higher obligations, including appointing Data Protection Officers (DPOs) and conducting Data Protection Impact Assessments (DPIAs).</li>
        <li><strong>Cross-Border Data Transfer:</strong> Transfers are generally permitted to countries not restricted by the central government, simplifying previous rules.</li>
        <li><strong>Penalties for Non-Compliance:</strong> The Act introduces substantial financial penalties for breaches.</li>
      </ul>
      <h3 class="font-semibold font-heading text-xl mt-6 mb-2">Compliance Steps for Businesses:</h3>
      <p>Organizations must review their data processing activities, update privacy policies, implement robust consent mechanisms, establish procedures for handling Data Principal requests, and enhance security measures. Training employees on data privacy is also crucial.</p>
      <p>The DPDPA marks a new era for data privacy in India. Proactive compliance is essential to avoid penalties and build trust with customers and employees.</p>
      `,
    date: new Date('2024-06-28'),
    author: 'Varsha Chandrasekaran',
    authorSlug: 'varsha-chandrasekaran',
    image: 'https://picsum.photos/seed/blog2/800/400',
    tags: ['Data Privacy', 'DPDPA', 'Regulatory Compliance', 'Technology Law'],
  },
  'ip-protection-strategies-startups': {
    slug: 'ip-protection-strategies-startups',
    title: 'Essential IP Protection Strategies for Startups in India',
    content: `
      <p>For startups, intellectual property (IP) is often their most valuable asset. Protecting IP early and effectively is crucial for growth, securing funding, and maintaining a competitive edge in the Indian market.</p>
      <h3 class="font-semibold font-heading text-xl mt-6 mb-2">Key IP Assets & Protection:</h3>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Trademarks:</strong> Protect your brand name, logo, and taglines. Conduct thorough searches before finalizing a brand and file for registration early. Monitor for infringements.</li>
        <li><strong>Copyrights:</strong> Automatically protects original literary, artistic, dramatic, musical works, software code, and website content. Registration provides stronger evidence of ownership.</li>
        <li><strong>Patents:</strong> Protect novel inventions and technological processes. File provisional applications early, followed by complete specifications. Consider utility and design patents.</li>
        <li><strong>Designs:</strong> Protect the unique visual appearance (shape, configuration, pattern) of a product.</li>
        <li><strong>Trade Secrets:</strong> Protect confidential business information (formulas, customer lists, strategies) through NDAs and robust internal security measures.</li>
      </ul>
      <h3 class="font-semibold font-heading text-xl mt-6 mb-2">Strategic Considerations:</h3>
      <p>Develop an IP strategy aligned with your business goals. Secure IP ownership from founders, employees, and contractors through proper agreements. Conduct freedom-to-operate searches to avoid infringing others' IP. Budget for IP protection and enforcement.</p>
      <p>Investing in IP protection from the outset is a vital step for any startup aiming for long-term success in India and beyond.</p>
      `,
    date: new Date('2024-05-10'),
    author: 'S. Manasa', // Using name from team page
    authorSlug: 's-manasa', // Link to author's team page profile
    image: 'https://picsum.photos/seed/blog3/800/400',
    tags: ['Intellectual Property', 'Startups', 'Trademarks', 'Patents', 'Copyrights'],
  },
  // Add more mock posts corresponding to the listing page
};

// Function to get post data (replace with TinaCMS client fetch later)
async function getPostData(slug: string) {
  // Simulate fetching data
  return mockPostsData[slug] || null;
}

// Generate static paths for Next.js build
export async function generateStaticParams() {
   // In real app, fetch slugs from TinaCMS
  return Object.keys(mockPostsData).map((slug) => ({
    slug,
  }));
}


// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  // Basic excerpt generation (replace with better logic if needed)
  const excerptMatch = post.content.match(/<p>(.*?)<\/p>/);
  const description = excerptMatch ? excerptMatch[1].substring(0, 160) + "..." : `Read the article: ${post.title}`;

  return {
    title: `${post.title} | Blog`,
    description: description,
    openGraph: {
        title: post.title,
        description: description,
        type: 'article',
        publishedTime: post.date.toISOString(),
        authors: [post.author],
        images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: description,
        images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound(); // Show 404 if post data doesn't exist
  }

  // Find author's LinkedIn URL (requires teamMembers data access - simplified for now)
  // In a real app, you might fetch team data or have it available contextually
  const authorLinkedIn = "#"; // Placeholder

  return (
    <>
      {/* Simple Header Section */}
      <section className="bg-secondary py-10 md:py-16">
        <div className="container-max">
           {/* <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.title } // Keep title short or truncate
            ]} className="text-primary/80 mb-4" /> */}
           <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary leading-tight">
             {post.title}
           </h1>
           <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4 mt-4">
              <div className="flex items-center">
                 <Calendar className="mr-1.5 h-4 w-4 text-accent" />
                 Published on {format(post.date, 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center">
                 <User className="mr-1.5 h-4 w-4 text-accent" />
                 By{' '}
                 {post.authorSlug ? (
                    <Link href={`/team/${post.authorSlug}`} className="ml-1 font-medium text-primary hover:text-accent transition-colors">
                       {post.author}
                    </Link>
                 ) : (
                    <span className="ml-1 font-medium">{post.author}</span>
                 )}
                {/* Optionally add LinkedIn link if available */}
                {/* {authorLinkedIn && authorLinkedIn !== '#' && (
                     <a href={authorLinkedIn} target="_blank" rel="noopener noreferrer" className="ml-2 text-muted-foreground hover:text-primary">
                        <Linkedin className="h-4 w-4" />
                     </a>
                )} */}
              </div>
           </div>
        </div>
      </section>

      {/* Post Content Section */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl mx-auto">
           {/* Featured Image */}
            {post.image && (
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority // Prioritize loading the main post image
                  />
                </div>
            )}

          {/* Article Content */}
          <article
             className="prose prose-lg lg:prose-xl max-w-none text-foreground/90 prose-headings:font-heading prose-headings:text-primary prose-a:text-primary hover:prose-a:text-accent prose-blockquote:border-accent prose-ul:list-disc prose-ol:list-decimal prose-strong:font-semibold"
             dangerouslySetInnerHTML={{ __html: post.content }} // Use dangerouslySetInnerHTML for mock HTML
             // For TinaCMS, use <TinaMarkdown content={post.body} />
           />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
             <div className="mt-10 pt-6 border-t">
               <span className="font-semibold mr-2">Tags:</span>
               {post.tags.map((tag: string) => (
                  <span key={tag} className="inline-block bg-secondary text-foreground/80 rounded px-2 py-0.5 text-xs font-medium mr-2 mb-2">
                     {tag}
                  </span>
               ))}
             </div>
          )}

          {/* Back Button */}
           <div className="mt-12 text-center">
              <Link href="/blog" passHref>
                 <Button variant="outline">
                   <ArrowLeft className="mr-2 h-4 w-4" />
                   Back to Blog List
                 </Button>
              </Link>
           </div>

        </div>
      </section>

      {/* Related Posts (Optional - Add later) */}
      {/* <section className="section-padding-sm bg-secondary">
        <div className="container-max">
          <SectionHeading title="Related Articles" centered />
          Add grid of related post cards here
        </div>
      </section> */}
    </>
  );
}

// Required for dynamic routes if `generateStaticParams` is used
export const dynamicParams = true;
