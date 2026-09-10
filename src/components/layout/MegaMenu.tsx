'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowRight, SearchIcon, CloseIcon } from '@/components/ui/Icons';

interface MegaMenuItem {
  label: string;
  href: string;
}

interface MegaMenuColumn {
  title: string;
  items: MegaMenuItem[];
}

interface FeaturedContent {
  title: string;
  description: string;
  image: string;
  href: string;
}

interface IntroContent {
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  columns: MegaMenuColumn[];
  featured?: FeaturedContent;
  intro?: IntroContent;
}

export function MegaMenu({ isOpen, onClose, columns, featured, intro }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const content = contentRef.current;
    if (!menu || !content) return;

    if (isOpen) {
      gsap.set(menu, { display: 'block' });
      gsap.fromTo(
        menu,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        content.children,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="mega-menu"
      style={{
        position: 'relative',
        zIndex: 50,
        display: 'none',
        opacity: 0,
        background: 'var(--color-white)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
      }}
    >
      <div style={{ display: 'flex', minHeight: '380px' }}>
        {/* Blue Intro Sidebar */}
        {intro && (
          <div
            style={{
              width: '280px',
              flexShrink: 0,
              background: 'var(--color-accent)',
              padding: '48px 32px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 500,
                color: 'var(--color-white)',
                marginBottom: '1rem',
              }}
            >
              {intro.title}
            </h3>
            <p
              style={{
                fontSize: '0.8125rem',
                fontWeight: 400,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.65)',
                marginBottom: 'auto',
              }}
            >
              {intro.description}
            </p>
            <Link
              href={intro.cta.href}
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--color-white)',
                textDecoration: 'none',
                marginTop: '2rem',
                transition: 'opacity 0.3s ease',
              }}
            >
              {intro.cta.text}
              <ArrowRight width={20} height={8} />
            </Link>
          </div>
        )}

        {/* Navigation Columns */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            display: 'flex',
            borderLeft: '1px solid var(--color-gray-200)',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              padding: '48px 40px',
            }}
          >
            {columns.map((column, idx) => (
              <div key={idx} style={{ minWidth: '130px' }}>
                <h4
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    marginBottom: '1.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {column.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{ marginBottom: '0.75rem' }}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="mega-menu-link"
                        style={{
                          fontSize: '0.8125rem',
                          fontWeight: 400,
                          color: 'var(--color-gray-500)',
                          textDecoration: 'none',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Content */}
          {featured && (
            <div
              style={{
                width: '260px',
                flexShrink: 0,
                padding: '48px 32px',
                borderLeft: '1px solid var(--color-gray-200)',
              }}
            >
              <h4
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--color-gray-400)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '1.25rem',
                }}
              >
                Featured Project
              </h4>
              <Link
                href={featured.href}
                onClick={onClose}
                className="group"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    marginBottom: '0.875rem',
                    borderRadius: '16px',
                  }}
                >
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    style={{ transition: 'transform 0.5s ease' }}
                    unoptimized
                  />
                </div>
                <h5
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--color-primary)',
                    marginBottom: '0.25rem',
                    lineHeight: 1.3,
                  }}
                >
                  {featured.title}
                </h5>
                <p
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 400,
                    color: 'var(--color-gray-400)',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                  }}
                >
                  {featured.description}
                </p>
              </Link>
              <Link
                href="/projects"
                onClick={onClose}
                className="mega-menu-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-primary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                Learn More
                <ArrowRight width={18} height={7} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Search Overlay Component
interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlay, { display: 'flex' });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = '';
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden opacity-0 bg-[var(--color-primary)] flex-col items-center justify-center"
    >
      <div className="w-full max-w-3xl px-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="What are you looking for?"
            className="w-full bg-transparent border-b-2 border-white/30 py-6 text-4xl text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-[var(--color-accent)] transition-colors"
            aria-label="Search"
          >
            <SearchIcon className="w-8 h-8" />
          </button>
        </div>
        <p className="mt-4 text-white/50">
          Press Enter to search or ESC to close
        </p>
      </div>

      <button
        onClick={onClose}
        className="absolute top-8 right-8 p-2 text-white hover:text-[var(--color-accent)] transition-colors"
        aria-label="Close search"
      >
        <CloseIcon className="w-8 h-8" />
      </button>
    </div>
  );
}
