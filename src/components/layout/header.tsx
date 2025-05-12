// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import * as React from "react";
import { Menu, Phone, X, ChevronDown, Briefcase, Scale, Landmark, Building, UserCheck, CheckSquare, FileText, Anchor } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';

// **Ensure these match the actual structure in [slug]/page.tsx**
const practiceAreas = [
  { title: "Corporate & Commercial Law", href: "/practice-areas/corporate-law", description: "Advising on formations, M&A, governance, and compliance.", icon: Briefcase },
  { title: "Commercial Litigation", href: "/practice-areas/commercial-litigation", description: "Representing clients in complex business disputes and arbitration.", icon: Scale },
  { title: "Intellectual Property", href: "/practice-areas/intellectual-property", description: "Protecting trademarks, copyrights, patents, and trade secrets.", icon: Landmark },
  { title: "Real Estate Law", href: "/practice-areas/real-estate-law", description: "Handling property transactions, leasing, and development projects.", icon: Building },
  { title: "Employment Law", href: "/practice-areas/employment-law", description: "Advising on labor regulations, contracts, and workplace disputes.", icon: UserCheck },
  { title: "Regulatory Compliance", href: "/practice-areas/regulatory-compliance", description: "Navigating complex regulatory landscapes across industries.", icon: CheckSquare },
  { title: "Tax Law", href: "/practice-areas/tax-law", description: "Providing strategic advice on direct and indirect taxation matters.", icon: FileText },
  { title: "Insolvency & Bankruptcy", href: "/practice-areas/insolvency-bankruptcy", description: "Assisting creditors and debtors through insolvency proceedings.", icon: Anchor },
  // Add more if needed
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Team", href: "/team" },
  // Practice Areas handled by NavigationMenu
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" }, // Added Blog link
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const logoText = "H."; // Use "H." for the logo
  const contactPhoneNumber = "+91 91766 24466";
  const contactPhoneNumberHref = `tel:${contactPhoneNumber.replace(/\s/g, '')}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
      <div className="container-max flex h-16 md:h-20 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2 shrink-0" onClick={() => setIsOpen(false)}>
          <span className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground hover:text-primary transition-colors">
            {logoText}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList>
            {/* Render first 3 links */}
            {navLinks.slice(0, 3).map((link) => (
              <NavigationMenuItem key={link.label}>
                <Link href={link.href} legacyBehavior passHref>
                   <NavigationMenuLink
                     className={cn(navigationMenuTriggerStyle(), 'relative')}
                     data-active={pathname === link.href ? 'true' : undefined}
                   >
                     {link.label}
                     {pathname === link.href && <span className="absolute bottom-1 left-2 right-2 h-[2px] bg-accent" />}
                   </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            
            {/* Render remaining links (starting from index 3) */}
            {navLinks.slice(3).map((link) => (
             <NavigationMenuItem key={link.label}>
               <Link href={link.href} legacyBehavior passHref>
                 <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), 'relative')}
                    data-active={pathname === link.href ? 'true' : undefined}
                 >
                    {link.label}
                    {pathname === link.href && <span className="absolute bottom-1 left-2 right-2 h-[2px] bg-accent" />}
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
            ))}

          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Contact Info & Mobile Trigger */}
        <div className="flex items-center justify-end space-x-4 ml-auto">
          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-white p-0 flex flex-col">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-4 border-b">
                
                 <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <SheetTitle className="font-heading text-lg font-bold text-foreground">Menu</SheetTitle>
                 </Link>
                <SheetDescription className="text-sm text-muted-foreground px-4">
                </SheetDescription>

                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close Menu</span>
                </Button>
              </div>
              {/* Mobile Menu Links */}
              <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                 {navLinks.map((link) => (
                   <Link
                     key={link.label}
                     href={link.href}
                     className={cn(
                       "block rounded-md px-3 py-2 text-base font-medium hover:bg-secondary",
                       pathname === link.href ? "bg-secondary text-primary font-semibold" : "text-foreground"
                     )}
                     onClick={() => setIsOpen(false)}
                   >
                     {link.label}
                   </Link>
                 ))}
              </nav>
              {/* Mobile Menu Footer (Contact) */}
              <div className="border-t p-4 mt-auto">
                 <a href={contactPhoneNumberHref} className="flex items-center text-sm font-semibold text-foreground hover:text-primary transition-colors w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    {contactPhoneNumber}
                  </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    'data-active'?: string;
    icon: React.ElementType;
  }
>(({ className, title, href, icon: Icon, 'data-active': active, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '#'}
          ref={ref}
          data-active={active ? 'true' : undefined}
          className={cn(
            "group flex select-none items-center space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            active === 'true' && "bg-accent/10 text-primary font-semibold",
            className
          )}
          {...props}
        >
          <Icon className="h-5 w-5 text-primary/80 group-hover:text-accent-foreground flex-shrink-0" />
          <div className="text-sm font-medium leading-none group-hover:text-accent-foreground">{title}</div>
          {children && <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-accent-foreground/90">{children}</p>}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

