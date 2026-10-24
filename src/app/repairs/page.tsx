import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ExplodedView } from "@/components/ExplodedView";
import { Glossary } from "@/components/GuideSections";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/motion";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ButtonLink, Container, Disclosure, Eyebrow, Heading, Section } from "@/components/ui";
import { repairFaqs } from "@/data/faqs";
import { anatomy } from "@/data/guides";
import type { PhotoName } from "@/data/photos";
import { messages, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Repairs and work",
  description:
    "iPhone, iPad and other device repairs at Max Gadgets, including microsoldering, screen repair, Face ID, charging issues and data recovery.",
};

const steps = [
  { title: "Tap the WhatsApp button", text: "A repair message opens, ready to send." },
  { title: "Share your model and problem", text: "Add a photo of the issue if you can." },
  { title: "Max Gadgets replies", text: "We confirm the next steps with you directly." },
];

interface Pair {
  title: string;
  before: PhotoName;
  after: PhotoName;
}

const pairs: Pair[] = [
  { title: "Cracked display and a working display", before: "cracked", after: "working" },
  { title: "No SIM message and a network signal", before: "nosim", after: "workingMtn" },
];

const bench: { name: PhotoName; caption: string }[] = [
  { name: "screenOff", caption: "Screen removed" },
  { name: "blackBack", caption: "A black iPhone" },
  { name: "boardOpen", caption: "Logic board exposed" },
  { name: "boardPurple", caption: "Board lifted out" },
];

export default function RepairsPage() {
  return (
    <>
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Repairs &amp; Work</Eyebrow>
            <h1 className="mt-4 font-display text-[clamp(3.4rem,9vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-tighter">
              Fixed
              <br />
              by <span className="text-brand">Max.</span>
            </h1>
            <div className="draw-line mt-6 h-1 w-32 bg-brand" />
            <p className="mb-8 mt-6 max-w-md text-lg leading-relaxed">
              iPhone repairs at Max Gadgets. Message us the model and the problem to get started.
            </p>
            <ButtonLink href={waLink(messages.repair)}>Enquire about a repair</ButtonLink>
          </div>
          <Photo name="benchScene" className="h-[540px]" position="50% 62%" sizes="(min-width: 768px) 50vw, 100vw" priority />
        </div>
      </Section>

      <Section className="border-t border-neutral-200">
        <Eyebrow>Inside your iPhone</Eyebrow>
        <Heading className="mb-10 mt-3">
          Four layers,
          <br />
          one phone
        </Heading>
        <ExplodedView layers={anatomy} />
      </Section>

      <Section className="border-t border-neutral-200">
        <Eyebrow>Services</Eyebrow>
        <Heading className="mt-3">What we repair</Heading>
        <p className="mb-8 mt-4 max-w-xl leading-relaxed text-neutral-700">
          We specialise in iPhone repair, iPad and other devices, and we are into microsoldering. Tap a card to read more.
        </p>
        <ServiceGrid />
      </Section>

      <section className="bg-ink py-16 text-white md:py-24">
        <Container>
          <Eyebrow>How to enquire</Eyebrow>
          <Heading className="mt-3">Three simple steps</Heading>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <p className="font-display text-7xl font-extrabold text-brand">{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-neutral-400">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Section id="repair-form" className="pattern-bg">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Send a repair enquiry</Eyebrow>
            <Heading className="mt-3">Tell us what happened</Heading>
            <p className="mt-5 max-w-sm leading-relaxed text-neutral-700">
              Share the model and the problem. Your details go straight to Max Gadgets, and if you add your email you get a copy.
            </p>
          </div>
          <EnquiryForm type="repair" />
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal variant="wipe">
            <Photo name="microscope" className="h-[520px]" position="50% 55%" sizes="(min-width: 768px) 45vw, 100vw" />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Precision at the bench</Eyebrow>
            <Heading className="mt-3">Small parts,
              <br />
              careful hands</Heading>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-neutral-700">
              Board-level faults live in components smaller than a grain of rice. That is why we repair under a microscope with a fine soldering tool, and why we tell you honestly what can be fixed once we have seen the phone.
            </p>
            <ButtonLink href={waLink(messages.repair)} className="mt-6">
              Enquire about a repair
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Eyebrow>Portfolio</Eyebrow>
        <Heading className="mt-3">From the bench</Heading>
        <p className="mb-10 mt-4 max-w-xl leading-relaxed text-neutral-700">Photos from the repair bench at Block A, Shop 13.</p>
        <div className="grid gap-6 md:grid-cols-2">
          {pairs.map((pair) => (
            <Reveal key={pair.title}>
              <div className="rounded-3xl border border-neutral-200 p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Photo name={pair.before} className="h-[360px]" sizes="(min-width: 768px) 25vw, 50vw" />
                    <p className="mt-2 text-xs font-extrabold uppercase tracking-widest text-brand">Before</p>
                  </div>
                  <div>
                    <Photo name={pair.after} className="h-[360px]" sizes="(min-width: 768px) 25vw, 50vw" />
                    <p className="mt-2 text-xs font-extrabold uppercase tracking-widest text-brand">After</p>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold uppercase">{pair.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal variant="wipe">
            <Photo name="badGoodBack" className="aspect-[848/1247] w-full" sizes="(min-width: 768px) 45vw, 100vw" />
            <h3 className="mt-3 font-display text-xl font-extrabold uppercase">A shattered back, restored</h3>
          </Reveal>
          <Reveal delay={120} variant="wipe">
            <Photo name="badGoodCharging" className="aspect-[848/1247] w-full" sizes="(min-width: 768px) 45vw, 100vw" />
            <h3 className="mt-3 font-display text-xl font-extrabold uppercase">Charging trouble, fixed</h3>
          </Reveal>
        </div>
        <p className="mb-4 mt-12 text-xs font-extrabold uppercase tracking-[0.16em] text-brand">On the bench</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {bench.map((item, i) => (
            <Reveal key={item.name} delay={i * 80}>
              <Photo name={item.name} className="h-[300px]" sizes="(min-width: 1024px) 25vw, 50vw" />
              <p className="mt-2 text-sm text-neutral-600">{item.caption}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Glossary />

      <Section className="border-t border-neutral-200">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <Heading className="mt-3">Repair questions</Heading>
          </div>
          <div>
            {repairFaqs.map((faq) => (
              <Disclosure key={faq.question} title={faq.question}>
                <p className="leading-relaxed text-neutral-700">{faq.answer}</p>
              </Disclosure>
            ))}
            <ButtonLink href={waLink(messages.repair)} className="mt-6">
              Start a repair enquiry
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
