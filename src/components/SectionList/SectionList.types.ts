import type { BgImageType, EntrySysType } from '@/types/pageApiTypes';
import type { ValueOf } from '@/types';

import type { SECTION_COMPONENT_IDENTIFIER } from './SectionList.constants';
import type {
  GALLERY_ALIGNMENT,
  GALLERY_COLOR_VARIANT,
} from '../Gallery/Gallery.constants';
import type {
  TABLE_ALIGNMENT,
  TABLE_COLOR_VARIANT,
} from '../TablePageSection/TablePageSection.constants';

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

type TableConditionalFieldsType = {
  title: string;
  description?: string;
  colorVariant: ValueOf<typeof TABLE_COLOR_VARIANT>;
  alignmentVariant: ValueOf<typeof TABLE_ALIGNMENT>;
  table: {
    sys: {
      id: string;
    };
  };
};

export type SectionListConditionalFields = {
  [SECTION_COMPONENT_IDENTIFIER.SECTION]: SectionConditionalFieldsType;
  [SECTION_COMPONENT_IDENTIFIER.GALLERY]: GalleryConditionalFieldsType;
  [SECTION_COMPONENT_IDENTIFIER.TABLE]: TableConditionalFieldsType;
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
    }
  | {
      sys: {
        id: string;
        contentType: {
          sys: {
            id: typeof SECTION_COMPONENT_IDENTIFIER.TABLE;
          };
        };
      };
      fields: SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.TABLE];
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

export type FinalTableData = {
  identifier: string;
  sectionId: string;
  title: string;
  description?: string;
  colorVariant: ValueOf<typeof TABLE_COLOR_VARIANT>;
  alignmentVariant: ValueOf<typeof TABLE_ALIGNMENT>;
  tableAssetId: string;
};

export type DefaultFallbackData = {
  identifier: string;
  sectionId: string;
};

export type FinalSectionListData =
  | FinalSectionData
  | FinalGalleryData
  | FinalTableData
  | DefaultFallbackData;

export type SectionListData = FinalSectionListData[];
