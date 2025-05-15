import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  suffix?: string; // Optional suffix
  className?: string;
  subtitle?: string;
  accentColor?: string;
  centered?: boolean;
}

export function SectionHeading({ title, suffix, className, subtitle, accentColor, centered = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 md:mb-12", centered ? "text-center" : "text-left", className)}>
      <h2 className={cn("text-3xl md:text-4xl font-heading font-bold text-foreground", accentColor ,centered ? "inline-block" : "")}>
        {title}{suffix && <span>{suffix}</span>} {/* Append suffix if provided */}
      </h2>
      <div className={cn("mt-2 h-0.5 w-10 bg-accent", centered ? "mx-auto" : "")} />
      {subtitle && (
        <p className={cn("mt-4 text-lg text-muted-foreground", centered ? "max-w-2xl mx-auto" : "max-w-3xl")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
