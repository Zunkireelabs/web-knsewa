'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronDownIcon } from '@/components/ui/Icons';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CultureCommitment {
  id: string;
  title: string;
  description: string;
  image: string;
  stats?: {
    value: string;
    label: string;
  };
}

interface CultureSectionProps {
  commitments: CultureCommitment[];
  title?: string;
  subtitle?: string;
}

export function CultureSection({
  commitments,
  title = 'Our Commitments',
  subtitle = 'Building with Purpose',
}: CultureSectionProps) {
  const [activeCommitment, setActiveCommitment] = useState(commitments[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.fromTo(
      content,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  const handleCommitmentChange = (commitment: CultureCommitment, index: number) => {
    setActiveCommitment(commitment);
    setIsDropdownOpen(false);
    swiper?.slideTo(index);
  };

  return (
    <section ref={sectionRef} className="culture-section bg-[var(--color-primary)] pt-14 lg:pt-32">
      <div ref={contentRef} className="wrapper">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between section-header" style={{ marginBottom: '3rem' }}>
          <div>
            <span className="section-label text-[var(--color-accent)]">{subtitle}</span>
            <h2 className="title fs-45 text-white mt-2">{title}</h2>
          </div>

          {/* Dropdown Selector */}
          <div className="relative mt-6 lg:mt-0 w-full lg:w-auto" style={{ zIndex: 30 }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="culture-dropdown-toggle"
            >
              <span>{activeCommitment.title}</span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="culture-dropdown-menu">
                {commitments.map((commitment, index) => (
                  <button
                    key={commitment.id}
                    onClick={() => handleCommitmentChange(commitment, index)}
                    className={`culture-dropdown-item ${
                      activeCommitment.id === commitment.id ? 'active' : ''
                    }`}
                  >
                    {commitment.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveCommitment(commitments[s.activeIndex])}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="culture-swiper"
        >
          {commitments.map((commitment) => (
            <SwiperSlide key={commitment.id}>
              <div className="grid lg:grid-cols-2 items-center" style={{ gap: 'clamp(2rem, 5vw, 5rem)' }}>
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={commitment.image}
                    alt={commitment.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="text-white">
                  <h3 className="fs-30 font-medium" style={{ lineHeight: 1.2, marginBottom: '1.5rem' }}>{commitment.title}</h3>
                  <p className="fs-16" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {commitment.description}
                  </p>

                  {commitment.stats && (
                    <div style={{ marginBottom: '2rem' }}>
                      <span className="fs-45 font-light text-[var(--color-accent)]" style={{ lineHeight: 1.1, display: 'block' }}>
                        {commitment.stats.value}
                      </span>
                      <p className="fs-16" style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>{commitment.stats.label}</p>
                    </div>
                  )}


                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
}

// Default commitments
export const defaultCultureCommitments: CultureCommitment[] = [
  {
    id: 'safety',
    title: 'Safety First',
    description:
      'We prioritize the safety of our workers, partners, and communities above all else. Our comprehensive safety programs and rigorous protocols ensure that everyone returns home safely at the end of each day.',
    image: '/images/projects/project-1.jpg',
    stats: {
      value: '99.9%',
      label: 'Safety record across all projects',
    },
  },
  {
    id: 'sustainability',
    title: 'Environmental Stewardship',
    description:
      'We are committed to minimizing our environmental impact through sustainable building practices, efficient resource utilization, and innovative green construction technologies.',
    image: '/images/projects/project-2.jpg',
    stats: {
      value: '40%',
      label: 'Reduction in carbon footprint since 2020',
    },
  },
  {
    id: 'community',
    title: 'Community Impact',
    description:
      'Our projects are designed to strengthen the communities we serve. We create local jobs, support small businesses, and build infrastructure that improves quality of life for generations.',
    image: '/images/projects/project-3.jpg',
    stats: {
      value: '5,000+',
      label: 'Local jobs created annually',
    },
  },
  {
    id: 'innovation',
    title: 'Innovation & Technology',
    description:
      'We embrace cutting-edge construction technologies and methodologies to deliver projects more efficiently, with higher quality, and reduced environmental impact.',
    image: '/images/projects/project-1.jpg',
    stats: {
      value: '15+',
      label: 'New technologies implemented',
    },
  },
  {
    id: 'quality',
    title: 'Uncompromising Quality',
    description:
      'Every project we undertake reflects our commitment to excellence. We use the finest materials, employ skilled craftsmen, and maintain rigorous quality control standards.',
    image: '/images/projects/project-2.jpg',
    stats: {
      value: '30+',
      label: 'Years of building excellence',
    },
  },
  {
    id: 'integrity',
    title: 'Ethical Business Practices',
    description:
      'We conduct our business with the highest ethical standards, maintaining transparent relationships with clients, partners, and stakeholders.',
    image: '/images/projects/project-3.jpg',
  },
];
