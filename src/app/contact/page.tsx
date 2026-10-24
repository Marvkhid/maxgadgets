import type { Metadata } from "next";
import { ButtonLink, Disclosure, Eyebrow, Heading, Section } from "@/components/ui";
import { EnquiryTabs } from "@/components/EnquiryTabs";
import { Photo } from "@/components/Photo";
import { Reveal, Spotlight } from "@/components/motion";
import { business } from "@/data/business";
import { generalFaqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { messages, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reviews and contact",
  description:
    "Call, WhatsApp or visit Max Gadgets at Block A, Shop 13, Fayose Market, Ado-Ekiti. Phone numbers, email, directions and common questions.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="pb-6">
        <Eyebrow>Reviews</Eyebrow>
        <Heading as="h1" className="mb-8 mt-3 text-[clamp(2.8rem,8vw,6rem)]">
          What customers say
        </Heading>
        {reviews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <Reveal key={`${review.name}-${review.quote}`}>
                <figure className="rounded-3xl border border-neutral-200 p-8">
                  <blockquote className="font-display text-2xl font-extrabold leading-snug">{review.quote}</blockquote>
                  <figcaption className="mt-4 text-sm text-neutral-600">
                    {review.name}
                    {review.detail ? `, ${review.detail}` : ""}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-neutral-300 p-10 text-center">
            <p className="font-display text-2xl font-extrabold uppercase">Genuine customer reviews will appear here</p>
            <p className="mt-2 text-neutral-600">Only real reviews from real customers are shown on this page.</p>
          </div>
        )}
      </Section>

      <Section className="py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-ink p-8 md:p-10">
            <Eyebrow>Contact</Eyebrow>
            <Heading className="mb-6 mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)]">Talk to Max Gadgets</Heading>
            {business.phones.map((phone) => (
              <div key={phone.tel} className="mb-5">
                <p className="font-extrabold">{phone.display}</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <ButtonLink href={waLink(messages.general, phone.wa)}>WhatsApp</ButtonLink>
                  <ButtonLink href={`tel:${phone.tel}`} variant="outline">
                    Call
                  </ButtonLink>
                </div>
              </div>
            ))}
            <a className="border-b-2 border-brand font-extrabold hover:text-brand" href={`mailto:${business.email}`}>
              {business.email}
            </a>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-white md:p-10">
            <Eyebrow>Find the shop</Eyebrow>
            <Heading className="mb-3 mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)]">Block A, Shop 13</Heading>
            <p className="mb-5 leading-relaxed">
              Fayose Market, Ado-Ekiti, Ekiti State, Nigeria. Closed on {business.closedDay}s.
            </p>
            <Photo name="store" className="mb-5 h-52" position="50% 12%" sizes="(min-width: 768px) 40vw, 100vw" />
            <ButtonLink href={business.mapsUrl}>Get directions</ButtonLink>
          </div>
        </div>
      </Section>

      <Section className="py-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <ButtonLink href={waLink(messages.product("iPhone [model]"))} className="w-full">
            Enquire about an iPhone
          </ButtonLink>
          <ButtonLink href={waLink(messages.bulkGeneral)} variant="outline" className="w-full">
            Bulk order
          </ButtonLink>
          <ButtonLink href={waLink(messages.repair)} variant="outline" className="w-full">
            Repair enquiry
          </ButtonLink>
        </div>
      </Section>

      <Section id="enquiry" className="bg-ink text-white">
        <Spotlight />
        <div className="grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Send an enquiry</Eyebrow>
            <Heading className="mt-3">Prefer to write it down?</Heading>
            <p className="mt-5 max-w-sm leading-relaxed text-neutral-300">
              Fill in the form and your details go straight to Max Gadgets. Add your email and you get a copy too. You can also send the same message on WhatsApp.
            </p>
          </div>
          <EnquiryTabs />
        </div>
      </Section>

      <Section className="py-8 md:py-10">
        <div className="overflow-hidden rounded-3xl border border-neutral-200">
          <iframe
            title="Map showing Fayose Market, Ado-Ekiti"
            src={business.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full border-0"
          />
        </div>
      </Section>

      <Section className="border-t border-neutral-200">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <Heading className="mt-3">Before you ask</Heading>
          </div>
          <div>
            {generalFaqs.map((faq) => (
              <Disclosure key={faq.question} title={faq.question}>
                <p className="leading-relaxed text-neutral-700">{faq.answer}</p>
              </Disclosure>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
