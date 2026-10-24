"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gaId } from "@/lib/site";
import { trackEvent } from "@/lib/track";

type Consent = "granted" | "denied" | null;

const storageKey = "mg-analytics-consent";

export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      setConsent(saved === "granted" || saved === "denied" ? saved : null);
    } catch {
      setConsent(null);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || consent !== null) return;
    const timer = window.setTimeout(() => setShow(true), 3500);
    return () => window.clearTimeout(timer);
  }, [ready, consent]);

  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = { page: window.location.pathname };
      if (href.includes("wa.me")) trackEvent("whatsapp_click", params);
      else if (href.startsWith("tel:")) trackEvent("phone_click", params);
      else if (href.startsWith("mailto:")) trackEvent("email_click", params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (!gaId) return null;

  function choose(value: "granted" | "denied") {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      /* private mode: the choice just lasts for this visit */
    }
    setConsent(value);
  }

  return (
    <>
      {consent === "granted" ? <GoogleAnalytics gaId={gaId} /> : null}
      {show && consent === null ? (
        <div
          role="dialog"
          aria-label="Analytics choice"
          className="fixed inset-x-3 bottom-3 z-50 flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-300 bg-white p-3 text-sm shadow-xl sm:inset-x-auto sm:left-4 sm:right-24 sm:max-w-2xl"
        >
          <p className="min-w-[14rem] flex-1 leading-snug">
            Allow Google Analytics to count visits and WhatsApp taps? Say no and nothing is tracked.{" "}
            <Link href="/privacy" className="font-bold underline">
              Privacy
            </Link>
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => choose("granted")} className="min-h-11 rounded-full bg-brand px-5 text-sm font-extrabold text-white">
              Yes, allow
            </button>
            <button type="button" onClick={() => choose("denied")} className="min-h-11 rounded-full border-[1.5px] border-ink px-5 text-sm font-extrabold">
              No thanks
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
