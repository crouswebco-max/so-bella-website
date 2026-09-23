'use client'

import { ArrowUpRight, ChevronDown, Instagram, Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

const services = [
  { name: 'Foot massage', note: 'A grounding pause for tired feet', price: 'price to confirm' },
  { name: 'Nails', note: 'Neat, polished and made to last', price: 'price to confirm' },
  { name: 'Cluster lashes', note: 'Soft, fluttery definition for your eyes', price: 'price to confirm' },
  { name: 'Pedicure', note: 'A fresh, cared-for finish from heel to toe', price: 'price to confirm' },
  { name: 'Full body massage', note: 'Slow, calming care from head to toe', price: 'price to confirm' },
  { name: 'Neck & shoulders', note: 'Release, reset and breathe more deeply', price: 'price to confirm' },
]

const faqs = [
  ['What treatments do you offer?', 'The studio currently offers foot massage, nails, cluster lashes, pedicures, full body massage, and neck-and-shoulder massage.'],
  ['How do I book?', 'Booking details are being finalised for this concept demo. Use the contact details shared by the studio when they are ready, or ask us to add WhatsApp or an online booking link.'],
  ['What should I bring?', 'Just yourself and a little time. We will add any treatment preparation and aftercare guidance here once the studio has confirmed its policies.'],
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const bookingLink = '#visit'

  return (
    <main>
      <header className="nav-shell">
        <a href="#top" className="wordmark" aria-label="The Coastal Serenity Studio home">
          <span className="logo-shell" aria-hidden="true"><span className="logo-sun" /><span className="logo-tide logo-tide-one" /><span className="logo-tide logo-tide-two" /></span>
          <span className="wordmark-script">coastal</span>
          <span className="wordmark-main">SERENITY <i>STUDIO</i></span>
        </a>
        <nav className={menuOpen ? 'nav-links nav-links-open' : 'nav-links'}>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Treatments</a>
          <a href="#care" onClick={() => setMenuOpen(false)}>Aftercare</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>Find us</a>
          <a className="nav-book" href={bookingLink}>Book a moment <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="demo-badge">Concept demo · branding in progress</div>
          <p className="eyebrow"><span className="tide-dot" /> Richards Bay · by appointment</p>
          <h1>Beauty that<br /><em>breathes.</em></h1>
          <p className="hero-intro">A little space to slow down, feel looked after, and leave more like yourself. Run by mum and daughter, made for real life.</p>
          <div className="hero-actions">
            <a className="button button-dark" href={bookingLink}>Start your appointment <ArrowUpRight size={16} /></a>
            <a className="text-link" href="#services">Explore treatments <span>↓</span></a>
          </div>
          <div className="hero-note"><Sparkles size={15} /> Massage · nails · lashes · pedicures</div>
        </div>
        <div className="hero-art" aria-label="Temporary studio image placeholder">
          <div className="sun-disc" />
          <div className="portrait-frame placeholder-portrait">
            <div className="placeholder-watermark">your<br /><em>studio image</em><small>placeholder</small></div>
          </div>
          <div className="hero-caption"><span>01</span><p>Soft rituals<br /><i>for your everyday</i></p></div>
          <div className="wave-line" />
        </div>
      </section>

      <section className="ticker" aria-label="Studio promise">
        <div>Personal care <span>✳</span> considered beauty <span>✳</span> two generations <span>✳</span> one calm space <span>✳</span></div>
      </section>

      <section className="story section-grid" id="story">
        <div className="section-stamp">The<br /><b>why</b></div>
        <div className="story-copy">
          <p className="eyebrow">A family studio</p>
          <h2>Come as you are.<br /><em>Leave lighter.</em></h2>
          <p>We are mum and daughter, and we built The Coastal Serenity Studio around the kind of appointment we would want for ourselves: unhurried, honest and personal.</p>
          <p>No conveyor belt of clients. No pressure to be someone else. Just thoughtful treatments, good conversation when you want it, and a little more confidence when you leave.</p>
          <a className="text-link" href={bookingLink}>Ask about an appointment <ArrowUpRight size={15} /></a>
        </div>
        <div className="story-card"><span className="quote-mark">“</span><p>There is beauty in the pause between before and after.</p><span className="signature">with love, mum &amp; daughter</span></div>
      </section>

      <section className="services-section" id="services">
        <div className="services-header"><div><p className="eyebrow">The treatment menu</p><h2>Small rituals.<br /><em>Beautiful results.</em></h2></div><p className="services-intro">A calm menu of touch, care and beauty treatments for your hands, feet, lashes and body. Prices will be added once confirmed.</p></div>
        <div className="service-list">
          {services.map((service, index) => <a className="service-row" href={bookingLink} key={service.name}><span className="service-number">0{index + 1}</span><span className="service-name">{service.name}</span><span className="service-note">{service.note}</span><span className="service-price">{service.price}</span><ArrowUpRight className="service-arrow" size={18} /></a>)}
        </div>
        <a className="button button-outline" href={bookingLink}>Ask about your treatment <ArrowUpRight size={16} /></a>
      </section>

      <section className="care section-grid" id="care">
        <div className="care-image"><div className="care-image-inner"><span>aftercare / 01</span><b>Keep the<br /><em>feeling.</em></b></div></div>
        <div className="care-copy"><p className="eyebrow">A little aftercare</p><h2>Your glow<br /><em>comes home.</em></h2><p>The appointment is only the beginning. We will send you away with simple, practical advice to help your skin, nails, lashes and muscles feel cared for.</p><div className="care-points"><div><b>Massage</b><span>Drink water, take it slowly and give your body time to enjoy the reset.</span></div><div><b>Nails, lashes &amp; feet</b><span>We will add your bespoke aftercare guidance here before launch.</span></div></div><a className="text-link" href={bookingLink}>Ask about your treatment <ArrowUpRight size={15} /></a></div>
      </section>

      <section className="faq-section">
        <div><p className="eyebrow">Before you arrive</p><h2>Good to<br /><em>know.</em></h2></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <div className={openFaq === index ? 'faq-item faq-open' : 'faq-item'} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div>
      </section>

      <section className="visit" id="visit">
        <div className="visit-content"><p className="eyebrow eyebrow-light">Come and find us</p><h2>Your next<br /><em>soft landing.</em></h2><p>Richards Bay · opening hours and exact address coming soon</p><div className="visit-actions"><a className="button button-light" href={bookingLink}>Booking link coming soon <ArrowUpRight size={16} /></a><a className="social-link" href="#visit"><Instagram size={16} /> Socials coming soon</a></div></div>
        <div className="visit-mark"><span>CS</span><small>beauty · softly done</small></div>
      </section>

      <footer><div className="footer-brand"><span className="logo-shell" aria-hidden="true"><span className="logo-sun" /><span className="logo-tide logo-tide-one" /><span className="logo-tide logo-tide-two" /></span><span className="wordmark-script">coastal</span><span className="wordmark-main">SERENITY <i>STUDIO</i></span></div><p>© 2026 The Coastal Serenity Studio · Richards Bay</p><span>Contact details coming soon</span></footer>
    </main>
  )
}
