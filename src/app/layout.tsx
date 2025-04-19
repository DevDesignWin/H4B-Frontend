import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FakeNewsDetector AI | Detect Fake News in WhatsApp & Discord',
  description: 'AI-powered chatbot that detects fake news using Gemini API. Available on WhatsApp and Discord.',
  keywords: 'fake news detector, AI chatbot, WhatsApp bot, Discord bot, misinformation detection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-indigo-50 to-blue-50`}>
        {children}
      </body>
    </html>
  )
}