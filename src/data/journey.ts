export type JourneyIcon = "drop" | "home" | "laptop" | "shop" | "counter" | "scope" | "card" | "smile" | "game";

export interface JourneyStep {
  n: number;
  title: string;
  text: string;
  /** File name (without extension) in public/images/journey. Drop a photo with this name there and it appears. */
  file: string;
  alt: string;
  position: string;
  icon: JourneyIcon;
}

export const journey: JourneyStep[] = [
  { n: 1, title: "The accident", text: "David drops his phone outdoors and the screen breaks.", file: "step1_dropped_phone", alt: "A man on the ground reaching for his phone as it falls and its screen shatters", position: "50% 50%", icon: "drop" },
  { n: 2, title: "The frustration", text: "Back home, David sits with a broken phone, sad and frustrated.", file: "step2_sad_at_home", alt: "A man sitting on a sofa at home with his head in his hand, holding a phone with a shattered screen", position: "50% 30%", icon: "home" },
  { n: 3, title: "Online inquiry", text: "He browses the Max Gadgets website and sends a repair inquiry.", file: "step3_website_inquiry", alt: "A man at a laptop sending a repair inquiry through the Max Gadget Enterprise website", position: "50% 50%", icon: "laptop" },
  { n: 4, title: "Arriving at the store", text: "He arrives at the shop at Block A, Shop 13, Fayose Market.", file: "step4_arriving_store", alt: "A man holding a cracked phone outside the Max Gadget Enterprise shop front", position: "50% 50%", icon: "shop" },
  { n: 5, title: "Store consultation", text: "At the counter he explains the problem and hands over the phone.", file: "step5_store_inquiry", alt: "A customer and a Max Gadget Enterprise team member at the counter looking at a phone with a cracked screen", position: "50% 58%", icon: "counter" },
  { n: 6, title: "Expert repair", text: "The technician repairs the screen with care under the microscope.", file: "step6_phone_repair", alt: "A technician repairing a phone board under a microscope, with the magnified board on a monitor beside him", position: "50% 46%", icon: "scope" },
  { n: 7, title: "Quick payment", text: "After a successful repair, David pays quickly and smoothly at the counter.", file: "step7_making_payment", alt: "A man paying at the Max Gadget Enterprise counter", position: "50% 45%", icon: "card" },
  { n: 8, title: "Satisfied customer", text: "A happy David shows off his fixed phone screen.", file: "step8_happy_customer", alt: "A smiling man holding up his repaired phone at the shop counter", position: "50% 35%", icon: "smile" },
  { n: 9, title: "Back to normal", text: "At home again, David enjoys his games on a fully restored phone.", file: "step9_playing_game", alt: "A smiling man on a sofa playing a game on his phone", position: "50% 45%", icon: "game" },
];
