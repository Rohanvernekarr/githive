// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import AuthProvider from './components/AuthProvider'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GitHive - GitHub Project Discovery',
  description: 'Discover amazing GitHub projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
        
      </body>
    </html>
  )
}