import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KD Lab',
  description: 'Created with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
