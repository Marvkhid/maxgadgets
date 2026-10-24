import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnkaraBand, ButtonLink, Container, Disclosure, Eyebrow, Heading, Section } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { CountUp, Parallax, PointerParallax, Reveal, Spotlight, Tilt } from "@/components/motion";
import { Phone3D } from "@/components/Phone3D";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ModelRing } from "@/components/ModelRing";
import { RepairJourney } from "@/components/RepairJourney";
import { Rotator3D } from "@/components/Rotator3D";
import { BuyingGuide, CareTips } from "@/components/GuideSections";
import { LifestyleImage, LifestyleMosaic } from "@/components/Lifestyle";
import { homeRange } from "@/data/models";
import { offers, services } from "@/data/services";
import { problems } from "@/data/problems";
import { generalFaqs } from "@/data/faqs";
import { customerPhotos } from "@/data/reviews";
import { business } from "@/data/business";
import { messages, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "Max Gadgets | iPhones, bulk orders and repairs in Ado-Ekiti" },
};

const marqueeItems = [
  "iPhone 18 Pro Max",
  "Bulk orders",
  "Microsoldering",
  "Repairs",
  "UK-used (Tokunbo)",
  "Delivery",
  "No wahala",
  "Laptops",
  "Accessories",
  "Unlocking",
];

const trust = ["Shop in store", "Product delivery", "Bulk enquiries", "7-day warranty on UK-used"] as const;

const stats = [
  { to: 7, suffix: "-day", label: "warranty on eligible UK-used gadgets" },
  { to: 11, suffix: "", label: "repair and unlocking services" },
  { to: 15, suffix: "", label: "quick fixes to try before you panic" },
  { to: 2, suffix: "", label: "phone numbers you can WhatsApp" },
] as const;

const steps = [
  { title: "Browse", text: "Look through the range and the services on this site.", slot: "friends" },
  { title: "Chat us", text: "Tap WhatsApp with the model or repair you need.", slot: "happy" },
  { title: "Get today's price", text: "We chat back with today's price and confirm what is available.", slot: "buying" },
  { title: "Collect or deliver", text: "Visit Block A, Shop 13, or arrange delivery.", slot: "entering" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden">
        <Container className="grid items-center gap-12 py-12 md:grid-cols-2 md:py-20">
          <div>
            <Eyebrow>How far? · Ado-Ekiti · iPhone 18 Pro Max to 12</Eyebrow>
            <h1 className="mt-5 font-display text-[clamp(3.4rem,9vw,7.4rem)] font-extrabold uppercase leading-[0.88] tracking-tighter">
              <span className="block overflow-hidden">
                <span className="hero-word block">Good phones.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-word block [animation-delay:150ms]">
                  Smart <span className="text-brand">choices.</span>
                </span>
              </span>
            </h1>
            <div className="draw-line mt-6 h-1 w-32 bg-brand" />
            <p className="mt-6 max-w-md text-lg leading-relaxed">
              Shop iPhones, source devices in bulk, or bring yours in for expert repair at Max Gadgets.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-500">At Max Gadgets</p>
              <Rotator3D items={trust} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop">Explore iPhones</ButtonLink>
              <ButtonLink href="/repairs" variant="outline">
                Book a Repair
              </ButtonLink>
            </div>
            <Link
              href="/shop#bulk"
              className="mt-6 inline-block border-b-2 border-brand text-sm font-extrabold transition hover:text-brand"
            >
              Buying in bulk? Request a quote →
            </Link>
          </div>
          <PointerParallax className="relative">
            <span
              aria-hidden="true"
              className="animate-drift absolute -right-4 -top-5 z-10 h-20 w-20 rounded-full border-[6px] border-brand md:-right-8"
            />
            <span
              aria-hidden="true"
              className="animate-drift absolute -bottom-3 right-10 z-10 h-8 w-8 rounded-full bg-ink [animation-delay:2s]"
            />
            <div
              className="relative h-[480px] overflow-hidden rounded-3xl transition-transform duration-300 ease-out md:h-[620px]"
              style={{ transform: "translate3d(calc(var(--px, 0) * -10px), calc(var(--py, 0) * -8px), 0)" }}
            >
              <Parallax className="absolute inset-[-6%]" speed={0.06}>
                <Photo name="iphones" rounded={false} className="h-full w-full" sizes="(min-width: 768px) 50vw, 100vw" priority />
              </Parallax>
            </div>
            <div
              className="absolute -bottom-6 -left-2 z-10 origin-bottom-left scale-[0.62] transition-transform duration-300 ease-out md:-left-16 md:scale-[0.85]"
              style={{ transform: "translate3d(calc(var(--px, 0) * 22px), calc(var(--py, 0) * 16px), 0)" }}
            >
              <Phone3D />
            </div>
          </PointerParallax>
        </Container>
      </section>

      <div className="overflow-hidden bg-ink py-4 text-white" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-xl font-extrabold tracking-wide">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex gap-10">
              {marqueeItems.map((item) => (
                <span key={`${copy}-${item}`} className="uppercase">
                  {item} <span className="text-brand">●</span>
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className="mt-3 flex w-max animate-marquee-rev gap-10 whitespace-nowrap font-display text-base font-bold tracking-wide text-white/60">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex gap-10">
              {services.map((service) => (
                <span key={`${copy}-${service.title}`} className="uppercase">
                  {service.title} <span className="text-brand">/</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="border-b border-neutral-200">
        <Container className="grid grid-cols-2 gap-6 py-8 text-sm font-semibold md:grid-cols-4">
          {trust.map((item, i) => (
            <div key={item}>
              <span className="text-xs font-extrabold tracking-widest text-brand">0{i + 1}</span>
              <p className="mt-1">{item}</p>
            </div>
          ))}
        </Container>
      </section>

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Eyebrow>Welcome</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.06] tracking-tight">
              One shop in Ado-Ekiti for the newest iPhone, a trusted older one, and the repair bench to look after both.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-700">
              Max Gadgets sells the latest iPhones, from the iPhone 18 Pro Max down to the iPhone 12, along with other gadgets and UK-used devices. You can buy in the shop, arrange delivery, order in bulk, or hand in a phone that needs fixing. Scroll down to see the range, the repair services and how to order.
            </p>
          </Reveal>
          <Reveal delay={120} variant="wipe">
            <Tilt max={6}>
              <Photo name="store" className="h-[520px]" position="50% 15%" sizes="(min-width: 768px) 40vw, 100vw" />
            </Tilt>
          </Reveal>
        </div>
      </Section>

      <Section className="pattern-bg bg-ink text-white">
        <Spotlight />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <Tilt className="h-full">
                <div className="h-full rounded-2xl border border-white/20 bg-ink/80 p-6">
                  <p className="font-display text-6xl font-extrabold leading-none text-brand">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-300">{stat.label}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>What you will find</Eyebrow>
        <Heading className="mt-3">
          Phones, laptops
          <br />
          and Apple repairs
        </Heading>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {offers.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 80}>
              <div className="ankara-corner h-full rounded-2xl border border-ink p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="text-xs font-extrabold tracking-widest text-brand">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-extrabold uppercase leading-none">{offer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{offer.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <Eyebrow>The range</Eyebrow>
        <Heading className="mt-3">
          iPhone 18 Pro Max
          <br />
          down to iPhone 12
        </Heading>
        <p className="mb-8 mt-4 max-w-xl leading-relaxed text-neutral-700">
          Watch the range turn, then tap any phone to message us on WhatsApp. Standard and Plus models from these generations can be requested too.
        </p>
        <ModelRing items={homeRange} />
        <div className="mt-8">
          <ButtonLink href="/shop" variant="outline">
            See every model
          </ButtonLink>
        </div>
      </Section>

      <AnkaraBand />
      <Section className="pattern-bg bg-ink text-white">
        <Spotlight />
        <Eyebrow>A note on prices</Eyebrow>
        <Heading className="mt-3 text-[clamp(2.4rem,6vw,4.8rem)]">
          Why you will not
          <br />
          see prices here
        </Heading>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <p className="text-xl leading-relaxed">
            Phone prices in naira change every day. A number printed on a website would already be out of date by the time you read it, and we would rather be accurate than hopeful.
            <br />
            <br />
            <b>Na so e be:</b> price dey change daily, so just chat us for today&apos;s price.
          </p>
          <div className="leading-relaxed text-neutral-300">
            <p className="font-bold text-white">So here is what we do instead.</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Message us on WhatsApp with the model you want.</li>
              <li>We reply with today&apos;s price and confirm availability.</li>
              <li>You decide, and visit the shop or arrange delivery.</li>
            </ol>
            <ButtonLink href={waLink(messages.price)} className="mt-6">
              Ask for today&apos;s price
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>The repair bench</Eyebrow>
        <Heading className="mt-3">
          iPhone, iPad and
          <br />
          other devices
        </Heading>
        <p className="mb-8 mt-4 max-w-xl leading-relaxed text-neutral-700">
          We specialise in iPhone repair, iPad and other devices, and we are into microsoldering. Tap any card to read what it covers.
        </p>
        <Reveal className="mb-8">
          <Photo name="boardOpen" className="h-[300px] md:h-[380px]" position="50% 55%" sizes="100vw" />
        </Reveal>
        <ServiceGrid />
      </Section>

      <RepairJourney />

      <Section className="bg-neutral-50">
        <Eyebrow>Completed repairs</Eyebrow>
        <Heading className="mt-3">Before and after</Heading>
        <p className="mb-8 mt-4 max-w-xl leading-relaxed text-neutral-700">
          Photos from our bench at Block A, Shop 13. From a cracked display to a working screen.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal variant="wipe">
            <Photo name="cracked" className="h-[440px]" sizes="(min-width: 768px) 50vw, 100vw" />
            <p className="mt-3 text-xs font-extrabold uppercase tracking-widest text-brand">Before · cracked display</p>
          </Reveal>
          <Reveal delay={120} variant="wipe">
            <Photo name="working" className="h-[440px]" sizes="(min-width: 768px) 50vw, 100vw" />
            <p className="mt-3 text-xs font-extrabold uppercase tracking-widest text-brand">After · working display</p>
          </Reveal>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <Reveal variant="wipe">
            <Photo name="badGoodBack" className="aspect-[848/1247] w-full" sizes="(min-width: 768px) 40vw, 100vw" />
            <p className="mt-3 text-xs font-extrabold uppercase tracking-widest text-brand">A shattered back, restored</p>
          </Reveal>
          <Reveal delay={120} variant="wipe">
            <Photo name="badGoodCharging" className="aspect-[848/1247] w-full" sizes="(min-width: 768px) 40vw, 100vw" />
            <p className="mt-3 text-xs font-extrabold uppercase tracking-widest text-brand">Charging trouble, fixed</p>
          </Reveal>
        </div>
        <div className="mt-8">
          <ButtonLink href="/repairs" variant="outline">
            See repairs &amp; work
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <Eyebrow>From the shelf</Eyebrow>
        <Heading className="mt-3">
          We sell any type
          <br />
          of gadget
        </Heading>
        <div className="mt-10 grid gap-4 md:grid-cols-[1fr_1.4fr_1fr]">
          <Reveal variant="wipe">
            <Photo name="iphones" className="h-[420px] md:h-[520px]" sizes="(min-width: 768px) 28vw, 100vw" />
          </Reveal>
          <Reveal delay={100} variant="wipe">
            <Photo name="ipads" className="h-[420px] md:h-[520px]" sizes="(min-width: 768px) 40vw, 100vw" />
          </Reveal>
          <Reveal delay={200} variant="wipe">
            <Photo name="cables" className="h-[420px] md:h-[520px]" sizes="(min-width: 768px) 28vw, 100vw" />
          </Reveal>
        </div>
        <p className="mt-3 text-xs text-neutral-500">iPhones, iPads and accessories.</p>
      </Section>

      <LifestyleMosaic />

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-ink p-8 md:p-10">
              <Eyebrow>Retail</Eyebrow>
              <Heading className="mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)]">Visit or get it delivered</Heading>
              <p className="mb-6 mt-4 leading-relaxed">
                Come to {business.address.line1}, {business.address.line2}, or message us to arrange delivery. Closed on {business.closedDay}s.
              </p>
              <ButtonLink href="/contact" variant="outline">
                Find the shop
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-3xl bg-ink p-8 text-white md:p-10">
              <Photo name="ipads" className="mb-6 h-48" sizes="(min-width: 768px) 40vw, 100vw" />
              <Eyebrow>Bulk</Eyebrow>
              <Heading className="mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)]">Buying more than one?</Heading>
              <p className="mb-6 mt-4 leading-relaxed">
                Contact Max Gadgets for a tailored quotation on bulk iPhone orders.
              </p>
              <ButtonLink href="/shop#bulk">Request a Bulk Quote</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <BuyingGuide />

      <AnkaraBand />
      <Section className="bg-neutral-50">
        <Eyebrow>How it works</Eyebrow>
        <Heading className="mt-3">Four easy steps</Heading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="border-t-[3px] border-ink pt-4">
                <LifestyleImage slot={step.slot} className="mb-4 h-44" sizes="(min-width: 1024px) 25vw, 100vw" />
                <p className="font-display text-5xl font-extrabold text-brand">{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold uppercase leading-none">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-700">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Phone dey give you wahala?</Eyebrow>
        <Heading className="mt-3">
          Phone wahala?
          <br />
          Try this first
        </Heading>
        <p className="mb-8 mt-4 max-w-xl leading-relaxed text-neutral-700">
          Try these simple steps before you panic. They are general tips, not a guarantee. If the problem stays, message us or bring the phone in and we will take a look.
        </p>
        <div className="grid gap-x-14 md:grid-cols-2">
          {problems.map((problem) => (
            <Disclosure key={problem.title} title={problem.title}>
              <ol className="list-decimal space-y-1.5 pl-5 leading-relaxed text-neutral-700">
                {problem.fixes.map((fix) => (
                  <li key={fix}>{fix}</li>
                ))}
              </ol>
            </Disclosure>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href={waLink(messages.problem)}>Still stuck? Message us</ButtonLink>
        </div>
      </Section>

      <CareTips />

      {customerPhotos.length > 0 ? (
        <Section className="bg-neutral-50">
          <Eyebrow>Happy customers</Eyebrow>
          <Heading className="mt-3">The people we serve</Heading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customerPhotos.map((photo) => (
              <Reveal key={photo.src}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="bg-neutral-50">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>About Max Gadgets</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.06] tracking-tight">
              A real shop with real people behind the counter.
            </h2>
            <Link href="/about" className="mt-6 inline-block border-b-2 border-brand font-extrabold hover:text-brand">
              Our story →
            </Link>
          </div>
          <div className="leading-loose">
            <b>{business.address.line1}</b>
            <br />
            {business.address.line2}
            <br />
            <b>{business.closedDay}:</b> Closed
            <br />
            <b>Other days:</b> opening hours to be confirmed by the owner
            <br />
            <a className="font-extrabold hover:text-brand" href={`tel:${business.phones[0].tel}`}>
              {business.phones[0].display}
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Quick answers</Eyebrow>
            <Heading className="mt-3">Before you ask</Heading>
          </div>
          <div>
            {generalFaqs.slice(0, 5).map((faq) => (
              <Disclosure key={faq.question} title={faq.question}>
                <p className="leading-relaxed text-neutral-700">{faq.answer}</p>
              </Disclosure>
            ))}
          </div>
        </div>
      </Section>

      <AnkaraBand />
      <section className="pattern-bg bg-brand py-20 text-center text-white">
        <Container>
          <Heading className="text-[clamp(2.6rem,7vw,5.5rem)]">Ready? Oya, message us.</Heading>
          <ButtonLink href={waLink(messages.general)} variant="light" className="mt-8">
            Chat on WhatsApp
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
