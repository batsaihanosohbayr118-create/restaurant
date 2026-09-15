import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Reveal from "./Reveal";

const details = [
  {
    icon: MapPin,
    label: "Address",
    value: "128 Harborview Lane, San Francisco, CA 94111",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (415) 555-0198",
  },
  {
    icon: Mail,
    label: "Email",
    value: "reservations@velora.com",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: "Monday – Sunday, 11:00 AM – 11:00 PM",
  },
];

export default function Contact() {
  return (
    <section className="bg-linen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
            Get in Touch
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Visit Us in Person
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              {details.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="group flex items-start gap-5 px-4 py-6 -mx-4 transition-all duration-300 hover:bg-ink/[0.03] hover:px-6"
                >
                  <Icon
                    size={20}
                    className="mt-0.5 shrink-0 text-gold transition-transform duration-300 group-hover:scale-110"
                    style={{ color: "#B08B4F" }}
                  />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-ink/40">
                      {label}
                    </dt>
                    <dd className="mt-1 text-[15px] text-ink/80 transition-colors duration-300 group-hover:text-ink">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink/10 grayscale lg:aspect-auto lg:h-full">
              <iframe
                src="https://www.google.com/maps?q=San+Francisco,+CA&output=embed"
                title="VELORA location map"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
