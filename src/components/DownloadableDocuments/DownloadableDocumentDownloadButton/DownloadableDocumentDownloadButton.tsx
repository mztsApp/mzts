'use client';

import { downloadAsset } from '@/utilities/downloadAsset';

import { Button } from '../../Button/Button';
import {
  BUTTON_COMPONENTS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from '../../Button/Button.constants';

import DownloadIcon from '/src/assets/icons/download.svg';

type DownloadableDocumentDownloadButtonProps = {
  title: string;
  href: string;
  fileExtension: string;
};

export const DownloadableDocumentDownloadButton = ({
  title,
  href,
  fileExtension,
}: DownloadableDocumentDownloadButtonProps) => {
  return (
    <Button
      as={BUTTON_COMPONENTS.BUTTON}
      onClick={() => {
        downloadAsset(`https:${href}`, title, fileExtension);
      }}
      variant={BUTTON_VARIANTS.TEXT}
      size={BUTTON_SIZES.LARGE}
      StartIcon={<DownloadIcon />}
    >
      {title} ({fileExtension})
    </Button>
  );
};
