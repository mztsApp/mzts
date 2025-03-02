import type {
  SectionListConditionalFields,
  SectionListItemFromApiResponse,
} from './SectionList.types';
import { SECTION_COMPONENT_IDENTIFIER } from './SectionList.constants';

export const getResolvedSectionListItemsFromApi = (
  items: SectionListItemFromApiResponse,
) =>
  items.map((item) => {
    const { sys, fields } = item;

    const identifier: string = sys.contentType.sys.id;

    switch (identifier) {
      case SECTION_COMPONENT_IDENTIFIER.SECTION:
        const { image, content, ...sectionRestFields } =
          fields as SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.SECTION];

        return {
          ...sectionRestFields,
          identifier: sys.contentType.sys.id,
          sectionId: sys.id,
          bgImageId: image.sys.id,
          additionalContentId: content?.sys?.id,
        };
      case SECTION_COMPONENT_IDENTIFIER.GALLERY:
        const { ...galleryRestFields } =
          fields as SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.GALLERY];

        return {
          ...galleryRestFields,
          identifier: sys.contentType.sys.id,
          sectionId: sys.id,
        };

      case SECTION_COMPONENT_IDENTIFIER.TABLE:
        const { table, ...tableFields } =
          fields as SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.TABLE];

        return {
          ...tableFields,
          identifier: sys.contentType.sys.id,
          sectionId: sys.id,
          tableAssetId: table.sys.id,
        };
      case SECTION_COMPONENT_IDENTIFIER.EVENTS_PREVIEW:
        const eventsPreviewFields =
          fields as SectionListConditionalFields[typeof SECTION_COMPONENT_IDENTIFIER.EVENTS_PREVIEW];

        return {
          ...eventsPreviewFields,
          identifier: sys.contentType.sys.id,
          sectionId: sys.id,
        };
      default:
        return {
          identifier: sys.contentType.sys.id,
          sectionId: sys.id,
        };
    }
  });

export type ResolvedSectionListDataFromApiType = ReturnType<
  typeof getResolvedSectionListItemsFromApi
>;
