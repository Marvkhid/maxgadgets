"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "6rem 1.5rem", color: "#101010" }}>
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Max Gadgets</h1>
        <p style={{ marginTop: "1rem" }}>Something went wrong. Please try again, or call +234 706 263 5457.</p>
        <button
          type="button"
          onClick={reset}
          style={{ marginTop: "1.5rem", minHeight: 48, padding: "0 1.5rem", borderRadius: 999, border: 0, background: "#e5242a", color: "#fff", fontWeight: 800 }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
