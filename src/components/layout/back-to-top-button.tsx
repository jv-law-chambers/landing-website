"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-4 right-4 rounded-full shadow-lg transition-opacity duration-300 z-50 bg-accent text-accent-foreground hover:bg-accent/90 border-accent hover:border-accent/90",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
