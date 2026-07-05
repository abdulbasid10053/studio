import { Card } from "./ui/card";
import { Section } from "./section";
import { getPublishableFeedbackFromFirestore } from "@/lib/feedback-service";
import { MessageSquareQuote } from "lucide-react";

export async function FeedbackShowcase() {
  const feedbacks = await getPublishableFeedbackFromFirestore();

  if (!feedbacks || feedbacks.length === 0) {
    return null; // Tidak tampilkan apa-apa jika belum ada feedback yang boleh dipublish
  }

  return (
    <Section
      id="testimonials"
      pill="Kata Mereka"
      title="Apa kata pelanggan Muzar Eats?"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb) => (
          <Card key={fb.id} className="p-6 bg-card border-white/10 shadow-lg hover:border-primary/50 transition-colors flex flex-col h-full relative overflow-hidden group">
            {/* Dekorasi tanda kutip */}
            <MessageSquareQuote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 -rotate-12 group-hover:text-primary/10 transition-colors" />
            
            <div className="relative z-10 flex-grow">
              <p className="text-zinc-300 italic mb-6 leading-relaxed">
                "{fb.feedback}"
              </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
                {fb.isAnonymous ? "?" : (fb.name.charAt(0) || "?").toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white">
                  {fb.isAnonymous ? "Pelanggan Anonim" : fb.name || "Tanpa Nama"}
                </p>
                <p className="text-xs text-zinc-500">
                  {new Date(fb.createdAt as string).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
