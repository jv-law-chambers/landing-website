
import Link from "next/link";
import { Mail, MapPin, Phone, Globe } from "lucide-react"; // Added Globe icon

export function Footer() {
  // **Updated details**
  const address = "Bhaskara Apartments, No. 28, Pycroft’s Garden Road, Nungambakkam, Chennai, India";
  const phone = "+91 91766 24466";
  const email = "mail@grhari.com";
  const website = "https://www.grhari.com"; // Full website URL
  const currentYear = new Date().getFullYear();
  const siteName = "Law Chambers of G.R. Hari";
  const siteDomain = "grhari.com"; // Domain name

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-max py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold hover:text-accent transition-colors">
                {siteName}
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              A leading Indian law firm providing comprehensive legal solutions with integrity and expertise. We are dedicated to navigating complex legal challenges and achieving optimal outcomes for our clients.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/team" className="hover:text-accent transition-colors">Our Team</Link></li>
              <li><Link href="/practice-areas" className="hover:text-accent transition-colors">Practice Areas</Link></li>
              <li><Link href="/research" className="hover:text-accent transition-colors">Research</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li> {/* Added Blog */}
              <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-accent">Contact Information</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-1 flex-shrink-0 text-accent" />
                {/* Use an anchor tag for address linking to maps */}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    Bhaskara Apartments, No. 28,<br/>
                    Pycroft’s Garden Road,<br/>
                    Nungambakkam, Chennai, India
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-accent" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">{phone}</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent" />
                <a href={`mailto:${email}`} className="hover:text-accent transition-colors">{email}</a>
              </li>
               <li className="flex items-center">
                 <Globe className="h-4 w-4 mr-3 text-accent" />
                 <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{siteDomain}</a>
               </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 py-4">
        <div className="container-max flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/60">
          <p>&copy; {currentYear} {siteName}. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-accent transition-colors">Terms of Use</Link>
            <Link href="/disclaimer" className="hover:text-accent transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
