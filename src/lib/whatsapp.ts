import { business } from "@/data/business";
import type { EnquiryInput } from "@/lib/enquiry";

const primaryNumber: string = business.phones[0].wa;

export function waLink(text: string, number: string = primaryNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export const messages = {
  general: "Hello Max Gadgets, I'd like to make an enquiry.",
  price: "Hello Max Gadgets, please confirm today's price and availability.",
  delivery: "Hello Max Gadgets, I'd like to ask about delivery.",
  bulkGeneral: "Hello Max Gadgets, I'd like a bulk quotation for iPhones.",
  repair:
    "Hello Max Gadgets, I'd like to enquire about an iPhone repair. Model: [model]. Problem: [problem].",
  problem:
    "Hello Max Gadgets, my iPhone has a problem and I'd like help. Model: [model]. Problem: [problem].",
  product: (model: string): string =>
    `Hello Max Gadgets, please confirm today's price and availability of the ${model}.`,
  service: (service: string): string =>
    `Hello Max Gadgets, I would like to ask about: ${service}.`,
  bulk: (model: string, quantity: number, contact: string): string =>
    `Hello Max Gadgets, I'd like a bulk quotation. Model: ${model}. Estimated quantity: ${quantity}. Preferred contact method: ${contact}.`,
};

export function enquiryMessage(input: EnquiryInput): string {
  const who = `Hello Max Gadgets, I'm ${input.name || "a customer"} (${input.phone || "no number given"}).`;
  switch (input.type) {
    case "iphone":
      return `${who} Please confirm today's price and availability of the ${input.model || "iPhone"}. ${input.message}`.trim();
    case "bulk":
      return `${who} I'd like a bulk quotation. Model: ${input.model || "[model]"}. Estimated quantity: ${input.quantity || "[quantity]"}. Preferred contact method: ${input.contactMethod}. ${input.message}`.trim();
    case "repair":
      return `${who} I'd like to enquire about a repair. Model: ${input.model || "[model]"}. Problem: ${input.problem || "[problem]"}.`;
    default:
      return `${who} ${input.message}`.trim();
  }
}
