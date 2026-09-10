import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimationProvider } from "@/providers/AnimationProvider";
import { getSiteSettings, getMainNavigation, getFooterNavigation } from "@/data/adapters/content.adapter";
import { JsonLd } from "@/components/ui/JsonLd";

const siteSettings = getSiteSettings();

export const metadata: Metadata = {
  metadataBase: new URL('https://knsewa.com'),
  title: {
    default: `${siteSettings.name} | Premium Construction Contractor in Nepal`,
    template: `%s | ${siteSettings.name}`,
  },
  description: "Leading construction contractor in Biratnagar, Nepal with 30 years of experience in commercial and government construction projects.",
  keywords: [
    "Khushbu Nirman Sewa",
    "Khushbu Nirman Sewa Pvt Ltd",
    "khushbu nirman",
    "nirman sewa",
    "KNS construction",
    // common misspellings / phonetic variants
    "Khusbhu Nirman Sewa",
    "Kushbu Nirman Sewa",
    "Khusbu Nirman Sewa",
    "Khushbu Nirman Seva",
    "Khushbu Nirman Sewa Biratnagar",
    // Nepali
    "खुशबु निर्माण सेवा",
    "खुशबू निर्माण सेवा",
    "निर्माण सेवा बिराटनगर",
    // location + category
    "construction company biratnagar nepal",
    "construction company nepal",
    "biratnagar contractor",
    "contractor biratnagar nepal",
    "commercial construction nepal",
    "government construction biratnagar",
    "nirman contractor nepal",
    "khushbu construction biratnagar",
  ],
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: siteSettings.name,
    images: [{ url: '/images/hero-construction.jpg', width: 1200, height: 630, alt: 'Khushbu Nirman Sewa — Construction Contractor in Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/images/hero-construction.jpg', width: 1200, height: 630 }],
  },
  verification: {
    google: "wBuf-0NklWTm-9oAQChzbiIURmoowVx6vYgh7n8HwK4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainNav = getMainNavigation();
  const footerNav = getFooterNavigation();

  const orgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": "https://knsewa.com/#organization",
        "name": siteSettings.name,
        "alternateName": [
          "Khushbu Nirman",
          "Khushbu Nirman Sewa Pvt. Ltd.",
          "Nirman Sewa",
          "KNS",
          "खुशबु निर्माण सेवा",
          "खुशबू निर्माण सेवा",
          "Khusbhu Nirman Sewa",
          "Kushbu Nirman Sewa",
          "Khushbu Nirman Seva",
        ],
        "description": "Khushbu Nirman Sewa is a leading construction contractor in Biratnagar, Nepal with 30 years of experience in commercial, industrial, and government construction projects across Nepal.",
        "url": "https://knsewa.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://knsewa.com/images/khushbu-logo-footer.png",
          "width": 400,
          "height": 120,
        },
        "image": "https://knsewa.com/images/hero-construction.jpg",
        "telephone": siteSettings.phone,
        "email": siteSettings.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": siteSettings.address.street,
          "addressLocality": siteSettings.address.city,
          "addressRegion": "Morang",
          "addressCountry": "NP",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "26.4525",
          "longitude": "87.2718",
        },
        "sameAs": [
          siteSettings.social.facebook,
          "https://knsewa.com",
        ],
        "slogan": siteSettings.tagline,
        "foundingDate": "1995",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": "50" },
        "areaServed": { "@type": "Country", "name": "Nepal" },
        "hasMap": "https://maps.google.com/?q=Khushbu+Nirman+Sewa+Biratnagar+Nepal",
        "priceRange": "$$",
      },
      {
        "@type": "WebSite",
        "@id": "https://knsewa.com/#website",
        "url": "https://knsewa.com",
        "name": siteSettings.name,
        "publisher": { "@id": "https://knsewa.com/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://knsewa.com/projects/?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <JsonLd schema={orgSchema} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-X9CEJ1MHMX" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X9CEJ1MHMX');
        `}} />
      </head>
      <body>
        <AnimationProvider>
          <Header settings={siteSettings} navigation={mainNav} />
          <main>{children}</main>
          <Footer settings={siteSettings} navigation={footerNav} />
        </AnimationProvider>
      </body>
    </html>
  );
}
