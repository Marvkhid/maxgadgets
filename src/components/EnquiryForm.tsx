"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { models } from "@/data/models";
import {
  emptyEnquiry,
  validateEnquiry,
  typeLabels,
  type EnquiryErrors,
  type EnquiryInput,
  type EnquiryType,
} from "@/lib/enquiry";
import { trackEvent } from "@/lib/track";
import { enquiryMessage, waLink } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "mt-1.5 min-h-12 w-full rounded-xl border-[1.5px] border-ink bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

function fieldId(type: EnquiryType, key: string): string {
  if (key === "quantity") return "bulk-quantity";
  if (key === "problem") return "repair-problem";
  return `${type}-${key}`;
}

function aria(id: string, error?: string) {
  return { "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined } as const;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-[#c0161c]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm({ type, heading }: { type: EnquiryType; heading?: string }) {
  const [values, setValues] = useState<EnquiryInput>(() => emptyEnquiry(type));
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const [copySent, setCopySent] = useState(false);

  function set(key: keyof EnquiryInput, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(fieldId(type, firstError))?.focus();
      return;
    }
    setStatus("sending");
    setNotice("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: trap }),
      });
      const json = (await response.json()) as { ok: boolean; copySent?: boolean; error?: string; errors?: EnquiryErrors };
      if (response.ok && json.ok) {
        setCopySent(Boolean(json.copySent));
        setStatus("sent");
        trackEvent("enquiry_submit", { enquiry_type: type });
        return;
      }
      if (json.errors) setErrors(json.errors);
      setNotice(json.error ?? "We could not send your enquiry.");
      setStatus("error");
    } catch {
      setNotice("We could not reach the server.");
      setStatus("error");
    }
  }

  const whatsapp = waLink(enquiryMessage(values));

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-ink">
        <p className="font-display text-3xl font-extrabold uppercase text-brand">Enquiry sent</p>
        <p className="mt-3 leading-relaxed">
          Thank you, {values.name}. Max Gadgets has your details.
          {copySent ? ` A copy was sent to ${values.email}.` : ""} For the fastest reply, continue on WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-full bg-brand px-6 text-sm font-extrabold text-white"
          >
            Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setValues(emptyEnquiry(type));
              setStatus("idle");
            }}
            className="min-h-12 rounded-full border-[1.5px] border-ink px-6 text-sm font-extrabold"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  const listId = `models-${type}`;
  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === "sending"} className="flex flex-col gap-4 rounded-3xl bg-white p-6 text-ink md:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#c81d22]">{heading ?? typeLabels[type]}</p>

      <Field id={`${type}-name`} label="Your name" error={errors.name}>
        <input id={`${type}-name`} {...aria(`${type}-name`, errors.name)} autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />
      </Field>
      <Field id={`${type}-phone`} label="Phone or WhatsApp number" error={errors.phone}>
        <input id={`${type}-phone`} {...aria(`${type}-phone`, errors.phone)} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} placeholder="e.g. 0706 000 0000" className={inputClass} />
      </Field>
      <Field id={`${type}-email`} label="Email (optional, we will send you a copy)" error={errors.email}>
        <input id={`${type}-email`} {...aria(`${type}-email`, errors.email)} type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />
      </Field>

      {type !== "general" ? (
        <Field id={`${type}-model`} label="iPhone model" error={errors.model}>
          <input id={`${type}-model`} {...aria(`${type}-model`, errors.model)} list={listId} value={values.model} onChange={(e) => set("model", e.target.value)} placeholder="e.g. iPhone 15 Pro Max" className={inputClass} />
          <datalist id={listId}>
            {models.map((m) => (
              <option key={m.id} value={m.name} />
            ))}
          </datalist>
        </Field>
      ) : null}

      {type === "bulk" ? (
        <>
          <Field id="bulk-quantity" label="Estimated quantity" error={errors.quantity}>
            <input id="bulk-quantity" {...aria("bulk-quantity", errors.quantity)} type="number" min={1} inputMode="numeric" value={values.quantity} onChange={(e) => set("quantity", e.target.value)} placeholder="e.g. 10" className={inputClass} />
          </Field>
          <Field id="bulk-contact" label="Preferred contact method">
            <select id="bulk-contact" value={values.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} className={inputClass}>
              <option>WhatsApp</option>
              <option>Phone call</option>
              <option>Email</option>
            </select>
          </Field>
        </>
      ) : null}

      {type === "repair" ? (
        <Field id="repair-problem" label="What is the problem?" error={errors.problem}>
          <textarea id="repair-problem" {...aria("repair-problem", errors.problem)} rows={4} value={values.problem} onChange={(e) => set("problem", e.target.value)} className={inputClass} />
        </Field>
      ) : (
        <Field id={`${type}-message`} label={type === "general" ? "How can we help?" : "Message (optional)"} error={errors.message}>
          <textarea id={`${type}-message`} {...aria(`${type}-message`, errors.message)} rows={4} value={values.message} onChange={(e) => set("message", e.target.value)} className={inputClass} />
        </Field>
      )}

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${type}-website`}>Website</label>
        <input id={`${type}-website`} tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 rounded-full bg-brand px-6 text-sm font-extrabold text-white transition hover:bg-[#c81d22] disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <span aria-hidden="true" className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </button>
      <p className="text-xs leading-relaxed text-neutral-500">
        By sending, you agree that Max Gadgets may contact you about this enquiry.{" "}
        <Link href="/privacy" className="font-bold underline">
          Privacy
        </Link>
      </p>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-ink px-6 text-sm font-extrabold transition hover:bg-ink hover:text-white"
      >
        Send on WhatsApp instead
      </a>
      <p role="alert" className="min-h-5 text-sm font-semibold text-[#c0161c]">
        {status === "error" ? `${notice} You can send it on WhatsApp instead.` : ""}
      </p>
    </form>
  );
}
