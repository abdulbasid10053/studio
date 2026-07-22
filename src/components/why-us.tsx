import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Section } from "./section";
import { Flame, Package, Clock } from "lucide-react";

export function WhyUs() {
  const features = [
    {
      icon: <Flame className="w-8 h-8 text-primary" />,
      title: "Api Besar",
      description: "Aroma wok hei yang nagih, dimasak langsung di depanmu.",
    },
    {
      icon: <Package className="w-8 h-8 text-primary" />,
      title: "Porsi Mantap",
      description: "Isi melimpah. Kenyang itu wajib, kompromi nggak ada.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Jam Anti-Mainstream",
      description: "Buka dari sore sampai dini hari. Teman begadang yang setia.",
    },
  ];

  return (
    <Section
      id="why"
      pill="Kenapa Harus Coba?"
      title="Lebih dari sekadar nasi goreng"
    >
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-3 scrollbar-none sm:grid sm:grid-cols-3 sm:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {features.map((feature, index) => (
          <Card key={index} className="flex-shrink-0 w-[75vw] max-w-[260px] sm:w-auto snap-center bg-card border-border shadow-lg hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader className="p-4 sm:p-6">
              {feature.icon}
              <CardTitle className="pt-2 text-lg sm:text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
