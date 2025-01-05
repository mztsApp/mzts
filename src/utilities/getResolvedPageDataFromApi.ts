import {
  BgImageType,
  PageAssetFieldsApiResponse,
  PageDataApiResponseFieldsType,
  PageDataType,
  PageDataWithoutBGImageType,
} from '@/types/pageApiTypes';

const getResolvedEntryObject = (
  sysEntryObject:
    | PageDataApiResponseFieldsType['slug']
    | PageDataApiResponseFieldsType['image'],
) => sysEntryObject.sys.id ?? null;

export const getResolvedPageDataWithoutImageFromApi = (
  pageApiResponse: PageDataApiResponseFieldsType,
): PageDataWithoutBGImageType => {
  const { slug, image, section, ...rest } = pageApiResponse;

  const resolvedSectionIds = Boolean(section)
    ? section?.map((singleSection) => singleSection.sys.id)
    : [];

  return {
    slugEntryId: getResolvedEntryObject(slug),
    bgImageAssetId: getResolvedEntryObject(image),
    sectionEntriesIds: resolvedSectionIds,
    ...rest,
  };
};

export const getResolvePageBGImageFromApi = (
  fields: PageAssetFieldsApiResponse,
): BgImageType => {
  const file = fields.file;

  return {
    src: file.url,
    alt: fields.title,
    width: file.details.image.width,
    height: file.details.image.height,
  };
};

export const getResolvedPageData = (
  dataWithoutImage: PageDataWithoutBGImageType,
  bgImage: BgImageType,
): PageDataType => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { bgImageAssetId, ...restData } = dataWithoutImage;

  return { ...restData, bgImage };
};
