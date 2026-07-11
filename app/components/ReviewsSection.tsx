'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { addReview, getReviews } from '../../lib/supabase'

type ReviewItem = {
  id: string
  client_name: string
  rating: number
  review_text: string
  service_type: string
  created_at: string
}

const serviceOptions = [
  'Hair Extensions',
  'Beauty Treatments',
  'Lashes',
  'Brows',
  'Microblading',
  'Styling',
  'Nails',
]

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    service_type: '',
    rating: 5,
    review_text: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    async function loadReviews() {
      setLoading(true)
      const response = await getReviews(10)
      if (response.success && response.data) {
        setReviews(response.data as ReviewItem[])
      }
      setLoading(false)
    }

    loadReviews()
  }, [])

  useEffect(() => {
    if (!autoplay || reviews.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay, reviews.length])

  const visibleReviews = () => {
    if (reviews.length === 0) return []
    const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 1
    return Array.from({ length: Math.min(visibleCount, reviews.length) }, (_, i) =>
      reviews[(currentIndex + i) % reviews.length]
    )
  }

  const goToPrevious = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }))
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    const { client_name, email, service_type, rating, review_text } = formData
    if (!client_name || !email || !review_text) {
      setSubmitError('Please fill all required fields.')
      return
    }

    const response = await addReview({
      client_name,
      rating,
      review_text,
      service_type,
    })

    if (!response.success) {
      setSubmitError('Unable to submit your review right now. Please try again later.')
      return
    }

    setSubmitted(true)
    setFormData({ client_name: '', email: '', service_type: '', rating: 5, review_text: '' })
    setTimeout(() => setSubmitted(false), 6000)
  }

  return (
    <section
      id="reviews"
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-beauty-white to-blush/10"
    >
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="section-label">Real reviews from real clients</span>
          <h2 className="display-serif text-4xl md:text-5xl lg:text-6xl">
            Client <span className="accent-italic">Love</span>
          </h2>
          <p className="text-lg text-beauty-black/60 max-w-2xl mx-auto">
            Only published feedback from actual clients after approval. No placeholders, no fake reviews.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] items-start">
          <div>
            {loading ? (
              <div className="rounded-3xl p-12 text-center bg-beauty-white border border-gold/10 shadow-luxury">
                <p className="text-beauty-black/60">Loading client reviews…</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-3xl p-12 text-center bg-beauty-white border border-gold/10 shadow-luxury">
                <p className="text-xl font-semibold text-beauty-black mb-3">No reviews yet</p>
                <p className="text-beauty-black/70">
                  Be the first client to share your experience. Reviews appear here once they are approved.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
                {visibleReviews().map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-editorial p-8"
                  >
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-rose text-rose" />
                      ))}
                    </div>
                    <p className="text-beauty-black/80 leading-relaxed text-lg italic mb-8">
                      “{review.review_text}”
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gold/10">
                      <div>
                        <p className="font-semibold text-beauty-black">{review.client_name}</p>
                        <p className="text-sm text-beauty-black/60">{review.service_type || 'Client'}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.14em] text-rose font-semibold">Published review</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {reviews.length > 1 && (
              <div className="flex items-center justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToPrevious}
                  className="p-3 bg-charcoal rounded-full hover:bg-rose transition-luxury"
                >
                  <ChevronLeft className="w-6 h-6 text-beauty-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToNext}
                  className="p-3 bg-charcoal rounded-full hover:bg-rose transition-luxury"
                >
                  <ChevronRight className="w-6 h-6 text-beauty-white" />
                </motion.button>
              </div>
            )}
          </div>

          <div className="card-editorial p-8">
            <h3 className="display-serif text-2xl md:text-3xl mb-4">Share your experience</h3>
            <p className="text-beauty-black/70 mb-6">
              Real reviews from real clients. Submit your review and it will be published after approval.
            </p>
            {submitted ? (
              <div className="rounded-3xl border border-gold/20 bg-gold/10 p-6 text-beauty-black">
                <p className="font-semibold mb-2">Thank you!</p>
                <p>Your review has been received and will appear once approved.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {submitError && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl p-3">
                    {submitError}
                  </p>
                )}
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">Name</label>
                  <input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gold/20 bg-blush/10 px-4 py-3 focus:border-gold focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gold/20 bg-blush/10 px-4 py-3 focus:border-gold focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">Service</label>
                  <select
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gold/20 bg-blush/10 px-4 py-3 focus:border-gold focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gold/20 bg-blush/10 px-4 py-3 focus:border-gold focus:outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>
                        {value} star{value > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-beauty-black mb-2">Review</label>
                  <textarea
                    name="review_text"
                    value={formData.review_text}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-2xl border border-gold/20 bg-blush/10 px-4 py-3 focus:border-gold focus:outline-none"
                    placeholder="Tell us what you loved about your visit."
                  />
                </div>
                <button
                  type="submit"
                  className="btn-dark w-full"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
