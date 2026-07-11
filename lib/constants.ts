/**
 * SITE CONFIGURATION & CONSTANTS
 * 
 * This file contains all easily editable content and configuration
 * for the So Bella Hair & Beauty Lounge website.
 * 
 * Edit these values to customize text, services, and other content.
 */

// Brand Information
export const SITE_CONFIG = {
  name: 'So Bella Hair & Beauty Lounge',
  tagline: 'Personal luxury beauty by a solo stylist',
  description: 'Personal luxury beauty services from a dedicated solo stylist—tailored hair and beauty that makes you feel radiant.',
  email: 'contact.sobella@gmail.com',
  phone: '+44 7503 130010',
  address: 'Kawin Hair & Beauty Salon, 128 Longshaw Street, Warrington, WA5 0DG',
  businessHours: {
    monday: 'Closed',
    tuesday: '8:00 AM - 10:30 PM',
    wednesday: '8:00 AM - 10:30 PM',
    thursday: '8:00 AM - 10:30 PM',
    friday: '8:00 AM - 10:30 PM',
    saturday: '8:00 AM - 10:30 PM',
    sunday: 'By appointment',
  },
}

export const HERO_CONTENT = {
  tagline: '✨ Luxury beauty by a solo stylist',
  headline: 'Where every detail feels',
  headlineAccent: 'beautifully you.',
  subheadline:
    'Warm, professional beauty and hair services crafted by a dedicated solo stylist who gives every client undivided attention.',
  highlights: [
    {
      title: 'One-on-one care',
      description: 'Personal appointments for your unique glow.',
    },
    {
      title: 'Luxury results',
      description: 'Soft, luminous hair and beauty finishes.',
    },
    {
      title: 'Warm welcome',
      description: 'Every visit feels like a pampering retreat.',
    },
  ],
  primaryCta: 'Book Your Appointment',
  secondaryCta: 'WhatsApp Us',
  heroImageSrc: '',
  heroImageAlt: 'Luxury salon service in a warm salon atmosphere',
  // Owner / stylist portrait shown in the About section. Save the photo as
  // public/images/owner.jpg and it appears automatically.
  ownerImageSrc: '/images/owner.jpg',
  ownerImageAlt: 'So Bella — your solo stylist',
}

export const GALLERY_SETTINGS = {
  categories: ['All', 'Hair Extensions', 'Styling', 'Lashes', 'Brows', 'Beauty Treatments', 'Microblading', 'Nails', 'Waxing'],
  defaultImages: [
    {
      id: '1',
      category: 'Hair Extensions',
      title: 'Luxurious Extensions',
      src: '/images/gallery-1.jpg',
    },
    {
      id: '2',
      category: 'Styling',
      title: 'Red Carpet Glam',
      src: '/images/gallery-2.jpg',
    },
    {
      id: '3',
      category: 'Lashes',
      title: 'Volume Lashes',
      src: '/images/gallery-3.jpg',
    },
    {
      id: '4',
      category: 'Brows',
      title: 'Perfect Brows',
      src: '/images/gallery-4.jpg',
    },
    {
      id: '5',
      category: 'Hair Extensions',
      title: 'Blonde Perfection',
      src: '/images/gallery-5.jpg',
    },
    {
      id: '6',
      category: 'Beauty Treatments',
      title: 'Glowing Skin',
      src: '/images/gallery-6.jpg',
    },
    {
      id: '7',
      category: 'Styling',
      title: 'Bridal Look',
      src: '/images/gallery-7.jpg',
    },
    {
      id: '8',
      category: 'Microblading',
      title: 'Perfect Microblading',
      src: '/images/gallery-8.jpg',
    },
  ],
}

// Social Media Links
export const SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@so.bella.hair.bea',
  facebook: 'https://www.facebook.com/share/1F5JiMmEbE/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/so.bella.hair.beauty.lounge',
}

// Services Configuration
export const SERVICES = [
  {
    id: 1,
    title: 'Hair Extensions',
    description: 'Premium quality hair extensions with expert application. Seamless, natural-looking results that last.',
    icon: '💇‍♀️',
    details: [
      'Premium quality hair sourcing',
      'Expert application techniques',
      'Natural-looking results',
      'Long-lasting durability',
      'Custom styling included',
    ],
  },
  {
    id: 2,
    title: 'Beauty Treatments',
    description: 'Comprehensive beauty services including facials, skin treatments, and rejuvenation.',
    icon: '✨',
    details: [
      'Professional facials',
      'Skin treatments',
      'Anti-aging therapies',
      'Hydration treatments',
      'Customized skincare',
    ],
  },
  {
    id: 3,
    title: 'Lashes',
    description: 'Beautiful, natural-looking eyelash extensions that enhance your eyes.',
    icon: '👁️',
    details: [
      'Premium lash materials',
      'Natural application',
      'Volume options',
      'Customized length',
      'Professional care',
    ],
  },
  {
    id: 4,
    title: 'Brows',
    description: 'Expert eyebrow shaping, tinting, and lamination services.',
    icon: '💫',
    details: [
      'Professional shaping',
      'Tinting services',
      'Brow lamination',
      'Custom design',
      'Long-lasting results',
    ],
  },
  {
    id: 5,
    title: 'Microblading',
    description: 'Semi-permanent eyebrow tattoo for perfectly shaped, natural-looking brows.',
    icon: '🎯',
    details: [
      'Semi-permanent solution',
      'Natural hairlike strokes',
      'Custom color matching',
      'Expert technician',
      'Maintenance included',
    ],
  },
  {
    id: 6,
    title: 'Styling',
    description: 'Professional hair styling for any occasion. From casual to red-carpet glam.',
    icon: '💄',
    details: [
      'Expert styling',
      'Blow-outs',
      'Updo designs',
      'Special occasion styling',
      'Bridal packages',
    ],
  },
]

// Color Palette (matches Tailwind config)
export const COLORS = {
  primary: '#f5e6e0', // blush
  secondary: '#e8d4c4', // nude
  accent: '#ee9ec2', // gold
  dark: '#1a1a1a', // beauty-black
  light: '#faf9f7', // beauty-white
}

// Animation timings (in seconds)
export const ANIMATION_TIMINGS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
}

// Pricing (customize as needed)
export const PRICING = {
  hairExtensions: {
    min: 150,
    max: 400,
    description: 'Starting price - varies by hair length and volume',
  },
  beautyTreatments: {
    min: 75,
    max: 200,
    description: 'Facial and skin treatment packages',
  },
  lashes: {
    min: 120,
    max: 250,
    description: 'Natural to volume lash extensions',
  },
  brows: {
    min: 50,
    max: 150,
    description: 'Shaping, tinting, and lamination',
  },
  microblading: {
    min: 300,
    max: 500,
    description: 'Semi-permanent eyebrow tattooing',
  },
  styling: {
    min: 60,
    max: 200,
    description: 'Hair styling for all occasions',
  },
}

// Meta Tags for SEO
export const SEO = {
  title: 'So Bella Hair & Beauty Lounge - Luxury Beauty Salon',
  description: 'Experience luxury hair extensions, beauty treatments, and professional styling at So Bella Hair & Beauty Lounge.',
  keywords: [
    'hair extensions',
    'beauty salon',
    'lashes',
    'brows',
    'microblading',
    'luxury beauty',
    'hair treatment',
    'salon near me',
  ],
}

// Testimonials/Reviews (sample data for display)
export const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Client',
    rating: 5,
    text: 'So Bella completely transformed my look! The hair extensions are absolutely gorgeous and look so natural.',
    avatar: '👩‍🦰',
  },
  {
    id: 2,
    name: 'Emily Davis',
    role: 'Bride',
    rating: 5,
    text: 'The bridal styling was perfect! I felt beautiful and confident on my wedding day.',
    avatar: '👰',
  },
  {
    id: 3,
    name: 'Jessica Martinez',
    role: 'Client',
    rating: 5,
    text: 'My lash extensions are stunning! The attention to detail is incredible.',
    avatar: '👩‍🦱',
  },
]

// FAQ Items
export const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How long do hair extensions last?',
    answer: 'With proper care and regular maintenance, hair extensions typically last 3-6 months. Regular maintenance appointments every 4-6 weeks help extend their lifespan.',
  },
  {
    id: 2,
    question: 'Can I wash my hair extensions?',
    answer: 'Yes! Use lukewarm water and sulfate-free shampoo. Wait 48 hours after installation before the first wash.',
  },
  {
    id: 3,
    question: 'What if I\'m allergic to products?',
    answer: 'We require a patch test 48 hours before service for all new clients. We can use hypoallergenic alternatives when needed.',
  },
  {
    id: 4,
    question: 'Can I book same-day appointments?',
    answer: 'Same-day appointments are not available. We require 24-48 hours advance booking to ensure quality service.',
  },
  {
    id: 5,
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, credit/debit cards, bank transfers, and digital payment apps. A 50% deposit is required to confirm bookings.',
  },
]

// Booking Requirements
export const BOOKING_REQUIREMENTS = {
  minimumAdvanceNotice: 24, // hours
  depositPercentage: 50, // % of total
  cancellationNotice: 48, // hours
  depositValidity: 90, // days
}

// Feature Flags (for future functionality)
export const FEATURES = {
  enableOnlineBooking: true,
  enableContactForm: true,
  enableReviews: true,
  enableGallery: true,
  enableBlog: false,
  enableChat: false,
  enableSignUp: false,
}

// Email Configuration
export const EMAIL_CONFIG = {
  fromName: 'So Bella Hair & Beauty Lounge',
  fromEmail: 'noreply@sobella.com',
  replyTo: 'contact.sobella@gmail.com',
  supportEmail: 'contact.sobella@gmail.com',
}

// Supabase Configuration
export const SUPABASE_CONFIG = {
  tables: {
    contacts: 'contact_submissions',
    bookings: 'bookings',
    reviews: 'reviews',
    gallery: 'gallery_images',
  },
}
