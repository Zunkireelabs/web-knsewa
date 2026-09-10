'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { MenuIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, PhoneIcon, MailIcon, FacebookIcon } from '@/components/ui/Icons';
import { MegaMenu } from './MegaMenu';

import type { NavItem, SiteSettings } from '@/types/content';

const SERVICES_SUBNAV = [
  { label: 'Commercial Construction', href: '/services/commercial' },
  { label: 'Government & Institutional', href: '/services/government' },
  { label: 'Industrial Facilities', href: '/services/industrial' },
  { label: 'Infrastructure Development', href: '/services/infrastructure' },
];

interface HeaderProps {
  settings: SiteSettings;
  navigation: NavItem[];
}

// Mega menu content structure
const megaMenuContent = {
  services: {
    intro: {
      title: 'Our Services',
      description:
        'KNS is a leading construction company in Nepal, delivering excellence across commercial, government, and infrastructure projects for over 30 years.',
      cta: {
        text: 'Explore All Services',
        href: '/services',
      },
    },
    columns: [
      {
        title: 'Construction',
        items: [
          { label: 'Commercial Buildings', href: '/services/commercial' },
          { label: 'Government Projects', href: '/services/government' },
          { label: 'Industrial Facilities', href: '/services/industrial' },
          { label: 'Infrastructure', href: '/services/infrastructure' },
        ],
      },
      {
        title: 'Resources',
        items: [
          { label: 'Case Studies', href: '/projects' },
          { label: 'Latest News', href: '/insights' },
          { label: 'Our Process', href: '/about' },
        ],
      },
    ],
    featured: {
      title: 'Kathmandu Business Tower',
      description: 'A landmark commercial development in the heart of the capital.',
      image: '/images/projects/project-1.jpg',
      href: '/projects/kathmandu-business-tower',
    },
  },
};

export function Header({ settings, navigation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
const [headerHeight, setHeaderHeight] = useState(80);
  const headerRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    });
    ro.observe(headerRef.current);
    setHeaderHeight(headerRef.current.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const closeMegaMenu = useCallback(() => {
    setActiveMegaMenu(null);
  }, []);

  const handleNavHover = (href: string) => {
    if (href === '/services') {
      setActiveMegaMenu('services');
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleHeaderLeave = () => {
    setActiveMegaMenu(null);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
        onMouseLeave={handleHeaderLeave}
      >
        <div className="header-holder">
          {/* Logo */}
          <Link href="/" className="header-logo">
            <img src="/images/khusbhu-logo.png" alt="Khushbu Nirman Sewa" className="header-logo-img" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav hidden lg:flex items-stretch h-full">
            {navigation.map((item) => {
              const isActive = item.href === '/services' && activeMegaMenu === 'services';
              const isServices = item.href === '/services';
              return (
                <div
                  key={item.href}
                  className={`relative flex items-center h-full ${isActive ? 'mega-menu-nav-active' : ''}`}
                  onMouseEnter={() => handleNavHover(item.href)}
                >
                  <Link
                    href={item.href}
                    className={`header-link flex items-center gap-1 h-full px-6 ${isActive ? '!text-[var(--color-primary)]' : ''}`}
                  >
                    {item.label}
                    {isServices && (
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform ${
                          activeMegaMenu === 'services' ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* CTA Button */}
            <Link href="/contact" className="header-cta">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-3 ${
              isScrolled || isMobileMenuOpen ? 'text-[var(--color-primary)]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mega Menu */}
        {activeMegaMenu === 'services' && (
          <div
            className="absolute left-0 right-0"
            style={{ top: 'calc(100% - 1.5rem)' }}
            onMouseEnter={() => setActiveMegaMenu('services')}
            onMouseLeave={closeMegaMenu}
          >
            <MegaMenu
              isOpen={true}
              onClose={closeMegaMenu}
              intro={megaMenuContent.services.intro}
              columns={megaMenuContent.services.columns}
              featured={megaMenuContent.services.featured}
            />
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed z-[90] lg:hidden flex flex-col transform transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: headerHeight, left: 0, right: 0, bottom: 0, background: 'var(--color-primary)' }}
      >
        {/* Scrollable nav area */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <nav className="flex flex-col px-6 pt-2">
            {[...navigation, { label: 'Contact', href: '/contact', children: [] }].map((item) => {
              const isServices = item.href === '/services';
              if (isServices) {
                return (
                  <div
                    key={item.href}
                    className="flex flex-col"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {/* Services row */}
                    <div className="flex items-center justify-between" style={{ minHeight: '3rem' }}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 flex items-center font-medium tracking-wide"
                        style={{ color: 'var(--color-white)', fontSize: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="p-2.5"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                        aria-label="Toggle services"
                      >
                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Services sub-items */}
                    <div className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                      <div className="flex flex-col mb-2">
                        {SERVICES_SUBNAV.map((sub, idx) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3"
                            style={{
                              color: 'rgba(255,255,255,0.75)',
                              fontSize: '0.9375rem',
                              lineHeight: 1.4,
                              paddingTop: '0.75rem',
                              paddingBottom: '0.75rem',
                              borderTop: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            <span
                              className="flex-shrink-0 rounded-full"
                              style={{ width: '5px', height: '5px', background: 'var(--color-accent)' }}
                            />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between font-medium tracking-wide"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--color-white)',
                    fontSize: '1rem',
                    minHeight: '3rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                  }}
                >
                  {item.label}
                  <ChevronRightIcon className="w-4 h-4 text-white/30" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom contact strip */}
        <div className="px-6 py-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center justify-center gap-4">
            <a
              href={`tel:${settings.phone}`}
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {settings.phone}
            </a>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <a
              href={`mailto:${settings.email}`}
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {settings.email}
            </a>
          </div>
        </div>
      </div>

</>
  );
}
