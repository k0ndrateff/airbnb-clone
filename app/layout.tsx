import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModal";
import SearchModal from "@/app/components/modals/SearchModal";
import React from "react";

const font = Nunito({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'AirBnB Clone',
  description: 'AirBnB - сайт по поиску съёмного жилья на любой срок.',
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
                    <SearchModal />
                    <RentModal />
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                <div className={'pb-20 pt-28'}>
                    {children}
                </div>
            </body>
        </html>
    );
}
