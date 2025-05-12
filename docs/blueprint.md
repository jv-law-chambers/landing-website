# **App Name**: Hari Legal

## Core Features:

- Basic Layout: Implements the general layout as requested in the prompt, with a header, footer, and main sections for content.
- Page routing: Creates the requested pages, including Home, About Us, Team, Research, Practice Areas, Careers and Contact Us.
- Contact Form Submission: A contact form submission with email notification to administrator

## Style Guidelines:

- Primary color: Dark gray (#333333) for text and primary elements.
- Secondary color: Deep navy blue (#1a2a43) for accents, highlights and section backgrounds.
- Accent color: Teal (#008080) for CTAs and highlights.
- Implement a responsive design that adapts to different screen sizes.
- Universal Elements: Icons should be simple line icons to match the modern aesthetic.

## Original User Request:
# Firebase Studio Prompt: Law Chambers of G.R. Hari Website

## Overview

Create a minimalistic, professional website for "Law Chambers of G.R. Hari," a law firm in India. The design should convey trust, expertise, and professionalism while maintaining a clean, modern aesthetic. The site should be easy to navigate, with clear hierarchy and readable typography.

## Brand Guidelines

### Color Palette
- Primary: Dark gray (#333333) for text and primary elements
- Secondary: Deep navy blue (#1a2a43) for accents, highlights, and section backgrounds
- Tertiary: Gold/amber (#c8a45e) for subtle accent elements and call-to-action buttons
- Background: Off-white (#f8f8f8) for main backgrounds
- White (#ffffff) for content sections and cards
- Light gray (#f2f2f2) for alternate section backgrounds

### Typography
- Headings: Playfair Display (serif) for all headings to convey tradition and expertise
- Body text: Open Sans (sans-serif) for readability at 16px
- Line height: 1.6 for body text for improved readability
- Font weights: Regular (400) for body text, Semi-bold (600) for subheadings, Bold (700) for headings

### Universal Elements

#### Header
- Fixed position, 80px height on desktop, 60px on mobile
- Logo (text-based "Law Chambers of G.R. Hari" in Playfair Display, 24px) on the left
- Main navigation right-aligned with dropdowns for practice areas
- Mobile: Hamburger menu with smooth slide-in animation
- Contact phone number visible on desktop header
- Subtle white background with box-shadow: 0px 2px 10px rgba(0,0,0,0.05)

#### Footer
- Three-column layout on desktop, stacked on mobile
- Column 1: Logo and brief 2-3 sentence description
- Column 2: Quick links to main pages (About, Team, Practice Areas, Careers, Contact)
- Column 3: Contact information (address, phone, email)
- Background color: Deep navy blue (#1a2a43)
- Text color: White
- Bottom bar with copyright notice and privacy/terms links
- 40px top and bottom padding, 80px on desktop

#### Call-to-Action Buttons
- Primary: Gold/amber (#c8a45e) with white text
- Hover state: Slightly darker gold (#b69351)
- Subtle rounded corners (4px border-radius)
- Padding: 12px 24px
- Text: 16px, uppercase, 1px letter spacing

#### Section Headings
- Large (36px desktop, 28px mobile) Playfair Display
- Left-aligned with 2px gold accent line underneath (40px width)
- 40px bottom margin to separate from content

#### Navigation
- Desktop: Horizontal menu with dropdown capability
- Dropdown menus appear on hover with slight animation
- Mobile: Full-screen overlay with animated hamburger icon
- Current page indicated with subtle gold underline

#### Disclaimer Pop-up
- Appears once per session before accessing site
- Centered modal with semi-transparent overlay background
- Width: Maximum 500px
- White background with 20px padding
- Close button (X) in top right corner
- "I Accept" button in gold/amber (#c8a45e)

## Page-Specific Designs

### 1. Homepage

**Hero Section**
- Full-width, 60vh height on desktop, 40vh on mobile
- Background: Deep navy blue gradient (#1a2a43 to #2c3e50)
- Headline: "Comprehensive Legal Services in India" in Playfair Display, 48px, white, centered
- Subheadline: 1-2 sentence summary from homepage contents, 20px, light gray
- CTA Button: "Schedule a Consultation" in gold/amber (#c8a45e)
- Subtle parallax effect on scroll

**Introduction Section**
- White background with 100px padding (top/bottom) on desktop, 60px on mobile
- Two-column layout on desktop: 40% left column with heading, 60% right column with text
- Single column on mobile
- Heading: "Law Chambers of G.R. Hari" in Playfair Display, 36px
- Text: First paragraph from "Homepage contents" section
- Bottom: Subtle divider line in light gray

**Practice Areas Highlight**
- Light gray background (#f2f2f2)
- 100px padding (top/bottom) on desktop, 60px on mobile
- Heading: "Our Practice Areas" with gold accent line
- Grid layout: 3 cards per row on desktop, 1 per row on mobile
- Cards: White background, subtle shadow, 30px padding
- Each card: Icon (using simple line icons), heading in semi-bold, 2-3 sentence description
- Card hover effect: Slight elevation (box-shadow increase)
- "Learn More" text link at bottom of each card with right arrow icon
- Display 6 main practice areas with links to respective pages

**About Us Preview**
- White background
- Two-column layout on desktop: Image placeholder left (400px x 400px), text right
- Single column on mobile
- Text: Condensed version of "About Us" content
- CTA button: "Learn More About Us" linking to About page

**Contact CTA Section**
- Deep navy blue background (#1a2a43)
- White text, centered
- 100px padding on desktop, 60px on mobile
- Heading: "Get Expert Legal Guidance Today"
- 1-2 sentence call to action
- Gold CTA button: "Contact Us Now" linking to contact page
- Phone number displayed below button

### 2. About Us Page

**Hero Section**
- Smaller version of homepage hero (40vh height)
- Heading: "About Us" in white, centered
- Breadcrumb navigation above heading: Home > About Us

**Mission & Values**
- White background, 80px padding
- Two-column layout on desktop, single column on mobile
- Left: Heading "Our Mission" with gold accent line, followed by mission statement in slightly larger text (20px)
- Right: "Our Values" with 3-4 core values, each with small icon and 2-3 sentence description
- Values displayed in grid: 2x2 on desktop, stacked on mobile

**Firm History & Approach**
- Light gray background (#f2f2f2)
- 80px padding
- Single column, centered content max-width 800px
- Text from "About Us" section, properly formatted with headings and paragraphs
- Quote block for important statements: Left border in gold, slight indent, italic font

**Team Preview**
- White background
- Heading: "Our Team" with link to full team page
- Display 2-3 key team members with small photos, names, positions
- "Meet Our Full Team" button at bottom

### 3. Team Page

**Hero Section**
- Same style as About Us hero
- Heading: "Our Team" in white, centered
- Breadcrumb navigation: Home > Our Team

**Team Grid**
- White background, 80px padding
- Heading: "Meet Our Legal Experts" with gold accent line
- Grid layout: 3 cards per row on desktop, 2 on tablet, 1 on mobile
- Each card:
  - Professional photo (1:1 ratio, 300px x 300px)
  - White background with subtle shadow
  - Name in Playfair Display, 24px
  - Position in gold, uppercase, 14px
  - 3-4 sentence bio
  - LinkedIn icon linking to profile
- Card hover effect: Subtle scale (1.02) and shadow increase

**Team Intro Section**
- Light gray background (#f2f2f2)
- 80px padding
- Centered text (max-width 800px)
- 1-2 paragraphs about the collective expertise and approach of the team

### 4. Research Page

**Hero Section**
- Same style as other secondary pages
- Heading: "Research" in white, centered
- Breadcrumb navigation: Home > Research

**Intro Section**
- White background, 80px padding
- Heading: "Elevating Legal Research with Expert-Driven Insights" with gold accent line
- Text from first paragraph of Research section
- Link to research.grhari.com in styled button

**Core Mission Section**
- Light gray background (#f2f2f2)
- 80px padding
- Heading: "Our Core Mission" with gold accent line
- Four cards in grid (2x2 on desktop, 1x4 on mobile)
- Each card: Heading, icon, and text for each mission point from document
- Cards have white background, subtle shadow, 30px padding

**Methodology Section**
- White background, 80px padding
- Heading: "Our Methodology: The Synergy of Expertise and Technology"
- Text from methodology section
- Followed by 5 methodology points in an accordion-style expandable list
- Each point has icon, heading, and expandable text

**Expertise Section**
- Deep navy blue background (#1a2a43)
- White text, 80px padding
- Heading: "The Expertise Behind the Innovation" in white
- Four columns on desktop, stacked on mobile
- Each column: One expertise point with icon and text
- Subtle gold accent elements

**Beneficiaries Section**
- White background, 80px padding
- Heading: "Who Benefits from Our Research"
- Four-column layout on desktop, 2x2 grid on tablet, stacked on mobile
- Each column: Beneficiary type (Legal Practitioners, Legal Academics, etc.), icon, and description
- Each column separated by subtle vertical divider on desktop

**CTA Section**
- Light gray background (#f2f2f2)
- 80px padding
- Heading: "Join Our Pursuit of Deep Legal Understanding"
- Text from final paragraph
- CTA button linking to contact page

### 5. Practice Areas Main Page

**Hero Section**
- Same style as other secondary pages
- Heading: "Practice Areas" in white, centered
- Breadcrumb navigation: Home > Practice Areas

**Intro Section**
- White background, 80px padding
- Brief introduction to the firm's practice areas
- Text highlighting the firm's approach to legal services

**Practice Areas Grid**
- Light gray background (#f2f2f2)
- 80px padding
- Grid of cards: 3 per row on desktop, 2 on tablet, 1 on mobile
- Each card:
  - White background, subtle shadow
  - Icon representing practice area
  - Practice area name in Playfair Display, 24px
  - 2-3 sentence description
  - "Learn More" button linking to specific practice area page
- Cards have equal height with fixed aspect ratio
- Hover effect: Slight elevation and gold accent

### 6. Individual Practice Area Pages

**Hero Section**
- Same style as other secondary pages
- Heading: "[Practice Area Name]" in white, centered
- Breadcrumb navigation: Home > Practice Areas > [Practice Area Name]

**Overview Section**
- White background, 80px padding
- Heading: "Overview" with gold accent line
- Text from introduction of the specific practice area
- Key points highlighted in styled bullet points

**Services Tabs**
- Light gray background (#f2f2f2)
- 80px padding
- Tab navigation: "Advisory Services", "Litigation & Dispute Resolution", "Documentation", etc.
- Tab content changes without page reload
- Active tab indicated with gold underline
- Content formatted with headings, paragraphs, and bullet points as in the document

**Service Details Accordion**
- White background, 80px padding
- Expandable accordion for detailed service descriptions
- Each accordion item:
  - Heading with plus/minus icon
  - Expanded content with formatted text
  - Subtle animation for expanding/collapsing
- Allows for detailed content without overwhelming the page

**Case Studies/Expertise Highlights**
- Light gray background (#f2f2f2)
- 80px padding
- 2-3 cards highlighting expertise or case studies in this practice area
- Each card with heading, brief description, and "Read More" link

**Team Members Specializing in This Area**
- White background, 80px padding
- Horizontal scrollable list on mobile, grid on desktop
- Profile cards with photos, names, and specialization

**Related Practice Areas**
- Deep navy blue background (#1a2a43)
- White text, 80px padding
- 3-4 related practice areas with links to respective pages
- Displayed as horizontal cards with slight overlap

**CTA Section**
- White background, 80px padding
- Heading: "Need Help With [Practice Area]?"
- Brief text about consultation
- Gold CTA button: "Schedule a Consultation" linking to contact page

### 7. Careers Page

**Hero Section**
- Same style as other secondary pages
- Heading: "Careers" in white, centered
- Breadcrumb navigation: Home > Careers

**Intro Section**
- White background, 80px padding
- Heading: "Unleash Your Legal Potential. Join Our Team."
- Text from first paragraph of Careers section
- Styled quote or testimonial from team member

**Our Commitment Section**
- Light gray background (#f2f2f2)
- 80px padding
- Heading: "Our Commitment to Our Team" with gold accent line
- Two-column layout on desktop, single column on mobile
- Left: Text from commitment section
- Right: Benefits listed with icons (Meaningful Work, Continuous Learning, etc.)

**Current Openings Section**
- White background, 80px padding
- Heading: "Current Openings" with gold accent line
- Jobs listed as expandable cards
- Each card:
  - Job title and location in header
  - Expand/collapse icon
  - When expanded: Responsibilities, Requirements
  - "Apply Now" button that scrolls to application form

**Why Join Us Section**
- Deep navy blue background (#1a2a43)
- White text, 80px padding
- Heading: "Why Join Us?" in white
- Points listed with icons and brief descriptions
- Styled quote or testimonial

**Equal Opportunity Statement**
- Light gray background (#f2f2f2)
- 40px padding
- Text from "We Are an Equal Opportunity Employer" section
- Simple, dignified presentation with slight emphasis

**Application Form**
- White background, 80px padding
- Heading: "Tell Us About Yourself"
- Styled form with fields from "Tell Us About Yourself" section
- Form validation with helpful error messages
- File upload for resume with drag-and-drop capability
- Submit button in gold

### 8. Contact Page

**Hero Section**
- Same style as other secondary pages
- Heading: "Contact Us" in white, centered
- Breadcrumb navigation: Home > Contact

**Contact Information Section**
- White background, 80px padding
- Two-column layout on desktop, stacked on mobile
- Left column:
  - Heading: "Get in Touch" with gold accent line
  - Address with icon
  - Phone number with icon
  - Email with icon
  - Office hours with icon
- Right column:
  - Google Maps integration showing office location
  - 400px height, responsive width
  - Custom map pin with firm logo

**Contact Form**
- Light gray background (#f2f2f2)
- 80px padding
- Heading: "Send Us a Message" with gold accent line
- Form fields:
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Subject dropdown (General Inquiry, Schedule Consultation, Career Opportunity, etc.)
  - Message (required)
  - CAPTCHA or similar to prevent spam
- Submit button in gold
- Success message appears in place of form after submission

## Technical Specifications

### Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and above

### Performance Requirements
- Page load time under 3 seconds
- Google PageSpeed score of 90+ for mobile and desktop
- All images to be properly sized and compressed
- Lazy loading for images below the fold
- Critical CSS inlined in the head
- Deferred loading of non-critical JavaScript

### Accessibility Requirements
- WCAG 2.1 AA compliant
- Proper ARIA labels for all interactive elements
- Keyboard navigable interface
- Sufficient color contrast (minimum 4.5:1 for normal text)
- Alternative text for all images
- Proper heading hierarchy

### SEO Specifications
- Custom meta title and description for each page
- Structured data for organization and local business
- XML sitemap generation
- Canonical URLs
- Proper use of heading tags (H1, H2, H3, etc.)
- Optimized image alt text
- Mobile-friendly design (Google mobile-friendly test passing)

### Required Functionality
- Contact form submission with email notification to administrator
- Google Maps integration on contact page
- Responsive navigation with dropdowns
- Careers page application form with file upload
- Cookie consent notification
- Disclaimer pop-up with session storage
- Google Analytics integration
- Back to top button appears when scrolling

## Development Timeline and Deliverables

1. **Design Phase (2 weeks)**
   - Wireframes for all page templates
   - High-fidelity mockups for homepage and one internal page
   - Style guide with typography, colors, and UI components
   - Client review and approval

2. **Development Phase (4 weeks)**
   - Frontend development
   - Backend functionality for forms
   - CMS integration (if applicable)
   - Responsive testing
   - Initial client review

3. **Content Integration (2 weeks)**
   - Population of all content from provided document
   - Optimization of images and media
   - SEO implementation

4. **Testing and Refinement (1 week)**
   - Cross-browser testing
   - Performance optimization
   - Accessibility auditing
   - Bug fixing

5. **Launch (1 week)**
   - Final client approval
   - Deployment to production
   - DNS configuration
   - Post-launch testing

The final website should be a polished, professional representation of "Law Chambers of G.R. Hari" that effectively communicates their expertise, services, and values while providing a seamless user experience for potential clients.
  