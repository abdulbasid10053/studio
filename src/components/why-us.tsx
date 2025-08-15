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
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="bg-card border-white/10 shadow-lg hover:border-primary/50 transition-colors">
            <CardHeader>
              {feature.icon}
              <CardTitle className="pt-2">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
