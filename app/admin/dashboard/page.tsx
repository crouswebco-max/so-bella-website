'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SITE_CONFIG, HERO_CONTENT, SOCIAL_LINKS, GALLERY_SETTINGS } from '../../../lib/constants'
import { supabase } from '../../../lib/supabase'
import { isAdminEmail } from '../../../lib/admin'
import { getSiteContent, upsertSiteContent, SiteContent } from '../../../lib/siteContent'
import type { Review } from '../../../lib/supabase'
import SoBellaLogo from '../../components/SoBellaLogo'

type GalleryItem = { id: string; title: string; category: string; image_url: string; display_order?: number }

export default function AdminDashboard() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [activeTab, setActiveTab] = useState<'business' | 'hero' | 'services' | 'social' | 'gallery' | 'reviews'>('business')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([])
  const [galleryCategory, setGalleryCategory] = useState('Hair Extensions')
  const [galleryTitle, setGalleryTitle] = useState('')
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [heroUploading, setHeroUploading] = useState(false)
  const [portraitUploading, setPortraitUploading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')

  // Set a new password for the signed-in account (works because a session exists).
  const handleSetPassword = async () => {
    setPasswordMessage('')
    if (!supabase) return
    if (newPassword.length < 8) {
      setPasswordMessage('Please use at least 8 characters.')
      return
    }
    setPasswordSaving(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPasswordSaving(false)
    if (error) {
      setPasswordMessage("Couldn't update the password. Please try again.")
    } else {
      setNewPassword('')
      setPasswordMessage('✅ Password updated! You can now sign in with it on any device.')
    }
  }

  const refreshGallery = async () => {
    const { getGalleryImages } = await import('../../../lib/supabase')
    const res = await getGalleryImages()
    if (res.success && res.data) setGalleryImages(res.data as GalleryItem[])
  }

  const refreshReviews = async () => {
    const { getAllReviews } = await import('../../../lib/supabase')
    const res = await getAllReviews()
    if (res.success && res.data) setReviews(res.data)
  }

  // Upload a photo and return its public URL (shared by hero/portrait pickers).
  const uploadPhoto = async (file: File, folder: string) => {
    const { uploadImage } = await import('../../../lib/supabase')
    const up = await uploadImage(file, folder)
    if (!up.success || !up.url) {
      alert("The photo couldn't be uploaded. Please check your internet and try again.")
      return null
    }
    return up.url
  }

  // Move a gallery photo one position left/right and persist the new order.
  const moveGalleryImage = async (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= galleryImages.length) return
    const { updateGalleryOrder } = await import('../../../lib/supabase')
    const a = galleryImages[index]
    const b = galleryImages[target]
    await Promise.all([
      updateGalleryOrder(a.id, target),
      updateGalleryOrder(b.id, index),
    ])
    await refreshGallery()
  }

  useEffect(() => {
    let mounted = true

    const init = async () => {
      if (!supabase) {
        router.push('/admin')
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin')
        return
      }

      // Enforce the admin allowlist even if a session exists.
      if (!isAdminEmail(session.user?.email)) {
        await supabase.auth.signOut()
        router.push('/admin')
        return
      }

      if (mounted) setAuthorized(true)

      // load site content from Supabase
      const res = await getSiteContent()
      if (res.success && res.data) {
        const content = res.data
        setFormData(prev => ({
          ...prev,
          businessName: content.businessName || prev.businessName,
          email: content.email || prev.email,
          phone: content.phone || prev.phone,
          address: content.address || prev.address,
          whatsapp: content.whatsapp || prev.whatsapp,
          mondayHours: content.businessHours?.monday || prev.mondayHours,
          tuesdayHours: content.businessHours?.tuesday || prev.tuesdayHours,
          wednesdayHours: content.businessHours?.wednesday || prev.wednesdayHours,
          thursdayHours: content.businessHours?.thursday || prev.thursdayHours,
          fridayHours: content.businessHours?.friday || prev.fridayHours,
          saturdayHours: content.businessHours?.saturday || prev.saturdayHours,
          sundayHours: content.businessHours?.sunday || prev.sundayHours,
          heroTagline: content.hero?.tagline || prev.heroTagline,
          heroHeadline: content.hero?.headline || prev.heroHeadline,
          heroPrimaryCta: content.hero?.primaryCta || prev.heroPrimaryCta,
          heroSecondaryCta: content.hero?.secondaryCta || prev.heroSecondaryCta,
          instagram: content.social?.instagram || prev.instagram,
          facebook: content.social?.facebook || prev.facebook,
          tiktok: content.social?.tiktok || prev.tiktok,
          heroImageUrl: content.heroImageUrl || prev.heroImageUrl,
          ownerImageUrl: content.ownerImageUrl || prev.ownerImageUrl,
        }))
      }

      // Load reviews so the owner can approve or remove them.
      const { getAllReviews } = await import('../../../lib/supabase')
      const rres = await getAllReviews()
      if (mounted && rres.success && rres.data) setReviews(rres.data)

      // Load existing gallery images so the owner can see/delete them.
      const { getGalleryImages } = await import('../../../lib/supabase')
      const gres = await getGalleryImages()
      if (mounted && gres.success && gres.data) {
        setGalleryImages(gres.data as Array<{ id: string; title: string; category: string; image_url: string }>)
      }

      setLoading(false)
    }

    init()

    return () => { mounted = false }
  }, [router])

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut()
    router.push('/admin')
  }

  const [formData, setFormData] = useState({
    businessName: SITE_CONFIG.name,
    email: SITE_CONFIG.email,
    phone: SITE_CONFIG.phone,
    address: SITE_CONFIG.address,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE_CONFIG.phone,
    mondayHours: SITE_CONFIG.businessHours.monday,
    tuesdayHours: SITE_CONFIG.businessHours.tuesday,
    wednesdayHours: SITE_CONFIG.businessHours.wednesday,
    thursdayHours: SITE_CONFIG.businessHours.thursday,
    fridayHours: SITE_CONFIG.businessHours.friday,
    saturdayHours: SITE_CONFIG.businessHours.saturday,
    sundayHours: SITE_CONFIG.businessHours.sunday,
    heroTagline: HERO_CONTENT.tagline,
    heroHeadline: HERO_CONTENT.headline,
    heroPrimaryCta: HERO_CONTENT.primaryCta,
    heroSecondaryCta: HERO_CONTENT.secondaryCta,
    instagram: SOCIAL_LINKS.instagram,
    facebook: SOCIAL_LINKS.facebook,
    tiktok: SOCIAL_LINKS.tiktok,
    heroImageUrl: '',
    ownerImageUrl: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaved(false)
    const payload: SiteContent = {
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      whatsapp: formData.whatsapp,
      businessHours: {
        monday: formData.mondayHours,
        tuesday: formData.tuesdayHours,
        wednesday: formData.wednesdayHours,
        thursday: formData.thursdayHours,
        friday: formData.fridayHours,
        saturday: formData.saturdayHours,
        sunday: formData.sundayHours,
      },
      hero: {
        tagline: formData.heroTagline,
        headline: formData.heroHeadline,
        primaryCta: formData.heroPrimaryCta,
        secondaryCta: formData.heroSecondaryCta,
      },
      social: {
        instagram: formData.instagram,
        facebook: formData.facebook,
        tiktok: formData.tiktok,
      },
      heroImageUrl: formData.heroImageUrl,
      ownerImageUrl: formData.ownerImageUrl,
    }

    setSaving(true)
    const res = await upsertSiteContent(payload)
    setSaving(false)
    if (res.success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 4000)
    } else {
      alert("Your changes couldn't be saved. Please check your internet and try again.")
    }
  }

  if (!authorized || loading) {
    return null
  }

  return (
    <div className="min-h-screen bg-blush/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blush via-cream to-blush border-b border-gold/20 px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SoBellaLogo size="sm" showTagline={false} />
          <span className="hidden sm:inline text-beauty-black/30">|</span>
          <span className="hidden sm:inline font-serif text-lg text-beauty-black/70">Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-semibold text-beauty-white bg-beauty-black rounded-full hover:opacity-85 transition-all"
          >
            👁 See my website
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-beauty-black bg-beauty-white/70 border border-gold/30 rounded-full hover:bg-beauty-white transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gold/10 px-4 sm:px-6 bg-beauty-white/70 backdrop-blur">
        <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
          {[
            { key: 'business', label: '🏢 My Details' },
            { key: 'hero', label: '✨ Homepage' },
            { key: 'gallery', label: '🖼️ My Photos' },
            { key: 'reviews', label: `💬 Reviews${reviews.filter(r => !r.verified).length ? ` (${reviews.filter(r => !r.verified).length} new)` : ''}` },
            { key: 'services', label: '💇 Services' },
            { key: 'social', label: '🔗 Socials' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-4 px-2 border-b-2 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.key
                  ? 'border-gold text-beauty-black'
                  : 'border-transparent text-beauty-black/60 hover:text-beauty-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="bg-beauty-white rounded-2xl border border-gold/15 shadow-sm p-5 sm:p-8">
        {/* Business Info */}
        {activeTab === 'business' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-beauty-black">Business Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">WhatsApp Number (for Book Now buttons)</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+44 7503 130010"
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
                <p className="text-xs text-beauty-black/50 mt-1">Include country code. This is where all &quot;Book Now&quot; buttons send clients.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div className="border-t border-gold/10 pt-4">
                <h3 className="font-semibold text-beauty-black mb-1">Sign-in password</h3>
                <p className="text-xs text-beauty-black/50 mb-2">
                  Set a password here to sign in with email + password on any device.
                  (You can always use the emailed sign-in link instead.)
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 8 characters)"
                    autoComplete="new-password"
                    className="px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold text-sm w-64"
                  />
                  <button
                    onClick={handleSetPassword}
                    disabled={passwordSaving}
                    className="px-4 py-2 text-sm font-semibold bg-beauty-black text-beauty-white rounded-lg hover:opacity-85 transition-all disabled:opacity-60"
                  >
                    {passwordSaving ? 'Saving…' : 'Set password'}
                  </button>
                </div>
                {passwordMessage && (
                  <p className="text-sm mt-2 text-beauty-black/70">{passwordMessage}</p>
                )}
              </div>

              <div className="border-t border-gold/10 pt-4">
                <h3 className="font-semibold text-beauty-black mb-2">Your photo</h3>
                <p className="text-xs text-beauty-black/50 mb-2">Shown in the &quot;About&quot; part of your website. A friendly portrait works best.</p>
                {formData.ownerImageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={formData.ownerImageUrl} alt="Your portrait" className="w-28 h-36 object-cover rounded-lg mb-2 border border-gold/10" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={portraitUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setPortraitUploading(true)
                    try {
                      const url = await uploadPhoto(file, 'site')
                      if (url) {
                        setFormData(prev => ({ ...prev, ownerImageUrl: url }))
                        setSaved(false)
                      }
                    } finally {
                      setPortraitUploading(false)
                      e.target.value = ''
                    }
                  }}
                  className="text-sm"
                />
                {portraitUploading && <p className="text-sm text-gold mt-2">Uploading…</p>}
              </div>

              <div className="border-t border-gold/10 pt-4">
                <h3 className="font-semibold text-beauty-black mb-1">Opening Hours</h3>
                <p className="text-xs text-beauty-black/50 mb-3">Type your hours for each day, or &quot;Closed&quot;. Example: 10:00 AM - 8:00 PM</p>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
                  <div key={day} className="mb-3">
                    <label className="block text-sm text-beauty-black/70 mb-1">{day}</label>
                    <input
                      type="text"
                      name={`${day.toLowerCase()}Hours`}
                      value={formData[`${day.toLowerCase()}Hours` as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder="e.g., 10:00 AM - 8:00 PM"
                      className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-beauty-black">Homepage</h2>
            <p className="text-beauty-black/60 text-sm">This is the first thing visitors see — the big banner at the top of your website.</p>

            <div className="space-y-4">
              <div className="bg-blush/15 border border-gold/10 rounded-2xl p-4">
                <label className="block text-sm font-semibold text-beauty-black mb-1">Banner photo</label>
                <p className="text-xs text-beauty-black/50 mb-2">The large photo at the top of your site. A bright, landscape photo of your work or your space looks best.</p>
                {formData.heroImageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={formData.heroImageUrl} alt="Current banner" className="w-full h-36 object-cover rounded-lg mb-2 border border-gold/10" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  disabled={heroUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setHeroUploading(true)
                    try {
                      const url = await uploadPhoto(file, 'site')
                      if (url) {
                        setFormData(prev => ({ ...prev, heroImageUrl: url }))
                        setSaved(false)
                      }
                    } finally {
                      setHeroUploading(false)
                      e.target.value = ''
                    }
                  }}
                  className="text-sm"
                />
                {heroUploading && <p className="text-sm text-gold mt-2">Uploading…</p>}
                {formData.heroImageUrl && !heroUploading && (
                  <p className="text-xs text-beauty-black/50 mt-2">Remember to press Save Changes below to make it live.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Tagline</label>
                <p className="text-xs text-beauty-black/50 mb-1">The small line above your main headline.</p>
                <input
                  type="text"
                  name="heroTagline"
                  value={formData.heroTagline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Main Headline</label>
                <textarea
                  name="heroHeadline"
                  value={formData.heroHeadline}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Primary Button Text</label>
                <input
                  type="text"
                  name="heroPrimaryCta"
                  value={formData.heroPrimaryCta}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Secondary Button Text</label>
                <input
                  type="text"
                  name="heroSecondaryCta"
                  value={formData.heroSecondaryCta}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Services */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-beauty-black">Services & Pricing</h2>
            <p className="text-beauty-black/60 text-sm">Your services and prices appear in the Services section of your website.</p>
            <div className="bg-blush/20 p-4 rounded-lg border border-gold/10">
              <p className="text-sm text-beauty-black/70">
                To add, remove, or change the price of a service, just message your developer and
                it&apos;ll be updated for you. Self-service editing for this section is planned for a
                future update.
              </p>
            </div>
          </div>
        )}

        {/* Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-beauty-black">Gallery</h2>
            <p className="text-beauty-black/60 text-sm">Add a photo and it appears on your website straight away. Pick a category, then choose a photo from your phone or computer.</p>

            <div className="space-y-4 bg-blush/15 border border-gold/10 rounded-2xl p-4">
              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Category</label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold text-sm bg-white"
                >
                  {GALLERY_SETTINGS.categories.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Title (optional)</label>
                <input
                  type="text"
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  placeholder="e.g. Balayage blonde"
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Choose photo</label>
                <input
                  type="file"
                  accept="image/*"
                  id="galleryUpload"
                  disabled={galleryUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setGalleryUploading(true)
                    try {
                      const { uploadImage, addGalleryImage } = await import('../../../lib/supabase')
                      const up = await uploadImage(file)
                      if (!up.success || !up.url) {
                        alert('Upload failed; please try again.')
                        return
                      }
                      const add = await addGalleryImage({
                        title: galleryTitle || galleryCategory,
                        category: galleryCategory,
                        image_url: up.url,
                        display_order: galleryImages.length,
                      })
                      if (!add.success) {
                        alert('Photo uploaded but could not be saved to the gallery.')
                        return
                      }
                      setGalleryTitle('')
                      await refreshGallery()
                      alert('Added to your gallery!')
                    } finally {
                      setGalleryUploading(false)
                      e.target.value = ''
                    }
                  }}
                  className="text-sm"
                />
                {galleryUploading && <p className="text-sm text-gold mt-2">Uploading…</p>}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-beauty-black mb-3">Your photos ({galleryImages.length})</h3>
              {galleryImages.length === 0 ? (
                <p className="text-beauty-black/50 text-sm">No photos yet. Add your first one above.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {galleryImages.map((img, i) => (
                    <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gold/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.image_url} alt={img.title} className="w-full h-32 object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-beauty-black/60 text-beauty-white text-xs px-2 py-1 flex items-center justify-between gap-1">
                        <span className="truncate">{img.title}</span>
                        <span className="flex gap-1 shrink-0">
                          <button
                            onClick={() => moveGalleryImage(i, -1)}
                            disabled={i === 0}
                            className="bg-beauty-white/20 hover:bg-beauty-white/40 disabled:opacity-30 rounded px-1.5"
                            aria-label="Move earlier"
                            title="Move earlier"
                          >
                            ←
                          </button>
                          <button
                            onClick={() => moveGalleryImage(i, 1)}
                            disabled={i === galleryImages.length - 1}
                            className="bg-beauty-white/20 hover:bg-beauty-white/40 disabled:opacity-30 rounded px-1.5"
                            aria-label="Move later"
                            title="Move later"
                          >
                            →
                          </button>
                        </span>
                      </div>
                      <button
                        onClick={async () => {
                          if (!confirm('Remove this photo?')) return
                          const { deleteGalleryImage } = await import('../../../lib/supabase')
                          const res = await deleteGalleryImage(img.id)
                          if (res.success) await refreshGallery()
                          else alert('Could not delete; please try again.')
                        }}
                        className="absolute top-1 right-1 bg-beauty-white/90 text-red-600 rounded-full w-6 h-6 text-sm font-bold shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Delete photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-beauty-black">Client Reviews</h2>
            <p className="text-beauty-black/60 text-sm">
              When a client leaves a review on your website, it appears here first.
              Nothing shows on your site until you press <b>Approve</b>.
            </p>

            {/* Waiting for approval */}
            <div>
              <h3 className="font-semibold text-beauty-black mb-3">
                Waiting for your approval ({reviews.filter(r => !r.verified).length})
              </h3>
              {reviews.filter(r => !r.verified).length === 0 ? (
                <p className="text-beauty-black/50 text-sm">Nothing waiting — you&apos;re all caught up!</p>
              ) : (
                <div className="space-y-3">
                  {reviews.filter(r => !r.verified).map((r) => (
                    <div key={r.id} className="bg-blush/15 border border-gold/15 rounded-2xl p-4">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <p className="font-semibold text-beauty-black">{r.client_name}</p>
                          <p className="text-xs text-beauty-black/50">{r.service_type} · {'★'.repeat(r.rating)}{'☆'.repeat(Math.max(0, 5 - r.rating))}</p>
                        </div>
                        <p className="text-xs text-beauty-black/40 whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</p>
                      </div>
                      <p className="text-sm text-beauty-black/80 mt-2">{r.review_text}</p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={async () => {
                            const { approveReview } = await import('../../../lib/supabase')
                            const res = await approveReview(r.id)
                            if (res.success) await refreshReviews()
                            else alert("Couldn't approve; please try again.")
                          }}
                          className="px-4 py-1.5 text-sm font-semibold bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm('Remove this review for good?')) return
                            const { deleteReview } = await import('../../../lib/supabase')
                            const res = await deleteReview(r.id)
                            if (res.success) await refreshReviews()
                            else alert("Couldn't remove; please try again.")
                          }}
                          className="px-4 py-1.5 text-sm font-semibold text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live on the site */}
            <div>
              <h3 className="font-semibold text-beauty-black mb-3">
                Live on your website ({reviews.filter(r => r.verified).length})
              </h3>
              {reviews.filter(r => r.verified).length === 0 ? (
                <p className="text-beauty-black/50 text-sm">No reviews on your site yet. Approved reviews appear here.</p>
              ) : (
                <div className="space-y-3">
                  {reviews.filter(r => r.verified).map((r) => (
                    <div key={r.id} className="border border-gold/10 rounded-2xl p-4">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <p className="font-semibold text-beauty-black">{r.client_name}</p>
                          <p className="text-xs text-beauty-black/50">{r.service_type} · {'★'.repeat(r.rating)}{'☆'.repeat(Math.max(0, 5 - r.rating))}</p>
                        </div>
                        <button
                          onClick={async () => {
                            if (!confirm('Take this review off your website and delete it?')) return
                            const { deleteReview } = await import('../../../lib/supabase')
                            const res = await deleteReview(r.id)
                            if (res.success) await refreshReviews()
                            else alert("Couldn't remove; please try again.")
                          }}
                          className="text-xs text-red-500 hover:text-red-700 whitespace-nowrap"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-beauty-black/80 mt-2">{r.review_text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Social Links */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-beauty-black">Social Media Links</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-beauty-black mb-1">TikTok</label>
                <input
                  type="url"
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gold/20 rounded-lg focus:outline-none focus:border-gold text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button — not needed on Gallery/Reviews, those save instantly */}
        {activeTab !== 'gallery' && activeTab !== 'reviews' && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-gradient-luxury text-beauty-black font-bold text-base rounded-lg hover:shadow-luxury transition-all disabled:opacity-60"
            >
              {saving ? 'Saving…' : '💾 Save Changes'}
            </button>

            {saved && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg font-semibold">
                ✅ Saved! Your website is updated.
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-blush/10 rounded-lg border border-gold/10">
          <p className="text-xs text-beauty-black/60">
            {activeTab === 'gallery' || activeTab === 'reviews'
              ? '💡 Photos and reviews update your website straight away — no Save button needed here.'
              : '💡 After making changes, press Save Changes and they appear on your website within a few seconds. Press "See my website" at the top to check.'}
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}
