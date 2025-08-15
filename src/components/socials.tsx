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
              Konten terbaru di profil kami:
            </p>
            <Button asChild>
              <a href="https://www.tiktok.com/@nasgorxstarbag" target="_blank" rel="noopener">
                Buka Profil TikTok
              </a>
            </Button>
            <div className="mt-4 min-h-[400px]">
               <blockquote
                  className="tiktok-embed"
                  cite="https://www.tiktok.com/@nasgorxstarbag"
                  data-unique-id="nasgorxstarbag"
                  data-embed-type="creator"
                  style={{ maxWidth: '605px', minWidth: '288px' }}
                >
                 <section>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@nasgorxstarbag?refer=creator_embed">@nasgorxstarbag</a>
                  </section>
                </blockquote>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-white/10 shadow-lg">
          <CardContent className="p-6">
            <h3 className="font-headline text-2xl font-bold">Instagram</h3>
            <p className="text-foreground/70 mb-4">
              Cek reels & foto terbaru:
            </p>
            <Button asChild>
              <a href="https://www.instagram.com/nasgorxstarbag/" target="_blank" rel="noopener">
                Buka Profil Instagram
              </a>
            </Button>
            <div className="mt-4 min-h-[400px] flex items-center justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink="https://www.instagram.com/p/C7X3iY8y2A1/?utm_source=ig_embed&amp;utm_campaign=loading"
                data-instgrm-version="14"
                style={{ background: '#121212', border: 0, borderRadius: '12px', margin: '1px', padding: 0, width: 'calc(100% - 2px)' }}
              >
              </blockquote>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
