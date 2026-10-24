import type { Metadata } from "next";
import { LifestyleMosaic } from "@/components/Lifestyle";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/motion";
import { ButtonLink, Eyebrow, Heading, Section } from "@/components/ui";
import { business } from "@/data/business";
import { historySummary } from "@/data/faqs";
import { messages, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Max Gadgets",
  description:
    "Max Gadgets sells phones, laptops and accessories, repairs Apple devices and offers flashing and unlocking of phones at Fayose Market, Ado-Ekiti.",
};

const overview = [
  { title: "Retail", text: "iPhones and other gadgets, in store." },
  { title: "Bulk", text: "Tailored quotes on bulk iPhone orders." },
  { title: "Repairs", text: "iPhone repairs, enquiries via WhatsApp." },
  { title: "UK-used", text: "7-day warranty on UK-used gadgets." },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8">
        <Eyebrow>How far? · About Max Gadgets</Eyebrow>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
          Good phones, <span className="text-brand">honest</span> service, one shop in Ado-Ekiti.
        </h1>
      </Section>

      <Section className="pt-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal variant="wipe">
            <Photo name="store" className="h-[480px]" position="50% 25%" sizes="(min-width: 768px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed">
              Max Gadgets sells phones, laptops and accessories, including UK-used devices. It repairs Apple devices and also offers flashing and unlocking of phones. Customers can buy in the shop, arrange delivery, or ask about bulk orders.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {overview.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className={i === 3 ? "border-t-[3px] border-brand pt-4" : "border-t-[3px] border-ink pt-4"}>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">{item.title}</p>
                <p className="mt-2 leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <Photo name="iphones" className="h-[320px]" sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal delay={100}>
            <Photo name="ipads" className="h-[320px]" sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal delay={200}>
            <Photo name="boardOpen" className="h-[320px]" position="50% 55%" sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
        </div>
      </Section>

      <LifestyleMosaic title="Life at the shop" />

      <Section className="border-t border-neutral-200">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>A short history</Eyebrow>
            <Heading className="mt-3 text-[clamp(2rem,4vw,3rem)]">The iPhone story, in short</Heading>
          </div>
          <p className="text-lg leading-relaxed">{historySummary}</p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-ink p-8 text-white md:p-10">
            <Eyebrow>Visit us</Eyebrow>
            <Heading className="mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)]">{business.address.line1}</Heading>
            <p className="mt-4 leading-relaxed">{business.address.line2}</p>
            <p className="mt-1 text-neutral-400">Closed on {business.closedDay}s</p>
          </div>
          <div className="rounded-3xl border border-ink p-8 md:p-10">
            <Eyebrow>Buy your way</Eyebrow>
            <Heading className="mb-6 mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)]">In store or delivered</Heading>
            <ButtonLink href={waLink(messages.delivery)}>Ask on WhatsApp</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
