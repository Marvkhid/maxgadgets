import type { Metadata } from "next";
import { Container, Eyebrow, Heading } from "@/components/ui";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Max Gadgets handles the details you send through this website.",
};

const sections: { title: string; body: string }[] = [
  {
    title: "What you send us",
    body: "When you use an enquiry form, we receive the details you type: your name, phone number, your email if you give one, and the phone model, quantity, problem or message. If you tap a WhatsApp, call or email button, you leave this site and use that app, which has its own privacy terms.",
  },
  {
    title: "How we use it",
    body: "We use your details only to reply to your enquiry. This website does not keep them in a database. They are sent by email to Max Gadgets, and if you gave your email address you are sent a copy of what you submitted.",
  },
  {
    title: "How long we keep it",
    body: "Enquiries stay in the shop's email inbox. Ask us to delete yours at any time using the contact details below.",
  },
  {
    title: "Analytics and cookies",
    body: "If analytics is switched on for this site, we ask first. Only if you choose Yes do we load Google Analytics to count visits and taps on WhatsApp, call and email buttons. If you choose No, nothing is tracked. You can clear your choice by clearing this site's data in your browser.",
  },
  {
    title: "Prices and stock",
    body: "This site shows no prices because they change every day. We confirm prices and availability directly with you.",
  },
];

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-16 md:py-24">
      <Eyebrow>Privacy</Eyebrow>
      <Heading as="h1" className="mb-10 mt-3 text-[clamp(2.4rem,6vw,4.4rem)]">
        How we handle your details
      </Heading>
      {sections.map((section) => (
        <section key={section.title} className="mb-8">
          <h2 className="font-display text-2xl font-extrabold uppercase">{section.title}</h2>
          <p className="mt-2 leading-relaxed text-neutral-700">{section.body}</p>
        </section>
      ))}
      <section>
        <h2 className="font-display text-2xl font-extrabold uppercase">Contact</h2>
        <p className="mt-2 leading-relaxed text-neutral-700">
          {business.name}, {business.address.line1}, {business.address.line2}.{" "}
          <a className="font-bold underline" href={`mailto:${business.email}`}>
            {business.email}
          </a>{" "}
          or{" "}
          <a className="font-bold underline" href={`tel:${business.phones[0].tel}`}>
            {business.phones[0].display}
          </a>
          .
        </p>
      </section>
    </Container>
  );
}
