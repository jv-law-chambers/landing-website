"use client";

import * as React from "react";
import Link from 'next/link'; // Import Link
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DISCLAIMER_KEY = "disclaimerAccepted_v1"; // Consider versioning if disclaimer changes significantly

export function DisclaimerPopup() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    // Check session storage only on the client side
    if (typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
      const accepted = sessionStorage.getItem(DISCLAIMER_KEY);
      if (accepted !== "true") {
        // Delay opening slightly to allow layout to settle
        const timer = setTimeout(() => setIsOpen(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
       sessionStorage.setItem(DISCLAIMER_KEY, "true");
    }
    setIsOpen(false);
  };

  // Prevent closing via Escape key or overlay click
  const handleOpenChange = (open: boolean) => {
      if (!open && !sessionStorage.getItem(DISCLAIMER_KEY)) {
          // If trying to close without accepting, keep it open
          setIsOpen(true);
      } else {
          setIsOpen(open);
      }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-lg bg-white p-6 rounded-lg shadow-xl" onEscapeKeyDown={(e) => e.preventDefault()} onPointerDownOutside={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-heading text-primary">Website Disclaimer & User Acknowledgement</AlertDialogTitle>
          <AlertDialogDescription asChild>
            {/* Use a div instead of p for block-level children like ul */}
            <div className="text-sm text-foreground/80 pt-2 max-h-[60vh] overflow-y-auto pr-2">
                 <p className="font-semibold mb-2">As per the rules of the Bar Council of India, law firms are not permitted to solicit work or advertise.</p>
                 <p>By clicking "I Accept", you acknowledge and agree to the following:</p>
                 <ul className="list-decimal pl-5 space-y-1 mt-3 text-xs">
                   <li>You are seeking information about Law Chambers of G.R. Hari solely for your own information and use, at your own initiative.</li>
                   <li>There has been no advertisement, solicitation, invitation, or inducement of any sort from the firm or its members to solicit work through this website.</li>
                   <li>Any information obtained or materials downloaded from this website are at your own volition.</li>
                    <li>Use of this website does not create an attorney-client relationship. Please do not send confidential information through this website.</li>
                 </ul>
                 <p className="mt-3">
                   The information provided is for informational purposes only and does not constitute legal advice. For specific legal issues, please seek independent legal counsel.
                 </p>
                 <p className="mt-3 text-xs">
                    For full details, please review our <Link href="/disclaimer" className="underline text-primary hover:text-accent">Disclaimer</Link>, <Link href="/terms-of-use" className="underline text-primary hover:text-accent">Terms of Use</Link>, and <Link href="/privacy-policy" className="underline text-primary hover:text-accent">Privacy Policy</Link>.
                 </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          {/* Intentionally removed Cancel button to enforce acceptance */}
          <AlertDialogAction
            onClick={handleAccept}
            className="btn-cta w-full" // Make button full width
          >
            I Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
