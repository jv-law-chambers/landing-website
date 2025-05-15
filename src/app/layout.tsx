import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { DisclaimerPopup } from "@/components/layout/disclaimer-popup";
import { BackToTopButton } from "@/components/layout/back-to-top-button";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Law Chambers of G.R. Hari",
    template: "%s | Law Chambers of G.R. Hari",
  },
  description: "Providing comprehensive legal services in India with expertise and professionalism. Contact the Law Chambers of G.R. Hari for expert legal guidance.",
  keywords: ["law firm india", "legal services india", "G.R. Hari advocate", "indian law", "corporate law", "litigation india"],
  openGraph: {
      title: 'Law Chambers of G.R. Hari',
      description: 'Comprehensive Legal Services in India.',
      url: 'https://grhari.com', // Replace with actual URL
      siteName: 'Law Chambers of G.R. Hari',
      // images: [ // Add image later
      //   {
      //     url: 'https://grhari.com/og-image.jpg',
      //     width: 1200,
      //     height: 630,
      //   },
      // ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Law Chambers of G.R. Hari',
      description: 'Comprehensive Legal Services in India.',
      // images: ['https://grhari.com/twitter-image.jpg'], // Add image later
    },
    // Add structured data later
    // verification: {
    //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
    // },
    alternates: {
      canonical: 'https://grhari.com', // Replace with actual URL
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(playfairDisplay.variable, openSans.variable)}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <DisclaimerPopup />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
        <BackToTopButton />
      </body>
    </html>
  );
}
