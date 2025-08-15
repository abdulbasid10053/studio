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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.510115344335!2d109.65599297489503!3d-7.73541239227546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7ac9c033c77d91%3A0x88e78f352136e1a4!2sNASGOR%20X%20STARBAG%20MUZAR!5e0!3m2!1sen!2sid!4v1722352222384!5m2!1sen!2sid"
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
