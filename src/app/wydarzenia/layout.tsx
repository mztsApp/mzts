import type { Metadata } from 'next';

import { LAYOUT_COMPONENT } from '@/components/Layouts/Layout.constants';
import { EventsLayout } from '@/components/Layouts/EventsLayout/EventsLayout';

export const metadata: Metadata = {
  title: 'MZTS - Wydarzenia',
  description: 'Zobacz nadchodzące wydarzenia',
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    slug?: string;
  }>;
}>) {
  return (
    <EventsLayout as={LAYOUT_COMPONENT.MAIN} params={params}>
      {children}
    </EventsLayout>
  );
}
