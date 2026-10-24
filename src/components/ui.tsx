import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion";
import { cn } from "@/lib/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-10", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative isolate scroll-mt-24 py-16 md:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-extrabold uppercase tracking-[0.16em] text-brand", className)}>
      {children}
    </p>
  );
}

export function Heading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type Variant = "primary" | "outline" | "light" | "dark";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-[#c81d22]",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white",
  light: "bg-white text-ink hover:bg-neutral-100",
  dark: "bg-ink text-white hover:bg-neutral-800",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const classes = cn(
    "shine relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-extrabold transition duration-300 hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    className,
  );
  const wrapper = className?.includes("w-full") ? "block w-full" : "inline-block";
  if (href.startsWith("/")) {
    return (
      <Magnetic className={wrapper}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </Magnetic>
    );
  }
  const external = href.startsWith("http");
  return (
    <Magnetic className={wrapper}>
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    </Magnetic>
  );
}

export function AnkaraBand({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("ankara", className)} />;
}

export function Disclosure({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="border-t border-neutral-200 py-5">
      <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-xl font-extrabold uppercase tracking-tight">
        {title}
        <span aria-hidden="true" className="plus text-2xl text-brand transition-transform duration-300">
          +
        </span>
      </summary>
      <div className="details-body mt-3">{children}</div>
    </details>
  );
}
