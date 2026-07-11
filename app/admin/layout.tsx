import type { Metadata, Viewport } from 'next'

// Makes the admin panel installable as a home-screen app on her phone.
export const metadata: Metadata = {
  title: 'So Bella Admin',
  manifest: '/admin-manifest.json',
  appleWebApp: {
    capable: true,
    title: 'So Bella Admin',
    statusBarStyle: 'default',
  },
  icons: {
    apple: '/icons/admin-icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#fbe5ef',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-beauty-white">
      {children}
    </div>
  )
}
