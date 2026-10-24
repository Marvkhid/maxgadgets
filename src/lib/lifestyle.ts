import fs from "node:fs";
import path from "node:path";

/**
 * Real-life photos are picked up automatically. Save a photo in
 * public/images/lifestyle with one of these names (.jpg, .jpeg, .png or .webp)
 * and rebuild. Slots without a photo are simply not shown.
 */
export const lifestyleSlots = {
  buying: { name: "buying-iphone", alt: "A customer choosing an iPhone at the Max Gadgets counter" },
  entering: { name: "entering-shop", alt: "A customer walking into the Max Gadgets shop" },
  happy: { name: "happy-customer", alt: "A happy customer with a new iPhone" },
  handover: { name: "repair-handover", alt: "A customer collecting a repaired iPhone" },
  delivery: { name: "delivery", alt: "A Max Gadgets delivery being handed to a customer" },
  friends: { name: "friends-choosing", alt: "Friends choosing phones together at the shop" },
} as const;

export type LifestyleSlot = keyof typeof lifestyleSlots;

export interface LifestylePhoto {
  slot: LifestyleSlot;
  src: string;
  alt: string;
}

const extensions = ["jpg", "jpeg", "png", "webp"];

/** Returns the public URL of images/<dir>/<base>.<ext> if the file exists. */
export function findImage(dir: string, base: string): string | null {
  for (const ext of extensions) {
    const file = `${base}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", "images", dir, file))) {
      return `/images/${dir}/${file}`;
    }
  }
  return null;
}

export function lifestylePhoto(slot: LifestyleSlot): LifestylePhoto | null {
  const { name, alt } = lifestyleSlots[slot];
  const src = findImage("lifestyle", name);
  return src ? { slot, src, alt } : null;
}

export function availableLifestyle(): LifestylePhoto[] {
  const slots = Object.keys(lifestyleSlots) as LifestyleSlot[];
  return slots.map((slot) => lifestylePhoto(slot)).filter((p): p is LifestylePhoto => p !== null);
}
