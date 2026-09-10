'use client';

import { useState } from 'react';
import { FacebookIcon, LinkedInIcon, TwitterIcon } from '@/components/ui/Icons';

interface ArticleShareBarProps {
  url: string;
  title: string;
}

export function ArticleShareBar({ url, title }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: TwitterIcon,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedInIcon,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
    },
  ];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore.
    }
  }

  return (
    <div
      className="flex items-center gap-5"
      style={{ borderTop: '1px solid rgba(23,23,27,0.08)', paddingTop: '1.5rem' }}
    >
      <span
        style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--color-primary)',
          opacity: 0.45,
        }}
      >
        Share
      </span>

      <div className="flex items-center gap-4">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="share-bar-link"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy link"
          className="share-bar-link"
          style={{ fontSize: '0.75rem', fontWeight: 500 }}
        >
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
