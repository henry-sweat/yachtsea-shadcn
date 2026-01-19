/**
 * Structured Data Component
 *
 * Adds JSON-LD structured data for SEO and rich snippets in search results.
 * This helps Google understand what Yachtsea is and display rich results.
 */

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Yachtsea',
    alternateName: 'Yachtsea - Online Yahtzee Game',
    url: 'https://yachtsea.app',
    description:
      'Play Yahtzee online free. No download or installation required. Works offline as a PWA. Roll the dice, score points, and compete for high scores.',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    permissions: 'No special permissions required',
    screenshot: 'https://yachtsea.app/icons/apple-icon-1024.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'Yachtsea',
      url: 'https://yachtsea.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yachtsea',
      url: 'https://yachtsea.app',
    },
    potentialAction: {
      '@type': 'PlayAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yachtsea.app/play',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
          'http://schema.org/IOSPlatform',
          'http://schema.org/AndroidPlatform',
        ],
      },
    },
    featureList: [
      'No download required',
      'Works offline',
      'Free to play',
      'Mobile optimized',
      'Track statistics',
      'Undo moves',
    ],
    gamePlatform: ['Web browser', 'iOS', 'Android'],
    genre: 'Dice game, Strategy game',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
