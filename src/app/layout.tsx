import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.scss';
import { LAYOUT_COMPONENT } from '@/components/Layout/Layout.constants';
import { Layout } from '@/components/Layout/Layout.server';
import { Footer } from '@/components/Footer/Footer.server';
import { GoToTopButton } from '@/components/GoToTopButton/GoToTopButton.client';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'MZTS - Strona główna',
  description: 'Strona główna',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Layout as={LAYOUT_COMPONENT.MAIN}>{children}</Layout>

        <GoToTopButton />

        <Footer />
      </body>
    </html>
  );
}
