"use client";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Section } from "./section";

export function Socials() {
  return (
    <Section
      id="socials"
      pill="Vibes"
      title="Langsung dari TikTok & Instagram"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-white/10 shadow-lg">
          <CardContent className="p-6">
            <h3 className="font-headline text-2xl font-bold">TikTok</h3>
            <p className="text-foreground/70 mb-4">
              Konten terbaru di profil kami.
            </p>
            <Button asChild>
              <a href="https://www.tiktok.com/@nasgorxstarbag" target="_blank" rel="noopener">
                Buka Profil TikTok
              </a>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-card border-white/10 shadow-lg">
          <CardContent className="p-6">
            <h3 className="font-headline text-2xl font-bold">Instagram</h3>
            <p className="text-foreground/70 mb-4">
              Cek reels & foto terbaru.
            </p>
            <Button asChild>
              <a href="https://www.instagram.com/nasgorxstarbag/" target="_blank" rel="noopener">
                Buka Profil Instagram
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
