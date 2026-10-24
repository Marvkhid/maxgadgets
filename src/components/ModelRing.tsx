import type { PhoneModel } from "@/data/models";
import { PhoneArt } from "@/components/PhoneArt";
import { messages, waLink } from "@/lib/whatsapp";

export function ModelRing({ items }: { items: PhoneModel[] }) {
  const step = 360 / items.length;
  return (
    <>
    <div aria-hidden="true" className="scene relative mx-auto h-[380px] max-w-5xl overflow-hidden [--r:230px] md:h-[430px] md:[--r:420px]">
      <div
        className="preserve absolute left-1/2 top-6 -ml-[62px] h-[320px] w-[124px]"
        style={{ transform: "translateZ(calc(var(--r) * -1))" }}
      >
        <div className="preserve animate-ring relative h-full w-full hover:[animation-play-state:paused]">
          {items.map((m, i) => (
            <a
              key={m.id}
              href={waLink(messages.product(m.name))}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className="face absolute inset-0 flex flex-col items-center gap-2 rounded-3xl bg-white p-3 text-center shadow-xl ring-1 ring-neutral-200"
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--r))` }}
            >
              <PhoneArt color={m.color} lenses={m.lenses} compact className="h-[150px] w-[74px]" />
              <span className="font-display text-sm font-extrabold uppercase leading-tight">{m.name}</span>
              <span className="text-xs text-neutral-500">{m.year}</span>
              <span className="rounded-full bg-brand px-4 py-1.5 text-xs font-extrabold text-white">Ask</span>
            </a>
          ))}
        </div>
      </div>
    </div>
    <ul className="sr-only">
      {items.map((m) => (
        <li key={m.id}>
          <a href={waLink(messages.product(m.name))} target="_blank" rel="noopener noreferrer">
            Ask about the {m.name} on WhatsApp
          </a>
        </li>
      ))}
    </ul>
    </>
  );
}
