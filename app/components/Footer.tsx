'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FaTiktok, FaFacebook, FaInstagram } from 'react-icons/fa'
import { useSiteContent, useWhatsAppUrl } from './SiteContentProvider'
import SoBellaLogo from './SoBellaLogo'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const content = useSiteContent()
  const pathname = usePathname()

  // Keep the public footer off the admin area.
  if (pathname?.startsWith('/admin')) return null
  const whatsappUrl = useWhatsAppUrl("Hi! I'd love to book an appointment.")

  const socialLinks = [
    { name: 'TikTok', url: content.social.tiktok, icon: FaTiktok },
    { name: 'Facebook', url: content.social.facebook, icon: FaFacebook },
    { name: 'Instagram', url: content.social.instagram, icon: FaInstagram },
  ]

  return (
    <footer className="bg-charcoal text-beauty-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex md:block justify-center md:justify-start">
              <SoBellaLogo size="md" variant="dark" />
            </div>
            <p className="text-beauty-white/60 text-sm leading-relaxed">
              Professional beauty services delivering luxury, elegance, and exceptional results.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-light">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/#home' },
                { label: 'Services', href: '/#services' },
                { label: 'Gallery', href: '/#gallery' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-beauty-white/70 hover:text-rose transition-luxury text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-light">Information</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/#about' },
                { label: 'Aftercare', href: '/aftercare' },
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-beauty-white/70 hover:text-rose transition-luxury text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-light">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: '#ee9ec2' }}
                    whileTap={{ scale: 0.9 }}
                    className="text-beauty-white/70 hover:text-rose transition-luxury text-xl"
                    title={social.name}
                  >
                    <Icon />
                  </motion.a>
                )
              })}
            </div>
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full mt-5 px-4 py-2.5 bg-rose text-charcoal font-semibold rounded-full text-xs uppercase tracking-[0.14em] hover:bg-rose-light transition-luxury"
            >
              Book Appointment
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-beauty-white/60 text-sm">
              © {currentYear} So Bella Hair & Beauty Lounge. All rights reserved.
            </p>
            <p className="text-beauty-white/50 text-sm">
              Website by{' '}
              <span className="text-rose-light font-semibold tracking-wide">Crous WebCo</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
