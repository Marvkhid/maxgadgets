import { services, serviceNote } from "@/data/services";
import { messages, waLink } from "@/lib/whatsapp";
import { FlipCard } from "@/components/FlipCard";
import { Reveal } from "@/components/motion";

export function ServiceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, i) => (
        <Reveal key={service.title} delay={(i % 4) * 80}>
          <FlipCard
            index={i}
            title={service.title}
            description={service.description}
            note={serviceNote}
            href={waLink(messages.service(service.title))}
          />
        </Reveal>
      ))}
    </div>
  );
}
