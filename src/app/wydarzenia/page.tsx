import { notFound } from 'next/navigation';

import { appNavigationQuery } from '@/api/appNavigationQuery';
import { NAVIGATION_EVENTS_PAGE } from '@/components/Navigation/Navigation.constants';
import { EventsLayout } from '@/components/Layouts/EventsLayout/EventsLayout';
import { LAYOUT_COMPONENT } from '@/components/Layouts/Layout.constants';
import { Section } from '@/components/Section/Section';
import {
  SECTION_ALIGNMENT,
  SECTION_COMPONENT,
  SECTION_HEADING_COMPONENT,
} from '@/components/Section/Section.constants';
import { EventsPreview } from '@/components/EventsPreview/EventsPreview';
import { EVENTS_PREVIEW_COLOR_VARIANT } from '@/components/EventsPreview/EventsPreview.constants';

export async function generateMetadata() {
  return {
    title: 'Wydarzenia',
    description: 'Zobacz nadchodzące wydarzenia',
  };
}

export default async function EventsPage() {
  const { data: navigationData } = await appNavigationQuery();

  if (!navigationData) return null;

  const resolvedEntryId = await navigationData.some(
    (page) => page.subpage === NAVIGATION_EVENTS_PAGE,
  );

  if (!resolvedEntryId) {
    notFound();
  }

  return (
    <EventsLayout as={LAYOUT_COMPONENT.MAIN}>
      <Section
        isStatic
        isPriority
        as={SECTION_COMPONENT.HEADER}
        headingText="Wydarzenia"
        headingLevel={SECTION_HEADING_COMPONENT.H1}
        description="Zabacz nadchodzące wydarzenia"
        sectionAlignment={SECTION_ALIGNMENT.LEFT}
        image={{
          src: '/assets/images/wydarzenia.webp',
          alt: '',
          width: 4096,
          height: 2732,
        }}
      />

      <EventsPreview
        identifier="-"
        sectionId="-"
        title="Najbliższe Nadchodzące wydarzenia"
        description="W najbliższym czasie czekają na Ciebie wyjątkowe wydarzenia, które łączą miłośników różnych stylów tanecznych"
        colorVariant={EVENTS_PREVIEW_COLOR_VARIANT.GRADIENT_RIGHT}
      />
    </EventsLayout>
  );
}
