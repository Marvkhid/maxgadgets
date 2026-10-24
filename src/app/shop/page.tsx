import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Photo } from "@/components/Photo";
import { Spotlight } from "@/components/motion";
import { ShopCatalogue } from "@/components/ShopCatalogue";
import { ButtonLink, Eyebrow, Heading, Section } from "@/components/ui";
import { messages, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Shop iPhones and bulk orders",
  description:
    "Browse iPhones from the iPhone 18 Pro Max down to the iPhone 12 and ask Max Gadgets for today's price on WhatsApp. Bulk quotes available.",
};

export default function ShopPage() {
  return (
    <>
      <Section className="pb-8">
        <Eyebrow>Shop iPhones</Eyebrow>
        <Heading as="h1" className="mt-3 text-[clamp(3rem,8vw,6.5rem)]">
          The iPhone
          <br />
          catalogue
        </Heading>
        <p className="mb-10 mt-5 max-w-xl text-lg leading-relaxed text-neutral-700">
          Prices change every day, so we do not print them here. Message us for today&apos;s price and availability. There is no online checkout.
        </p>
        <Photo name="counterPos" className="mb-12 h-[260px] md:h-[320px]" position="50% 38%" sizes="100vw" priority />
        <ShopCatalogue />
      </Section>

      <Section id="bulk" className="bg-ink text-white">
        <Spotlight />
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Bulk orders</Eyebrow>
            <Heading className="mt-3 text-[clamp(2.6rem,6vw,5rem)]">Buying more than one?</Heading>
            <p className="mb-6 mt-5 max-w-md leading-relaxed text-neutral-300">
              Contact Max Gadgets for a tailored quotation on bulk iPhone orders.
            </p>
            <ButtonLink href={waLink(messages.bulkGeneral)}>Request a Bulk Quote</ButtonLink>
            <Photo name="ipads" className="mt-8 h-56" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <EnquiryForm type="bulk" heading="Optional bulk enquiry" />
        </div>
      </Section>
    </>
  );
}
