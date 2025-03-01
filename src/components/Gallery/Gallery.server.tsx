import { twMerge } from 'tailwind-merge';

import { AdditionalSectionContent } from '../AdditionalSectionContent/AdditionalContent.server';
import type { FinalGalleryData } from '../SectionList/SectionList.types';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import { getGalleryAssetsApi } from './api/getGalleryAssetsApi';
import {
  GALLERY_ALIGNMENT_FROM_API,
  TYPOGRAPHY_ALIGNMENT_FROM_GALLERY,
} from './Gallery.constants';
import styles from './Gallery.module.scss';
import { GalleryInteractiveImages } from './GalleryInteractiveImages/GalleryInteractiveImages.client';

export type GalleryProps = {
  title: string;
};

export const Gallery = async ({
  title,
  description,
  alignment,
  additionalContent,
  images,
}: FinalGalleryData) => {
  const { data } = await getGalleryAssetsApi({
    assetIds: images.map((image) => image.sys.id),
  });

  if (!data) {
    return null;
  }

  return (
    <section
      className={twMerge(
        styles.gallery,
        styles[GALLERY_ALIGNMENT_FROM_API[alignment]],
      )}
    >
      <Typography
        as={TYPOGRAPHY_COMPONENTS.H2}
        variant={TYPOGRAPHY_VARIANTS.H2}
        align={TYPOGRAPHY_ALIGNMENT_FROM_GALLERY[alignment]}
      >
        {title}
      </Typography>

      <Typography align={TYPOGRAPHY_ALIGNMENT_FROM_GALLERY[alignment]}>
        {description}
      </Typography>

      <GalleryInteractiveImages images={data} />

      {Boolean(additionalContent) && (
        <AdditionalSectionContent hash={additionalContent?.sys.id ?? ''} />
      )}
    </section>
  );
};
