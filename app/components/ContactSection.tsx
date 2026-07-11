'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { submitContactForm } from '../../lib/supabase'
import { useSiteContent } from './SiteContentProvider'

export default function ContactSection() {
  const SITE_CONFIG = useSiteContent()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await submitContactForm(formData)
      if (!response.success) {
        throw new Error('Unable to send your message. Please try again.')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage('Something went wrong. Please try again or message us on WhatsApp.')
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: SITE_CONFIG.phone,
      href: `tel:${SITE_CONFIG.phone.replace(/[^0-9+]/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: SITE_CONFIG.address,
      href: '#',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Tue – Sat: 8am – 10:30pm',
      href: '#',
    },
  ]

  const services = [
    'Hair Extensions',
    'Beauty Treatments',
    'Lashes',
    'Brows',
    'Microblading',
    'Styling',
    'Nails',
    'Waxing',
  ]

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-blush/10 to-beauty-white"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
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
          <span className="section-label">Reach Out Directly</span>
          <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl">
            Send a <span className="accent-italic">personal note</span> to the stylist
          </h2>
          <p className="text-lg text-beauty-black/60 max-w-2xl mx-auto">
            Share your vision, ask questions, or request the perfect appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-2xl border border-rose/12 hover:border-rose/40 hover:shadow-luxury transition-luxury group"
                  >
                    <div className="p-3 bg-rose-soft rounded-xl group-hover:bg-rose transition-colors">
                      <Icon className="w-6 h-6 text-rose group-hover:text-charcoal transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-beauty-black/50">{info.label}</p>
                      <p className="font-semibold text-beauty-black group-hover:text-rose transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Location map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="w-full h-80 rounded-2xl shadow-luxury overflow-hidden relative border border-gold/15"
            >
              <iframe
                title={`Map of ${SITE_CONFIG.address}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.address || 'Warrington, UK')}&output=embed`}
                className="w-full h-full"
                style={{ border: 0, filter: 'saturate(0.85) contrast(1.02)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-beauty-white p-8 md:p-10 rounded-2xl shadow-luxury border border-gold/10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 py-8"
              >
                <div className="text-6xl">✨</div>
                <h3 className="text-2xl font-semibold text-beauty-black">
                  Thank You!
                </h3>
                <p className="text-beauty-black/60">
                  Your request is on its way. You will hear back soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="rounded-2xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-blush/10 border border-gold/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-blush/10 border border-gold/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-blush/10 border border-gold/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                    placeholder="07XXX XXXXXX"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">
                    Interested Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-blush/10 border border-gold/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-blush/10 border border-gold/20 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell us about your beauty goals..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-dark w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </motion.button>

                <p className="text-center text-sm text-beauty-black/60">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
