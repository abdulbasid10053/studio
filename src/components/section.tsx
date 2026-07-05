import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  pill: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, className, pill, title, children }: SectionProps) {
  return (
    <section id={id} className={cn("container py-16 md:py-24 border-t border-white/5", className)}>
      <div className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{pill}</div>
      <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8">{title}</h2>
      {children}
    </section>
  );
}
