export type PageDataWithoutBGImageType = {
  slugEntryId: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  heroDescription: string;
  colorVariant: string;
  bgImageAssetId: string;
  alignmentVariant: string;
  sectionEntriesIds: string[];
  showContactForm: boolean;
  shoNewsletter: boolean;
  showFaq: boolean;
  isHeroHide: boolean;
};

export type PageAssetFieldsApiResponse = {
  title: string;
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

export type BgImageType = {
  alt: string;
  src: string;
  width: number;
  height: number;
};

export type PageDataType = Omit<
  PageDataWithoutBGImageType,
  'bgImageAssetId'
> & {
  bgImage: BgImageType;
};

export type EntrySysType = {
  sys: {
    id: string;
  };
};

type PageEntryFields = {
  slug: EntrySysType;
  image: EntrySysType;
  section: EntrySysType[];
};

export type PageDataApiResponseFieldsType = Omit<
  PageDataType,
  'slugEntryId' | 'bgImageAssetId' | 'sectionEntriesIds'
> &
  PageEntryFields;

export type PageTemplateProps = {
  slug: string;
};

export type PageParams = {
  params: {
    slug: string;
  };
};
