import { Award, Heart, UtensilsCrossed } from "lucide-react";
import { Section } from "./section";
import { Card, CardContent } from "./ui/card";

export function PromoStory() {
  return (
    <Section
      id="promo-story"
      pill="Cerita & Promo"
      title="Lebih dari sekadar bisnis"
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4 text-foreground/80 text-base">
          <p>
            Berdiri sejak 15 Mei 2025 Nasgor Paling Legend Se-Purworejo Raya. Bagi kami, ini bukan hanya tentang keuntungan. Tapi tentang <strong className="text-primary">Friendship, Solidarity and Caring</strong>. Sejak awal, kami ingin membangun tempat di mana semua orang bisa menikmati makanan enak tanpa khawatir soal harga.
          </p>
          <p>
            Soal rasa memang selera. Kalau satu menu kurang cocok, jangan ragu coba menu lainnya! Kami punya banyak pilihan selain nasi goreng, seperti bakmi, kwetiau, bihun, hingga capcay. Semoga ada yang pas dengan seleramu.
          </p>
          <p className="font-semibold text-foreground">
            Jadi, kapan mau mampir dan jadi bagian dari cerita kami?
          </p>
        </div>
        <Card className="bg-card border-white/10 shadow-lg hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold">Promo Spesial!</h3>
                <p className="text-primary font-semibold">Beli 10 Porsi, Gratis 1 Porsi</p>
              </div>
            </div>
            <p className="mt-4 text-foreground/80">
              Sebagai tanda terima kasih, kami punya promo loyalitas. Kumpulkan 10 porsi pembelian (menu apa saja), dan dapatkan 1 porsi gratis dari kami. Makin sering jajan, makin untung!
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
