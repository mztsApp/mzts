'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import React from 'react';

import CloseIcon from '/src/assets/icons/close.svg';
import DownloadIcon from '/src/assets/icons/download.svg';
import LeftChevronIcon from '/src/assets/icons/chevronLeft.svg';
import RightChevronIcon from '/src/assets/icons/chevronRight.svg';

import { Dialog, DialogContent } from '@radix-ui/react-dialog';

import { Typography } from '@/components/Typography/Typography.server';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { SROnly } from '@/components/SROnly/SROnly';
import { downloadImage } from '@/utilities/downloadImage';

import type { GalleryAssetsDataType } from '../Gallery.types';
import styles from './GalleryInteractiveImages.module.scss';

type GalleryInteractiveImagesProps = {
  images: GalleryAssetsDataType[];
};

export const GalleryInteractiveImages = ({
  images,
}: GalleryInteractiveImagesProps) => {
  const [fullScreenImageIndex, setFullScreenImageIndex] = React.useState<
    number | null
  >(null);

  React.useEffect(() => {
    if (fullScreenImageIndex !== null) {
      document.documentElement.style.overflow = 'clip';
    } else {
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [fullScreenImageIndex]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFullScreenImageIndex(null);
      }

      if (fullScreenImageIndex !== null && event.key === 'ArrowLeft') {
        setFullScreenImageIndex((prev) =>
          (prev ?? 1) - 1 === 0 ? images.length - 1 : (prev ?? 1) - 1,
        );
      }

      if (fullScreenImageIndex !== null && event.key === 'ArrowRight') {
        setFullScreenImageIndex((prev) =>
          (prev ?? 0) + 1 <= images.length - 1 ? (prev ?? 0) + 1 : 0,
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullScreenImageIndex, images.length, setFullScreenImageIndex]);

  return (
    <ul className={styles.galleryInteractiveImages}>
      {images.map((image, index, array) => {
        const isFirstRowOfImages = index < 3;

        const imageSize = image.file.details.image;
        const isImagePreview = fullScreenImageIndex === index;

        return (
          <React.Fragment key={image.title}>
            <li>
              <button
                className={styles.galleryInteractiveImages_imageButton}
                onClick={() => setFullScreenImageIndex(index)}
              >
                <Image
                  className={styles.galleryInteractiveImages_image}
                  src={`https:${image.file.url}?fm=webp`}
                  width={imageSize.width}
                  height={imageSize.height}
                  alt={image.title}
                  priority={isFirstRowOfImages}
                />
              </button>
            </li>

            {isImagePreview && (
              <Dialog open={isImagePreview}>
                <DialogContent>
                  <li
                    className={twMerge(
                      styles.galleryInteractiveImages_imageContainer,
                      styles.galleryInteractiveImages_imageContainer__preview,
                    )}
                  >
                    <article
                      className={
                        styles.galleryInteractiveImages_previewContainer
                      }
                    >
                      <div
                        className={
                          styles.galleryInteractiveImages_imageDescription
                        }
                      >
                        <div
                          className={
                            styles.galleryInteractiveImages_imageOptions
                          }
                        >
                          <button
                            className={
                              styles.galleryInteractiveImages_iconButton
                            }
                            onClick={() => setFullScreenImageIndex(null)}
                          >
                            <CloseIcon
                              className={
                                styles.galleryInteractiveImages_iconButtonSVG
                              }
                            />
                            <SROnly>Powróć</SROnly>
                          </button>

                          <button
                            title="Pobierz zdjęcie"
                            className={
                              styles.galleryInteractiveImages_iconButton
                            }
                            onClick={() =>
                              downloadImage(
                                `https:${image.file.url}?fm=webp`,
                                image.title,
                              )
                            }
                          >
                            <DownloadIcon
                              className={
                                styles.galleryInteractiveImages_iconButtonSVG
                              }
                            />
                            <SROnly>Pobierz zdjęcie</SROnly>
                          </button>

                          <button
                            className={
                              styles.galleryInteractiveImages_iconButton
                            }
                            onClick={() =>
                              setFullScreenImageIndex(
                                index - 1 === 0 ? array.length - 1 : index - 1,
                              )
                            }
                          >
                            <LeftChevronIcon
                              className={
                                styles.galleryInteractiveImages_iconButtonSVG
                              }
                            />
                            <SROnly>Przejdź do poprzednieg zdjęcia</SROnly>
                          </button>

                          <button
                            className={
                              styles.galleryInteractiveImages_iconButton
                            }
                            onClick={() =>
                              setFullScreenImageIndex(
                                index + 1 <= array.length - 1 ? index + 1 : 0,
                              )
                            }
                          >
                            <RightChevronIcon
                              className={
                                styles.galleryInteractiveImages_iconButtonSVG
                              }
                            />
                            <SROnly>Przejdź do następnego zdjęcia</SROnly>
                          </button>
                        </div>

                        <Typography
                          className={styles.galleryInteractiveImages_imageTitle}
                          as={TYPOGRAPHY_COMPONENTS.H3}
                          variant={TYPOGRAPHY_VARIANTS.H2}
                          color={TYPOGRAPHY_COLORS.ACCENT}
                        >
                          {image.title}
                        </Typography>

                        {Boolean(image.description) && (
                          <Typography
                            className={
                              styles.galleryInteractiveImages_imageDescriptionText
                            }
                          >
                            {image.description}
                          </Typography>
                        )}
                      </div>

                      <Image
                        className={twMerge(
                          styles.galleryInteractiveImages_image,
                          styles.galleryInteractiveImages_image__preview,
                        )}
                        src={`https:${image.file.url}?fm=webp`}
                        width={imageSize.width}
                        height={imageSize.height}
                        alt={image.title}
                        priority
                      />
                    </article>
                  </li>
                </DialogContent>
              </Dialog>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
