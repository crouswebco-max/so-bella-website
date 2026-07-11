'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWhatsAppUrl } from './SiteContentProvider'
import SoBellaLogo from './SoBellaLogo'

// Navigation links configuration.
// Section links use "/#..." so they also work from subpages (Terms, Privacy, Aftercare).
const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Aftercare', href: '/aftercare' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const whatsappUrl = useWhatsAppUrl("Hi! I'd love to book an appointment.")
  const pathname = usePathname()

  // The admin area has its own header — keep the public navbar off it.
  if (pathname?.startsWith('/admin')) return null

  const toggleMenu = () => setIsOpen(!isOpen)

  // Animation variants
  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <nav className="sticky top-0 z-50 bg-beauty-white/85 backdrop-blur-lg border-b border-rose/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <SoBellaLogo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-beauty-black/80 hover:text-rose transition-luxury"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button & Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Book Now Button - Desktop */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-dark !px-6 !py-2.5"
            >
              Book on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-beauty-black hover:text-gold transition-luxury"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            className="lg:hidden pb-4 space-y-2 border-t border-gold/10"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={itemVariants}
                initial="closed"
                animate="open"
                transition={{ delay: index * 0.05 }}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-beauty-black/80 hover:text-rose hover:bg-rose-soft/40 transition-luxury rounded-md"
              >
                {link.label}
              </motion.a>
            ))}

            {/* Mobile CTA */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              initial="closed"
              animate="open"
              transition={{ delay: navLinks.length * 0.05 }}
              onClick={() => setIsOpen(false)}
              className="btn-dark w-full mt-4"
            >
              Book on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
