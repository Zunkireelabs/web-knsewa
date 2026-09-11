"use client";
import { useState } from "react";
import type { FAQItem } from "@/types/content";

interface ServiceFAQSectionProps {
  faqs: FAQItem[];
  /**
   * "section" (default) — full-width section with its own label/accordion
   * split, used on project and service pages.
   * "panel" — just the label + accordion, no outer section/wrapper/padding,
   * meant to be dropped into one column of a parent grid (e.g. beside
   * article text on insights pages).
   */
  variant?: "section" | "panel";
}

export function ServiceFAQSection({ faqs, variant = "section" }: ServiceFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordion = (
    <div>
      {faqs.map((item, i) => (
        <div key={i} style={{ borderTop: "1px solid #e5e5e5", padding: "24px 0" }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              padding: 0,
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: 1.4,
                color: "var(--color-primary, #17171b)",
              }}
            >
              {item.question}
            </span>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 300,
                color: "var(--color-accent, #0b5dd0)",
                flexShrink: 0,
                lineHeight: 1,
                marginTop: "2px",
              }}
            >
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <p
              style={{
                marginTop: "16px",
                fontSize: "16px",
                lineHeight: 1.6,
                color: "var(--color-gray-500, #73737b)",
              }}
            >
              {item.answer}
            </p>
          )}
        </div>
      ))}
      <div style={{ borderTop: "1px solid #e5e5e5" }} />
    </div>
  );

  const label = (
    <p
      style={{
        fontSize: "16px",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--color-accent, #0b5dd0)",
      }}
    >
      FAQ
    </p>
  );

  if (variant === "panel") {
    return (
      <div>
        <div style={{ marginBottom: "24px" }}>{label}</div>
        {accordion}
      </div>
    );
  }

  return (
    <section style={{ padding: "clamp(4rem, 7vw, 7rem) 0", background: "var(--color-white, #fff)" }}>
      <div className="wrapper">
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}
          className="md:grid-cols-5 md:gap-16"
        >
          <div className="md:col-span-2">{label}</div>
          <div className="md:col-span-3">{accordion}</div>
        </div>
      </div>
    </section>
  );
}
