// src/app/blog/page.tsx
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { SectionHeading } from '@/components/section-heading';
// import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

// --- Mock Blog Data (Replace with TinaCMS fetch later) ---
const mockPosts = [
  {
    slug: 'understanding-recent-ibc-amendments',
    title: 'Understanding Recent Amendments to the Insolvency and Bankruptcy Code (IBC)',
    excerpt: 'A deep dive into the latest changes in the IBC and their implications for creditors and debtors in India.',
    date: new Date('2024-07-15'),
    author: 'Hari G Ramasubramanian',
    image: 'https://picsum.photos/seed/blog1/400/250', // Placeholder
    tags: ['IBC', 'Insolvency', 'Corporate Law'],
  },
  {
    slug: 'navigating-data-privacy-dpdpa',
    title: 'Navigating India\'s Digital Personal Data Protection Act (DPDPA) 2023',
    excerpt: 'Key compliance requirements and strategic considerations for businesses under the new data privacy regime.',
    date: new Date('2024-06-28'),
    author: 'Varsha Chandrasekaran',
    image: 'https://picsum.photos/seed/blog2/400/250', // Placeholder
    tags: ['Data Privacy', 'DPDPA', 'Regulatory Compliance'],
  },
  {
    slug: 'ip-protection-strategies-startups',
    title: 'Essential IP Protection Strategies for Startups in India',
    excerpt: 'How new ventures can safeguard their trademarks, copyrights, and patents effectively in the Indian market.',
    date: new Date('2024-05-10'),
    author: 'Advocate Name 2', // Replace with actual author if available
    image: 'https://picsum.photos/seed/blog3/400/250', // Placeholder
    tags: ['Intellectual Property', 'Startups', 'Trademarks', 'Patents'],
  },
  // Add more mock posts
];

export const metadata = {
  title: 'Blog | Law Chambers of G.R. Hari',
  description: 'Read the latest insights, articles, and legal updates from the experts at Law Chambers of G.R. Hari.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  // In a real app, fetch posts from TinaCMS here

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-primary text-white flex items-center justify-center text-center"
        style={{ minHeight: 'calc(40vh - 80px)' }}
      >
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="container-max relative z-10 py-12 md:py-16">
          {/* <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} /> */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2">
            Legal Insights & Updates
          </h1>
           <p className="text-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
             Explore articles, analysis, and commentary on significant legal developments in India from our team.
           </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          {mockPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockPosts.map((post) => (
                <Card key={post.slug} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white group">
                   <Link href={`/blog/${post.slug}`} className="block aspect-video relative overflow-hidden">
                      <Image
                         src={post.image}
                         alt={post.title}
                         fill
                         style={{ objectFit: 'cover' }}
                         className="transition-transform duration-300 group-hover:scale-105"
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                   </Link>
                  <CardHeader className="pb-3">
                    <Link href={`/blog/${post.slug}`}>
                       <CardTitle className="font-heading text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    </Link>
                    <div className="flex items-center text-xs text-muted-foreground space-x-4 pt-2">
                      <span className="flex items-center">
                        <Calendar className="mr-1.5 h-3.5 w-3.5" />
                        {format(post.date, 'MMM d, yyyy')}
                      </span>
                      <span className="flex items-center">
                        <User className="mr-1.5 h-3.5 w-3.5" />
                        {post.author}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow pb-4">
                    <CardDescription className="text-sm line-clamp-3">{post.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0 mt-auto">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent group/link">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SectionHeading title="No Posts Yet" centered />
              <p className="text-muted-foreground">Check back soon for our latest insights!</p>
            </div>
          )}

          {/* Pagination (Optional - Add later if needed) */}
          {/* <div className="mt-12 flex justify-center">
            Add pagination controls here
          </div> */}
        </div>
      </section>

      {/* CTA Section (Optional) */}
      <section className="section-padding-sm bg-white">
         <div className="container-max text-center max-w-3xl mx-auto">
            <SectionHeading title="Stay Updated" centered />
           <p className="text-lg text-muted-foreground mb-8">
             Don't miss our latest legal analysis. Subscribe to our newsletter or follow us for regular updates.
           </p>
           {/* Add Newsletter Signup or Social Links */}
           <Link href="/contact" passHref>
             <Button className="btn-cta">Contact Us</Button>
           </Link>
         </div>
       </section>
    </>
  );
}
