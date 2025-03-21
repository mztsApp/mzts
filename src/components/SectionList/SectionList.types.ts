import type { Document } from '@contentful/rich-text-types';

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
import type { EVENTS_PREVIEW_COLOR_VARIANT } from '../EventsPreview/EventsPreview.constants';

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

type eventPreviewConditionalFieldsType = {
  title: string;
  description?: string;
  subTitle?: string;
  colorVariant: ValueOf<typeof EVENTS_PREVIEW_COLOR_VARIANT>;
};

type RichTextConditionalFieldsType = {
  title: string;
  richText: Document;
};

type DownloadableDocumentsConditionalFieldsType = {
  title: string;
  description?: string;
  files: { sys: { id: string } }[];
};

export type SectionListConditionalFields = {
  [SECTION_COMPONENT_IDENTIFIER.SECTION]: SectionConditionalFieldsType;
  [SECTION_COMPONENT_IDENTIFIER.GALLERY]: GalleryConditionalFieldsType;
  [SECTION_COMPONENT_IDENTIFIER.TABLE]: TableConditionalFieldsType;
  [SECTION_COMPONENT_IDENTIFIER.EVENTS_PREVIEW]: eventPreviewConditionalFieldsType;
  [SECTION_COMPONENT_IDENTIFIER.RICH_TEXT]: RichTextConditionalFieldsType;
  [SECTION_COMPONENT_IDENTIFIER.DOWNLOADABLE_DOCUMENTS]: DownloadableDocumentsConditionalFieldsType;
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
    }
  | {
      sys: {
        id: string;
        contentType: {
          sys: {
            id: typeof SECTION_COMPONENT_IDENTIFIER.EVENTS_PREVIEW;
          };
        };
      };
      fields: SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.EVENTS_PREVIEW];
    }
  | {
      sys: {
        id: string;
        contentType: {
          sys: {
            id: typeof SECTION_COMPONENT_IDENTIFIER.RICH_TEXT;
          };
        };
      };
      fields: SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.RICH_TEXT];
    }
  | {
      sys: {
        id: string;
        contentType: {
          sys: {
            id: typeof SECTION_COMPONENT_IDENTIFIER.RICH_TEXT;
          };
        };
      };
      fields: SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.DOWNLOADABLE_DOCUMENTS];
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

export type FinalEventPreviewData = DefaultFallbackData &
  SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.EVENTS_PREVIEW];

export type FinalRichTextData = DefaultFallbackData &
  SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.RICH_TEXT];

export type FinalDownloadableDocumentsData = DefaultFallbackData &
  SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.DOWNLOADABLE_DOCUMENTS];

export type FinalSectionListData =
  | FinalSectionData
  | FinalGalleryData
  | FinalTableData
  | FinalEventPreviewData
  | FinalRichTextData
  | FinalDownloadableDocumentsData
  | DefaultFallbackData;

export type SectionListData = FinalSectionListData[];
