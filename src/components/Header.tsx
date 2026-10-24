"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business, navItems } from "@/data/business";
import { waLink, messages } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="ankara !h-[10px] !bg-[length:auto_10px]" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-10">
        <Link href="/" aria-label={`${business.name} home`} onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Max Gadget Enterprise logo"
            width={869}
            height={365}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "relative py-1 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-brand hover:after:scale-x-100",
                isActive(pathname, item.href) && "text-brand after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink(messages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-full bg-brand px-5 text-sm font-extrabold text-white transition hover:bg-[#c81d22] sm:inline-flex"
          >
            Chat on WhatsApp
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-neutral-300 lg:hidden"
          >
            <span className={cn("h-0.5 w-5 bg-ink transition-transform duration-300", open && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 w-5 bg-ink transition-opacity duration-300", open && "opacity-0")} />
            <span className={cn("h-0.5 w-5 bg-ink transition-transform duration-300", open && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "overflow-hidden transition-all duration-500 lg:hidden",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pb-6 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-3 py-3 font-display text-2xl font-extrabold uppercase",
                isActive(pathname, item.href) ? "text-brand" : "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={waLink(messages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 text-sm font-extrabold text-white"
          >
            Chat on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
