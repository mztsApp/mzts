import type { BgImageType, EntrySysType } from '@/types/pageApiTypes';

type SectionListFieldFromApiResponse = {
  fields: {
    title: string;
    colorVariant: string;
    description: string;
    image: EntrySysType;
    alignment: string;
    content?: EntrySysType;
  };
} & EntrySysType;

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

export type SectionListData = {
  sectionId: string;
  bgImageId: string;
  title: string;
  colorVariant: string;
  description: string;
  alignment: string;
  image: BgImageType;
  additionalContentId?: string;
}[];
