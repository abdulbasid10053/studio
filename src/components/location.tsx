import { Section } from "./section";
import { Card } from "./ui/card";

export function Location() {
  return (
    <Section
      id="location"
      pill="Lokasi Kami"
      title="Datang & rasakan langsung vibes-nya"
    >
      <Card className="overflow-hidden border-white/10 shadow-lg">
        <div className="aspect-video w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.712386572854!2d110.0140689!3d-7.713978399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aeb0d53029775%3A0xc3212ac558441b06!2sNasgor%20x%20Starbag%20Muzar!5e0!3m2!1sid!2sid!4v1755242960720!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nasgor X Starbag Muzar Location"
          ></iframe>
        </div>
      </Card>
    </Section>
  );
}
