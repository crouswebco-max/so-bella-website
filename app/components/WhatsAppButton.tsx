'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useWhatsAppUrl } from './SiteContentProvider'

export default function WhatsAppButton() {
  const whatsappUrl = useWhatsAppUrl("Hi! I'd love to book an appointment.")
  const pathname = usePathname()

  // Keep the booking bubble off the admin area.
  if (pathname?.startsWith('/admin')) return null

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 bg-green-500 text-white rounded-full shadow-luxury-lg hover:shadow-2xl transition-luxury"
      whileHover={{
        scale: 1.1,
        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
      title="Chat on WhatsApp"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
      </motion.div>

      {/* Pulse animation circle */}
      <motion.div
        className="absolute inset-0 bg-green-500 rounded-full -z-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: 0.3 }}
      />
    </motion.a>
  )
}
