import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Coastal Serenity Studio | Beauty, softly done',
  description: 'A calm, personal beauty and massage studio run by two generations of family in Richards Bay.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
