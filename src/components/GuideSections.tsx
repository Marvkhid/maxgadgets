import { Reveal, Spotlight, Tilt } from "@/components/motion";
import { ButtonLink, Disclosure, Eyebrow, Heading, Section } from "@/components/ui";
import { buyingTips, careTips, glossary } from "@/data/guides";
import { messages, waLink } from "@/lib/whatsapp";

export function BuyingGuide() {
  return (
    <Section>
      <Eyebrow>Buying guide</Eyebrow>
      <Heading className="mt-3">
        How to choose
        <br />a good iPhone
      </Heading>
      <p className="mb-10 mt-4 max-w-xl leading-relaxed text-neutral-700">
        Whether you buy from us or anywhere else, these checks save you from stress. Ask us to show you any of them in the shop.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {buyingTips.map((tip, i) => (
          <Reveal key={tip.title} delay={(i % 4) * 80}>
            <Tilt className="h-full">
              <div className="ankara-corner h-full rounded-2xl border border-ink p-6">
                <span className="text-xs font-extrabold tracking-widest text-brand">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-extrabold uppercase leading-tight">{tip.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{tip.text}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-ink p-8">
            <Eyebrow>UK-used (Tokunbo)</Eyebrow>
            <p className="mt-3 leading-relaxed">
              Previously owned phones brought in from the UK. Eligible UK-used gadgets at Max Gadgets carry a 7-day warranty. Ask us about condition and battery health before you buy.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="h-full rounded-3xl bg-ink p-8 text-white">
            <Eyebrow>New</Eyebrow>
            <p className="mt-3 leading-relaxed">
              Ask us what new stock is available today. We confirm availability and the details with you on WhatsApp.
            </p>
            <ButtonLink href={waLink(messages.price)} className="mt-5">
              Ask what is available
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function CareTips() {
  return (
    <Section className="pattern-bg bg-ink text-white">
      <Spotlight />
      <Eyebrow>Keep it healthy</Eyebrow>
      <Heading className="mt-3">
        Look after
        <br />
        your iPhone
      </Heading>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {careTips.map((tip, i) => (
          <Reveal key={tip.title} delay={(i % 3) * 90}>
            <Tilt className="h-full">
              <div className="h-full rounded-2xl border border-white/20 bg-ink/80 p-6">
                <h3 className="font-display text-xl font-extrabold uppercase">{tip.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">{tip.text}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Glossary() {
  return (
    <Section className="border-t border-neutral-200">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <Eyebrow>In plain words</Eyebrow>
          <Heading className="mt-3">What the repair words mean</Heading>
        </div>
        <div>
          {glossary.map((item) => (
            <Disclosure key={item.term} title={item.term}>
              <p className="leading-relaxed text-neutral-700">{item.meaning}</p>
            </Disclosure>
          ))}
        </div>
      </div>
    </Section>
  );
}
