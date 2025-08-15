import { HeroClient } from './hero-client';

export function Hero() {
  return (
    <header className="relative min-h-[88vh] flex items-end overflow-hidden">
      <video
        src="http://nasgormuzar.my.id/video/video3.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="z-0 object-cover opacity-30 absolute h-full w-full top-0 left-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-radial-gradient-bottom-gold z-10" />

      <div className="absolute inset-x-[-10%] top-[-10%] h-[55%] animate-flame bg-conic-flame filter blur-2xl saturate-150 mix-blend-screen opacity-30 pointer-events-none z-10" />

      <div className="container relative z-20 pb-12">
        <HeroClient />
      </div>
    </header>
  );
}
