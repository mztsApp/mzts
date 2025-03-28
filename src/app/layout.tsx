import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.scss';
import { AcceptPolicyAlert } from '@/components/AcceptPolicyAlert/AcceptPolicyAlert.server';

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
        {children}

        <AcceptPolicyAlert />
      </body>
    </html>
  );
}
