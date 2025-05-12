import Link from 'next/link';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-white/80 mb-2", className)}>
      <ol className="flex items-center space-x-1.5">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            <li>
              {item.href ? (
                <Link href={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-white">{item.label}</span>
              )}
            </li>
            {index < items.length - 1 && (
              <li>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-white/60" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
