import type { BgImageType, EntrySysType } from '@/types/pageApiTypes';
import type { ValueOf } from '@/types';

import type { SECTION_COMPONENT_IDENTIFIER } from './SectionList.constants';
import type {
  GALLERY_ALIGNMENT,
  GALLERY_COLOR_VARIANT,
} from '../Gallery/Gallery.constants';

export type SectionIdentificationType = {
  sys: {
    id: string;
  };
  contentType: {
    sys: {
      id: ValueOf<typeof SECTION_COMPONENT_IDENTIFIER>;
    };
  };
};

type SectionConditionalFieldsType = {
  title: string;
  colorVariant: string;
  description: string;
  image: EntrySysType;
  alignment: string;
  content?: EntrySysType;
};

type GalleryConditionalFieldsType = {
  title: string;
  color: ValueOf<typeof GALLERY_COLOR_VARIANT>;
  description?: string;
  alignment: ValueOf<typeof GALLERY_ALIGNMENT>;
  additionalContent?: {
    sys: {
      id: string;
    };
  };
  images: { sys: { id: string } }[];
};

export type SectionListConditionalFields = {
  [SECTION_COMPONENT_IDENTIFIER.SECTION]: SectionConditionalFieldsType;
  [SECTION_COMPONENT_IDENTIFIER.GALLERY]: GalleryConditionalFieldsType;
};

type SectionListFieldFromApiResponse =
  | {
      sys: {
        id: string;
        contentType: {
          sys: {
            id: typeof SECTION_COMPONENT_IDENTIFIER.SECTION;
          };
        };
      };
      fields: SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.SECTION];
    }
  | {
      sys: {
        id: string;
        contentType: {
          sys: {
            id: typeof SECTION_COMPONENT_IDENTIFIER.GALLERY;
          };
        };
      };
      fields: SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.GALLERY];
    };

export type SectionListItemFromApiResponse = SectionListFieldFromApiResponse[];

export type SectionBGImageField = {
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
};

export type SectionBGImageSectionList = {
  items: SectionBGImageField[];
};

export type FinalSectionData = {
  identifier: string;
  sectionId: string;
  bgImageId: string;
  title: string;
  colorVariant: string;
  description: string;
  alignment: string;
  image?: BgImageType;
  additionalContentId?: string;
};

export type FinalGalleryData = {
  identifier: string;
  sectionId: string;
} & SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.GALLERY];

export type DefaultFallbackData = {
  identifier: string;
  sectionId: string;
};

export type FinalSectionListData =
  | FinalSectionData
  | FinalGalleryData
  | DefaultFallbackData;

export type SectionListData = FinalSectionListData[];
