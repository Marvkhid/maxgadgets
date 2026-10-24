import Image from "next/image";
import { Reveal, Tilt } from "@/components/motion";
import { Eyebrow, Heading, Section } from "@/components/ui";
import { availableLifestyle, lifestylePhoto, type LifestyleSlot } from "@/lib/lifestyle";
import { cn } from "@/lib/cn";

export function LifestyleImage({ slot, className, sizes }: { slot: LifestyleSlot; className?: string; sizes: string }) {
  const photo = lifestylePhoto(slot);
  if (!photo) return null;
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl bg-neutral-100", className)}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover transition-transform duration-[900ms] group-hover:scale-105" />
    </div>
  );
}

export function LifestyleMosaic({ title = "Real people, real phones" }: { title?: string }) {
  const photos = availableLifestyle();
  if (photos.length === 0) return null;
  return (
    <Section className="bg-neutral-50">
      <Eyebrow>Around the shop</Eyebrow>
      <Heading className="mt-3">{title}</Heading>
      <div className="mt-10 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3 md:auto-rows-[280px]">
        {photos.map((photo, i) => (
          <Reveal key={photo.slot} delay={(i % 3) * 90} className={i === 0 ? "sm:row-span-2" : undefined}>
            <Tilt max={6} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl bg-neutral-100">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-105" />
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
