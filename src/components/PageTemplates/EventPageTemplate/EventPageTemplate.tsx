import { notFound } from 'next/navigation';

import { SectionList } from '@/components/SectionList/SectionList.server';
import type { PageTemplateProps } from '@/types/pageApiTypes';
import { getCombinedFullEventsPages } from '@/components/SideNavigation/api/getCombinedFullEventsPages';

import { EventPageTemplateHero } from './EventPageTemplateHero/EventPageTemplateHero';

export const EventPageTemplate = async ({ slug }: PageTemplateProps) => {
  const { currentPage } = await getCombinedFullEventsPages(slug);

  if (!currentPage) {
    notFound();
  }

  const additionalContent = currentPage?.sections?.map(
    (section) => section.sys.id,
  );

  const image = currentPage.bgImage;
  const imageProps = {
    src: image.url,
    width: image.details.image.width,
    height: image.details.image.height,
    alt: image.fileName,
  };

  return (
    <>
      <EventPageTemplateHero
        title={currentPage.title}
        description={currentPage.description}
        image={imageProps}
        location={currentPage.location}
        date={currentPage.date}
        badgeText={currentPage.eventType}
      />

      <SectionList forceCenterAlignment entriesIds={additionalContent ?? []} />
    </>
  );
};
