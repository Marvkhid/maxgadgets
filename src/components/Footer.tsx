import Image from "next/image";
import Link from "next/link";
import { business, navItems } from "@/data/business";
import { AnkaraBand, Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="mt-10">
      <AnkaraBand />
      <Container className="grid gap-10 py-12 text-sm leading-relaxed md:grid-cols-3">
        <div>
          <Image
            src="/images/logo.png"
            alt="Max Gadget Enterprise logo"
            width={869}
            height={365}
            className="mb-4 h-14 w-auto"
          />
          <p>{business.address.line1}</p>
          <p>{business.address.line2}</p>
          <p className="mt-2 text-neutral-600">Closed on {business.closedDay}s</p>
        </div>
        <div className="space-y-1">
          <p className="font-extrabold uppercase tracking-widest text-brand">Contact</p>
          {business.phones.map((phone) => (
            <p key={phone.tel}>
              <a className="hover:text-brand" href={`tel:${phone.tel}`}>
                {phone.display}
              </a>
            </p>
          ))}
          <p>
            <a className="hover:text-brand" href={`mailto:${business.email}`}>
              {business.email}
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="space-y-1">
          <p className="font-extrabold uppercase tracking-widest text-brand">Pages</p>
          {navItems.map((item) => (
            <p key={item.href}>
              <Link className="hover:text-brand" href={item.href}>
                {item.label}
              </Link>
            </p>
          ))}
          <p>
            <Link className="hover:text-brand" href="/privacy">
              Privacy
            </Link>
          </p>
        </nav>
      </Container>
      <p className="border-t border-neutral-200 px-5 py-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {business.name}. Prices change daily, so we confirm them on WhatsApp.
      </p>
    </footer>
  );
}
