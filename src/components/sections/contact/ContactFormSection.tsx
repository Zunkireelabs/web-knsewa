'use client';

import React, { useState } from 'react';
import { GridLines } from '@/components/ui/GridLines';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ArrowRight, CheckIcon } from '@/components/ui/Icons';

interface ContactFormSectionProps {
  label: string;
  headline: string;
  description: string;
  projectTypes: string[];
  recipientEmail: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

// Google Apps Script web app — appends each submission to the KNSEWA Website
// Leads sheet and emails a notification. See docs/leads-integration/apps-script.gs.
const LEADS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwh-HuwZGb4DwJzvL40TGHzMU4grD4KdvfR6RQeC8A3sg9-K-lGWENjvV4AQElWQO1D/exec';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  message: '',
  website: '', // honeypot — real visitors never fill this in
};

export function ContactFormSection({
  label,
  headline,
  description,
  projectTypes,
  recipientEmail,
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function openMailtoFallback() {
    const subject = encodeURIComponent(
      `Website Inquiry — ${formData.projectType || 'General'}`,
    );
    const lines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : '',
      formData.company ? `Company: ${formData.company}` : '',
      formData.projectType ? `Project Type: ${formData.projectType}` : '',
      '',
      'Message:',
      formData.message,
    ].filter(Boolean);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    setErrorMessage('');

    try {
      // Content-Type must stay "text/plain" here — Apps Script web apps
      // don't handle CORS preflight (OPTIONS) requests, and text/plain
      // keeps this a "simple request" that skips preflight entirely.
      // The body is still JSON; the script parses it with JSON.parse.
      const res = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      });

      const data: { success?: boolean; error?: string } = await res.json();

      if (res.ok && data.success) {
        setState('success');
        setFormData(initialFormData);
      } else {
        setErrorMessage(data.error ?? 'Something went wrong. Please try again or email us directly.');
        setState('error');
      }
    } catch {
      setErrorMessage('Network error. Please email us directly or try again.');
      setState('error');
    }
  }

  return (
    <section
      style={{
        background: 'var(--color-gray-100)',
        padding: 'clamp(3rem, 5vw, 5rem) 0',
        position: 'relative',
      }}
    >
      <GridLines variant="gray" />

      <div className="wrapper prel" style={{ zIndex: 10 }}>
        <div className="contact-form-layout">
          {/* Left: copy */}
          <div className="contact-form-copy">
            <AnimatedElement>
              <p className="section-label" style={{ color: 'var(--color-accent)' }}>
                {label}
              </p>
            </AnimatedElement>
            <AnimatedElement delay={0.05}>
              <h2
                className="title"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.8125rem)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-primary)',
                  marginTop: '1.25rem',
                }}
              >
                {headline}
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={0.1}>
              <div
                style={{
                  width: '36px',
                  height: '2px',
                  background: 'var(--color-accent)',
                  margin: '1.75rem 0',
                }}
              />
            </AnimatedElement>
            <AnimatedElement delay={0.15}>
              <p
                className="para"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--color-gray-600)',
                }}
              >
                {description}
              </p>
            </AnimatedElement>
          </div>

          {/* Right: form — aligned to the right half of the grid */}
          <AnimatedElement direction="right" delay={0.2} className="contact-form-card">
            {state === 'success' ? (
              <div className="contact-form-success">
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: 'var(--color-accent)',
                    color: 'var(--color-white)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <CheckIcon />
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: 'var(--color-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Message sent
                </h3>
                <p style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
                  Thanks for reaching out. Our team will get back to you within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setState('idle')}
                  style={{
                    marginTop: '1.5rem',
                    color: 'var(--color-accent)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+977-..."
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="company">Company / Organization</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="contact-form-field">
                  <label htmlFor="projectType">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact-form-field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                  />
                </div>

                {state === 'error' && (
                  <div role="alert" className="contact-form-error">
                    {errorMessage}{' '}
                    <button
                      type="button"
                      onClick={openMailtoFallback}
                      style={{ textDecoration: 'underline', fontWeight: 500 }}
                    >
                      Email us directly instead
                    </button>
                  </div>
                )}

                {/* Honeypot — hidden from real visitors, left blank by them */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                  }}
                />

                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start' }}
                >
                  {state === 'submitting' ? 'Sending…' : 'Send Message'}
                  <ArrowRight width={24} height={10} />
                </button>
              </form>
            )}
          </AnimatedElement>
        </div>
      </div>

      <style jsx>{`
        .contact-form-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .contact-form-layout {
            grid-template-columns: 1fr;
          }
        }
        .contact-form-copy {
          position: sticky;
          top: 100px;
          padding-right: clamp(2rem, 4vw, 4rem);
        }
        @media (max-width: 1024px) {
          .contact-form-copy {
            position: static;
            padding-right: 0;
            margin-bottom: 2.5rem;
          }
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: var(--color-white);
          padding: clamp(1.75rem, 3vw, 2.5rem);
          border: 1px solid var(--color-gray-200);
        }
        .contact-form-success {
          background: var(--color-white);
          padding: clamp(2rem, 4vw, 3rem);
          border: 1px solid var(--color-gray-200);
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 640px) {
          .contact-form-row {
            grid-template-columns: 1fr;
          }
        }
        .contact-form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-form-field label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gray-600);
        }
        .contact-form-field input,
        .contact-form-field textarea,
        .contact-form-field select {
          width: 100%;
          padding: 0.85rem 1rem;
          font-size: 0.9375rem;
          font-family: inherit;
          color: var(--color-primary);
          background: var(--color-white);
          border: 1px solid var(--color-gray-200);
          transition: border-color 0.2s ease;
        }
        .contact-form-field input:focus,
        .contact-form-field textarea:focus,
        .contact-form-field select:focus {
          outline: none;
          border-color: var(--color-accent);
        }
        .contact-form-field textarea {
          resize: vertical;
          min-height: 120px;
        }
        .contact-form-error {
          padding: 0.75rem 1rem;
          background: #fdecea;
          border: 1px solid #f5c6cb;
          color: #842029;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  );
}
