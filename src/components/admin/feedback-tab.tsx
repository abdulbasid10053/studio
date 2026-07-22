"use client";

import { Clock, Trash2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { FeedbackData } from "@/lib/feedback-service";

interface FeedbackTabProps {
  feedbackList: FeedbackData[];
  isPending: boolean;
  onDelete: (id: string) => void;
  onToggleApproval: (id: string, currentApproved: boolean) => void;
}

export function FeedbackTab({
  feedbackList,
  isPending,
  onDelete,
  onToggleApproval,
}: FeedbackTabProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-semibold text-zinc-200">Ulasan &amp; Masukan Pelanggan</h2>
          <p className="text-xs text-muted-foreground">Setujui ulasan yang ingin ditampilkan di halaman utama.</p>
        </div>
      </div>

      {feedbackList.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
          Belum ada feedback yang masuk dari pelanggan.
        </div>
      ) : (
        <div className="grid gap-4">
          {feedbackList.map((fb) => (
            <div key={fb.id} className="bg-card border border-border rounded-2xl p-5 relative group overflow-hidden">
              {fb.isPublishable && fb.isApproved && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-0 rounded-full" />
              )}
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      {fb.isAnonymous ? "👤 Anonim" : `👤 ${fb.name || "Tanpa Nama"}`}
                      {fb.isPublishable ? (
                        fb.isApproved ? (
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                            Publik (Aktif)
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                            Menunggu Persetujuan
                          </span>
                        )
                      ) : (
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          Privat
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(fb.createdAt as string).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => fb.id && onDelete(fb.id)}
                    disabled={isPending}
                    className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Hapus Feedback"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="bg-background/50 border border-border/50 rounded-xl p-4 mt-2 text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                  {fb.feedback}
                </div>

                {fb.isPublishable ? (
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">Tampilkan di halaman utama</span>
                    <button
                      onClick={() => fb.id && onToggleApproval(fb.id, fb.isApproved || false)}
                      disabled={isPending}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        fb.isApproved
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                          : "bg-muted text-muted-foreground border border-border/50 hover:bg-zinc-700 hover:text-foreground"
                      }`}
                    >
                      {fb.isApproved ? (
                        <><Eye className="w-3.5 h-3.5" /> Tampil</>
                      ) : (
                        <><EyeOff className="w-3.5 h-3.5" /> Sembunyikan</>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50 text-xs text-muted-foreground italic">
                    <span>Tidak dapat dipublikasikan (permintaan pelanggan)</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-4 text-sm text-blue-200/70 flex items-start gap-3 mt-8">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
        <div>
          Notifikasi feedback baru juga tetap dikirimkan ke Telegram Anda secara realtime. Menghapus data di sini tidak akan menghapus pesan di Telegram.
        </div>
      </div>
    </div>
  );
}
