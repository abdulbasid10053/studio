"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShieldCheck, MessageSquare, Send, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { sendFeedbackToTelegram } from "./actions";

export default function FeedbackPage() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isPublishable, setIsPublishable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);

    const result = await sendFeedbackToTelegram({
      feedback,
      name,
      isAnonymous,
      isPublishable,
    });

    if (result.success) {
      toast({
        title: "Feedback terkirim!",
        description: "Terima kasih atas masukan Anda. Kami akan terus improve untuk lebih baik lagi.",
      });

      setFeedback("");
      setName("");
      setIsAnonymous(true);
      setIsPublishable(false);
    } else {
      toast({
        variant: "destructive",
        title: "Gagal mengirim",
        description: result.error || "Terjadi kesalahan. Silakan coba lagi nanti.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black/95 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black flex items-center justify-center p-4 py-12 md:p-8">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <div className="w-full max-w-xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 font-medium text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/5">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>

          <CardHeader className="space-y-3 pb-6 text-center pt-8">
            <div className="mx-auto w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner mb-2">
              <MessageSquare className="w-6 h-6 text-orange-400" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-display">
              Bantu Kami Berkembang
            </CardTitle>
            <CardDescription className="text-zinc-400 text-sm max-w-[85%] mx-auto leading-relaxed">
              Berikan kami review dan feedback apabila ada kesalahan atau yang kurang. Masukan Anda sangat berarti agar kami terus bisa improve dan memberikan yang terbaik.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
              {/* Feedback Textarea */}
              <div className="space-y-3">
                <Label htmlFor="feedback" className="text-zinc-300 flex items-center gap-2">
                  <span>Pesan Feedback</span>
                  <span className="text-orange-500">*</span>
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Ceritakan pengalaman Anda, apa yang perlu ditingkatkan, atau sekadar saran..."
                  className="min-h-[140px] resize-none bg-white/5 border-white/10 focus-visible:ring-orange-500/50 text-white placeholder:text-zinc-600 rounded-xl transition-all"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-5 p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                {/* Anonymous Option */}
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-base font-medium text-white flex items-center gap-2 cursor-pointer" htmlFor="anonymous-switch">
                      {isAnonymous ? <User className="w-4 h-4 text-zinc-400" /> : <User className="w-4 h-4 text-orange-400" />}
                      Kirim sebagai Anonim
                    </Label>
                    <p className="text-sm text-zinc-500">
                      Sembunyikan identitas Anda.
                    </p>
                  </div>
                  <Switch
                    id="anonymous-switch"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                    className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-white/10"
                  />
                </div>

                {/* Conditional Name Input */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAnonymous ? 'h-0 opacity-0' : 'h-auto opacity-100 pt-2'}`}>
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-zinc-300">Nama Anda (Opsional)</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama Anda..."
                      className="bg-black/50 border-white/10 focus-visible:ring-orange-500/50 text-white placeholder:text-zinc-600 rounded-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isAnonymous}
                    />
                  </div>
                </div>

                <div className="h-px bg-white/5 w-full my-2"></div>

                {/* Publishable Option */}
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-base font-medium text-white flex items-center gap-2 cursor-pointer" htmlFor="publish-switch">
                      {isPublishable ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-zinc-400" />}
                      Boleh Dipublikasikan
                    </Label>
                    <p className="text-sm text-zinc-500">
                      Izinkan kami menampilkan feedback ini di website.
                    </p>
                  </div>
                  <Switch
                    id="publish-switch"
                    checked={isPublishable}
                    onCheckedChange={setIsPublishable}
                    className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-white/10"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-6 pt-2 pb-8">
              <Button
                type="submit"
                disabled={!feedback.trim() || isSubmitting}
                className="w-full h-12 bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] transition-all duration-200 rounded-xl font-medium text-[15px] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    <span>Mengirim...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Kirim Feedback</span>
                    <Send className="w-4 h-4" />
                  </div>
                )}
              </Button>

              <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 w-full">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-200/80 leading-relaxed font-medium">
                  <span className="text-emerald-400 font-semibold">Privasi Aman.</span> Kami tidak menghimpun data pelanggan. Dipastikan privasi pelanggan aman dan terjaga.
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
