import { Jost, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '../components/Header'
import LayoutWrapper from '../components/LayoutWrapper'
import { LoaderProvider } from '../lib/LoaderContext'
import PageLoader from './PageLoader'
import { Sound } from '../components/Sound'
import { brand } from '../lib/brand'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: `${brand.name} — ${brand.descriptor}`,
  description: brand.description,
  icons: {
    icon: [{ url: '/fav.svg', type: 'image/svg+xml' }],
    apple: '/fav.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jost.variable} ${playfairDisplay.variable}`}
    >
      <body className="font-sans bg-ink text-ivory">
        <Header />


        {/* Wrapper determines when to show footer */}
        <div className="flex flex-col min-h-screen">
          <LayoutWrapper>
            <Sound />
            {/* <LoaderProvider> */}
            {/* <PageLoader> */}
            {children}
            {/* </PageLoader> */}
            {/* </LoaderProvider> */}
          </LayoutWrapper>
        </div>

        <Analytics />
      </body>
    </html>
  )
}
