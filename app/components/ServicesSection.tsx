'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useWhatsAppUrl } from './SiteContentProvider'

// Services data configuration - easy to edit
const servicesData = [
  {
    id: 1,
    title: 'Hair Extensions',
    description: 'Premium quality hair extensions with expert application. Seamless, natural-looking results that last.',
    icon: '💇‍♀️',
    details: [
      'Weft / Weave / Celebrity Weave — £290',
      'Tape Ins — £190 · Nano Rings — £250',
      'Keratin Fusion Bonds — £290 · Remove & Refit — £250',
      'Maintenance / Tighten — £130 · Nano Move Up — £150',
      'Brazilian Blow Dry — £150–£220 · Wash & Blow Dry — £30',
      'Hair not included — confirmed at consultation',
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
      'Classic Lashes — £50',
      'Russian Lashes — £55',
      'Hybrid Lashes — £60',
      'Lash Lift & Tint — £35',
    ],
  },
  {
    id: 4,
    title: 'Brows',
    description: 'Expert eyebrow shaping, tinting, and lamination services.',
    icon: '💫',
    details: [
      'Brow Lamination — £40',
      'Brow Wax & Tint — £20',
      'Professional shaping & custom design',
      'Beautiful brows every day',
    ],
  },
  {
    id: 5,
    title: 'Microblading',
    description: 'Semi-permanent eyebrow tattoo for perfectly shaped, natural-looking brows.',
    icon: '🎯',
    details: [
      'Microblading — £250',
      'Yearly Top Up — £150',
      'Natural hairlike strokes',
      'Custom colour matching',
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
  {
    id: 7,
    title: 'Nails',
    description: 'Beautiful, long-lasting nails — from natural gel finishes to full acrylic sets.',
    icon: '💅',
    details: [
      'Hard Gel — £35 · BIAB — £40',
      'Acrylic — £42 · Gel Nails — £25',
      'Infills — £32 · Gel Toes — £20',
      'Nails that complete every look',
    ],
  },
  {
    id: 8,
    title: 'Waxing',
    description: 'Smooth, confident, beautiful you — quick and gentle facial waxing.',
    icon: '🌸',
    details: [
      'Eyebrow Wax — £12',
      'Lip Wax — £8',
      'Chin Wax — £10',
      'Full Face Wax — £20–£25',
    ],
  },
]

export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null)
  const whatsappUrl = useWhatsAppUrl("Hi! I'd love to book an appointment.")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-beauty-white to-blush/10"
    >
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-0 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="section-label">What I Offer</span>
          <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl">
            Beauty, <span className="accent-italic">tailored to you</span>
          </h2>
          <p className="text-lg text-beauty-black/60 max-w-2xl mx-auto">
            Hair and beauty services crafted one-on-one, so every appointment feels personal — and you leave feeling your most radiant.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() =>
                setExpandedService(
                  expandedService === service.id ? null : service.id
                )
              }
            >
              <div className="relative h-full bg-white rounded-2xl overflow-hidden card-editorial hover:-translate-y-1 transition-luxury">
                {/* Gradient accent top */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose/0 via-rose to-rose/0" />

                {/* Content */}
                <div className="p-6 space-y-4 h-full flex flex-col">
                  {/* Icon */}
                  <div className="text-4xl">{service.icon}</div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-beauty-black group-hover:text-rose transition-luxury">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-beauty-black/60 text-sm flex-1 leading-relaxed">
                    {service.description}
                  </p>

                  {/* CTA and expand button */}
                  <div className="space-y-3 pt-4 border-t border-gold/10">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="block text-center w-full px-4 py-2.5 bg-charcoal text-beauty-white font-semibold text-xs uppercase tracking-[0.14em] rounded-full hover:bg-rose hover:text-charcoal transition-luxury"
                    >
                      Book Now
                    </a>

                    {/* Expandable Details */}
                    <motion.button
                      className="w-full px-4 py-2 border border-gold/20 text-beauty-black text-sm rounded-full hover:bg-blush/20 transition-luxury flex items-center justify-between"
                      onClick={(e) => {
                        e.stopPropagation()
                        setExpandedService(
                          expandedService === service.id ? null : service.id
                        )
                      }}
                    >
                      <span>Details</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedService === service.id ? 'rotate-180' : ''
                        }`}
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gold/10 px-6 py-4 bg-blush/5"
                  >
                    <ul className="space-y-2">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gold mt-1">✓</span>
                          <span className="text-sm text-beauty-black/70">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-beauty-black/60 mb-4">
            Looking for something specific? Message me and we&apos;ll create the perfect appointment for you.
          </p>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
