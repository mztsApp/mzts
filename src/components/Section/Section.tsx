import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import {
  SECTION_ALIGNMENT,
  SECTION_COMPONENT,
  SECTION_CONTENT_ALIGNMENT,
  SECTION_HEADING_COMPONENT,
} from './Section.constants';
import styles from './Section.module.scss';
import type { SectionProps } from './Section.types';

export const Section = ({
  as: SectionHTMLTag = SECTION_COMPONENT.SECTION,
  headingLevel = SECTION_HEADING_COMPONENT.H2,
  headingText,
  headingColor,
  description,
  image: imageProps,
  sectionAlignment,
  isPriority = false,
  children,
}: SectionProps) => {
  const isHero = SectionHTMLTag === SECTION_COMPONENT.HEADER;
  const typographyVariant =
    SectionHTMLTag === SECTION_COMPONENT.HEADER
      ? TYPOGRAPHY_VARIANTS.H1
      : TYPOGRAPHY_VARIANTS.H2;

  return (
    <SectionHTMLTag className={styles.section}>
      <div
        className={twMerge(
          styles.section_contentWithImage,
          styles?.[sectionAlignment ?? SECTION_ALIGNMENT.RIGHT],
          isHero && styles.section_contentWithImage__withHeaderHTMLTag,
        )}
      >
        {imageProps?.src && (
          <Image
            src={`https:${imageProps.src}?fm=webp`}
            width={1440}
            height={960}
            className={styles.section_bgImage}
            alt={imageProps?.alt ?? ''}
            priority={isHero || isPriority}
          />
        )}

        <div
          className={twMerge(
            styles.section_content,
            styles?.[
              SECTION_CONTENT_ALIGNMENT[
                sectionAlignment ?? SECTION_ALIGNMENT.RIGHT
              ]
            ],
          )}
        >
          <div className={styles.section_innerContent}>
            <Typography
              as={headingLevel}
              variant={typographyVariant}
              color={headingColor}
              align={TYPOGRAPHY_ALIGNMENT.CENTER}
            >
              {headingText}
            </Typography>

            <div className={styles.section_contentText}>
              <Typography
                as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
                variant={TYPOGRAPHY_VARIANTS.BODY}
                align={TYPOGRAPHY_ALIGNMENT.CENTER}
              >
                {description}
              </Typography>

              {children}
            </div>
          </div>
        </div>
      </div>

      <div
        className={twMerge(
          styles.section_contentOutsideImage,
          isHero && styles.section_contentOutsideImage__withHeaderHTMLTag,
        )}
      >
        <div className={styles.section_outsideImageText}>
          <Typography
            as={headingLevel}
            variant={typographyVariant}
            color={headingColor}
            align={TYPOGRAPHY_ALIGNMENT.CENTER}
          >
            {headingText}
          </Typography>
        </div>

        <div
          className={twMerge(
            styles.section_outsideImageDescription,
            isHero && styles.section_outsideImageDescription__hero,
          )}
        >
          <Typography
            as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
            variant={TYPOGRAPHY_VARIANTS.BODY}
            align={TYPOGRAPHY_ALIGNMENT.CENTER}
          >
            {description}
          </Typography>

          {children}
        </div>

        {!isHero && imageProps?.src && (
          <Image
            src={`https:${imageProps.src}?fm=webp`}
            width={1440}
            height={960}
            className={styles.section_bgImage}
            alt={imageProps?.alt ?? ''}
          />
        )}
      </div>
    </SectionHTMLTag>
  );
};
