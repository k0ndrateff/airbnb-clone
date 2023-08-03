import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";

const font = Nunito({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'AirPnP - живи свободно!',
  description: 'AirPnP - сайт по поиску съёмного жилья на любой срок.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ru">
        <body className={font.className}>
            <ClientOnly>
                <Navbar />
            </ClientOnly>
            {children}
        </body>
      </html>
  )
}
