import Image from "next/image";
import { CreditCard } from "lucide-react";
import { Section } from "./section";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function Payment() {
  return (
    <Section
      id="payment"
      pill="Bayar di Tempat"
      title="Lupa bawa uang cash?"
    >
      <div className="text-center">
        <p className="mb-6 max-w-2xl mx-auto text-foreground/80">
          Tenang, kami menyediakan pembayaran non-tunai melalui QRIS. Klik tombol di bawah untuk menampilkan kode QR.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="rounded-xl px-6 py-3 font-semibold">
              <CreditCard className="w-5 h-5 mr-2" />
              Tampilkan QRIS
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm p-4">
            <DialogHeader>
              <DialogTitle className="text-center">Scan untuk Membayar</DialogTitle>
              <DialogDescription className="text-center">
                Gunakan aplikasi perbankan atau e-wallet Anda.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Image
                src="/image/qris.jpg"
                alt="QRIS Payment Code for Nasgor X Starbag Muzar"
                width={400}
                height={600}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  );
}
