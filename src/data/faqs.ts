export interface Faq {
  question: string;
  answer: string;
}

export const generalFaqs: Faq[] = [
  { question: "Where are the prices?", answer: "Prices change every day, so we confirm today's price and availability on WhatsApp." },
  { question: "How do I enquire about an iPhone?", answer: "Tap WhatsApp on any product to send the model and ask for the current price and availability." },
  { question: "Can I buy in bulk?", answer: "Yes. Request a bulk quote on WhatsApp and we will respond." },
  { question: "Do you offer delivery?", answer: "Yes. Message us to arrange delivery." },
  { question: "Where is the shop?", answer: "Block A, Shop 13, Fayose Market, Ado-Ekiti. We are closed on Sundays." },
  { question: "What is the 7-day warranty?", answer: "It applies to eligible UK-used (Tokunbo) gadgets. Ask us about your device." },
  { question: "How do I enquire about a repair?", answer: "Message us the iPhone model and the problem on WhatsApp." },
];

export const repairFaqs: Faq[] = [
  { question: "How do I enquire?", answer: "Message us on WhatsApp with your iPhone model and the problem." },
  { question: "Can I bring my phone in?", answer: "Yes. Visit Block A, Shop 13, Fayose Market, Ado-Ekiti. We are closed on Sundays." },
  { question: "Which devices do you repair?", answer: "We specialise in iPhone repair, iPad and other devices, and we are into microsoldering." },
];

export const historySummary =
  "The first iPhone arrived in 2007 and changed what a phone could do. Since then the App Store, sharper screens, Touch ID, Face ID, 5G, USB-C and the Dynamic Island have each reshaped the phones we sell. The newest are the iPhone 18 Pro and 18 Pro Max, released in September 2026. At Max Gadgets you can ask about those and about earlier models down to the iPhone 12.";
