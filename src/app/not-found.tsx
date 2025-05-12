
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4 bg-secondary">
       <div className="container-max py-16">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
           <SectionHeading title="Page Not Found" centered className="mb-6" />
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            We're sorry, but the page you were looking for doesn't seem to exist or may have been moved.
          </p>
          <Link href="/" passHref>
             <Button className="btn-cta">
                Go Back to Homepage
             </Button>
          </Link>
       </div>
    </div>
  );
}
        