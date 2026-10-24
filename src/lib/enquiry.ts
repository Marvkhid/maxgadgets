export const enquiryTypes = ["general", "iphone", "bulk", "repair"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export interface EnquiryInput {
  type: EnquiryType;
  name: string;
  phone: string;
  email: string;
  message: string;
  model: string;
  quantity: string;
  contactMethod: string;
  problem: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const typeLabels: Record<EnquiryType, string> = {
  general: "General enquiry",
  iphone: "iPhone enquiry",
  bulk: "Bulk quote",
  repair: "Repair enquiry",
};

const maxLength: Record<keyof EnquiryInput, number> = {
  type: 10,
  name: 80,
  phone: 25,
  email: 120,
  message: 1500,
  model: 80,
  quantity: 8,
  contactMethod: 20,
  problem: 1500,
};

export function emptyEnquiry(type: EnquiryType): EnquiryInput {
  return { type, name: "", phone: "", email: "", message: "", model: "", quantity: "", contactMethod: "WhatsApp", problem: "" };
}

function text(value: unknown, field: keyof EnquiryInput): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength[field]) : "";
}

export function cleanEnquiry(raw: Record<string, unknown>): EnquiryInput {
  const requested = text(raw.type, "type");
  const type = enquiryTypes.find((t) => t === requested) ?? "general";
  return {
    type,
    name: text(raw.name, "name"),
    phone: text(raw.phone, "phone"),
    email: text(raw.email, "email"),
    message: text(raw.message, "message"),
    model: text(raw.model, "model"),
    quantity: text(raw.quantity, "quantity"),
    contactMethod: text(raw.contactMethod, "contactMethod") || "WhatsApp",
    problem: text(raw.problem, "problem"),
  };
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (input.name.length < 2) errors.name = "Please enter your name.";
  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) errors.phone = "Please enter a phone number we can reach.";
  if (input.email !== "" && !emailPattern.test(input.email)) errors.email = "That email address does not look right.";
  if (input.type === "general" && input.message.length < 5) errors.message = "Please tell us how we can help.";
  if (input.type === "iphone" && input.model === "") errors.model = "Please enter the iPhone model.";
  if (input.type === "bulk") {
    if (input.model === "") errors.model = "Please enter the iPhone model.";
    const count = Number(input.quantity);
    if (!Number.isFinite(count) || count < 1) errors.quantity = "Please enter a quantity of 1 or more.";
  }
  if (input.type === "repair") {
    if (input.model === "") errors.model = "Please enter the iPhone model.";
    if (input.problem.length < 3) errors.problem = "Please describe the problem.";
  }
  return errors;
}

export function summaryLines(input: EnquiryInput): Array<[string, string]> {
  const lines: Array<[string, string]> = [
    ["Type", typeLabels[input.type]],
    ["Name", input.name],
    ["Phone", input.phone],
  ];
  if (input.email) lines.push(["Email", input.email]);
  if (input.model) lines.push(["iPhone model", input.model]);
  if (input.quantity) lines.push(["Quantity", input.quantity]);
  if (input.type === "bulk") lines.push(["Preferred contact", input.contactMethod]);
  if (input.problem) lines.push(["Problem", input.problem]);
  if (input.message) lines.push(["Message", input.message]);
  return lines;
}

export function headline(input: EnquiryInput): string {
  switch (input.type) {
    case "iphone":
      return input.model;
    case "bulk":
      return `${input.model} x${input.quantity}`;
    case "repair":
      return `${input.model}: ${input.problem.slice(0, 40)}`;
    default:
      return input.message.slice(0, 40);
  }
}
