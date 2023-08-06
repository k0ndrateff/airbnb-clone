import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

const font = Nunito({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'AirPnP - живи свободно!',
  description: 'AirPnP - сайт по поиску съёмного жилья на любой срок.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="ru">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <LoginModal />
                    <RegisterModal />
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
