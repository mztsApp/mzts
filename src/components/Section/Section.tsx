import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import {
  SECTION_ALIGNMENT,
  SECTION_COMPONENT,
  SECTION_CONTENT_ALIGNMENT,
  SECTION_HEADING_COMPONENT,
} from './Section.constants';
import styles from './Section.module.scss';
import { SectionProps } from './Section.types';
import { Typography } from '../Typography/Typography.server';
import {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';

export const Section = ({
  as: SectionHTMLTag = SECTION_COMPONENT.SECTION,
  headingLevel = SECTION_HEADING_COMPONENT.H2,
  headingText,
  description,
  image: imageProps,
  sectionAlignment,
  headingColor,
}: SectionProps) => {
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
          SectionHTMLTag === SECTION_COMPONENT.HEADER &&
            styles.section_contentWithImage__withHeaderHTMLTag,
        )}
      >
        <Image
          {...imageProps}
          className={styles.section_bgImage}
          alt={imageProps.alt}
          priority={SectionHTMLTag === SECTION_COMPONENT.HEADER}
        />

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
              noWrap
              as={headingLevel}
              variant={typographyVariant}
              color={headingColor}
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
            </div>
          </div>
        </div>
      </div>

      <div
        className={twMerge(
          styles.section_contentOutsideImage,
          SectionHTMLTag === SECTION_COMPONENT.HEADER &&
            styles.section_contentOutsideImage__withHeaderHTMLTag,
        )}
      >
        <div className={styles.section_outsideImageText}>
          <Typography noWrap as={headingLevel} variant={typographyVariant}>
            {headingText}
          </Typography>
        </div>

        <Typography
          as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
          variant={TYPOGRAPHY_VARIANTS.BODY}
          align={TYPOGRAPHY_ALIGNMENT.CENTER}
          color={headingColor}
        >
          {description}
        </Typography>

        {SectionHTMLTag !== SECTION_COMPONENT.HEADER && (
          <Image
            {...imageProps}
            className={styles.section_bgImage}
            alt={imageProps.alt}
          />
        )}
      </div>
    </SectionHTMLTag>
  );
};
