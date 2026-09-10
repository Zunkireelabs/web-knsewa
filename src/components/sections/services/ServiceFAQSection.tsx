"use client";
import { useState } from "react";
import type { FAQItem } from "@/types/content";

export function ServiceFAQSection({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: "clamp(4rem, 7vw, 7rem) 0", background: "var(--color-white, #fff)" }}>
      <div className="wrapper">
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}
          className="md:grid-cols-5 md:gap-16"
        >
          {/* Left: label */}
          <div className="md:col-span-2">
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
          </div>

          {/* Right: accordion */}
          <div className="md:col-span-3">
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
        </div>
      </div>
    </section>
  );
}
