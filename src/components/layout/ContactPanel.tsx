'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CloseIcon, PhoneIcon, MailIcon, MapPinIcon } from '@/components/ui/Icons';
import type { SiteSettings } from '@/types/content';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SiteSettings;
}

export function ContactPanel({ isOpen, onClose, settings }: ContactPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    projectType: '',
  });

  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!panel || !content) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(panel, { display: 'block' });
      gsap.to(panel, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.fromTo(
        content.children,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(panel, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(panel, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      projectType: '',
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[190] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 z-[200] w-full max-w-lg bg-white shadow-2xl hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-[var(--color-gray-200)] px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
            <h2 className="text-2xl font-medium">Get in Touch</h2>
            <button
              onClick={onClose}
              className="p-2.5 text-[var(--color-gray-500)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="Close panel"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div ref={contentRef} className="p-5 sm:p-8">
            {/* Contact Info */}
            <div className="mb-8 space-y-4">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-3 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>{settings.phone}</span>
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
              >
                <MailIcon className="w-5 h-5" />
                <span>{settings.email}</span>
              </a>
              <div className="flex items-start gap-3 text-[var(--color-gray-600)]">
                <MapPinIcon className="w-5 h-5 mt-0.5" />
                <span>
                  {settings.address.street}
                  <br />
                  {settings.address.city}, {settings.address.country}
                </span>
              </div>
              {settings.additionalLocations?.map((location) => (
                <React.Fragment key={location.label}>
                  <div className="flex items-start gap-3 text-[var(--color-gray-600)]">
                    <MapPinIcon className="w-5 h-5 mt-0.5" />
                    <span>{location.label}</span>
                  </div>
                  {location.phone && (
                    <a
                      href={`tel:${location.phone}`}
                      className="flex items-center gap-3 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <PhoneIcon className="w-5 h-5" />
                      <span>{location.phone}</span>
                    </a>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--color-gray-200)] my-8" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--color-gray-600)] mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-[var(--color-gray-200)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-gray-600)] mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-[var(--color-gray-200)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[var(--color-gray-600)] mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-[var(--color-gray-200)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="+977-..."
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-[var(--color-gray-600)] mb-2"
                >
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-[var(--color-gray-200)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-[var(--color-gray-600)] mb-2"
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-[var(--color-gray-200)] focus:border-[var(--color-primary)] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select a project type</option>
                  <option value="commercial">Commercial Construction</option>
                  <option value="government">Government Projects</option>
                  <option value="industrial">Industrial Construction</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--color-gray-600)] mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-[var(--color-gray-200)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
