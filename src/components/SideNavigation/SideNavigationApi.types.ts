import type { ValueOf } from '@/types';
import type { ContentIdentificationType } from '@/types/apiTypes';

import type { FileType } from '../Footer/api/getDocumentsQuery';
import type {
  EVENTS_PAGE_ALIGNMENT,
  EVENTS_PAGE_TITLE_COLOR_VARIANT,
} from './SideNavigation.constants';

export type ImagesType = {
  items: {
    sys: {
      id: string;
    };
    fields: {
      title: string;
      description: string;
      file: FileType;
    };
  }[];
};

type EventsPageFieldsTypeFromApi = {
  sys: {
    id: string;
  } & ContentIdentificationType;
  fields: {
    slug: {
      sys: {
        id: string;
      };
    };
    metaTitle: string;
    metaDescription: string;
    title: string;
    colorVariant: ValueOf<typeof EVENTS_PAGE_TITLE_COLOR_VARIANT>;
    description?: string;
    bgImage: {
      sys: {
        id: string;
      };
    };
    alignment: ValueOf<typeof EVENTS_PAGE_ALIGNMENT>;
    date: string;
    location: string;
    eventType: string;
    sections: {
      sys: {
        id: string;
      };
    }[];
  };
};
export type EventsPageData = {
  slug: {
    sys: {
      id: string;
    };
  };
  metaTitle: string;
  metaDescription: string;
  title: string;
  colorVariant: ValueOf<typeof EVENTS_PAGE_TITLE_COLOR_VARIANT>;
  description?: string;
  bgImage: FileType;
  alignment: ValueOf<typeof EVENTS_PAGE_ALIGNMENT>;
  date: string;
  location: string;
  eventType: string;
  sections: {
    sys: {
      id: string;
    };
  }[];
};

export type EventsPageDataTypeFromApi = {
  items: EventsPageFieldsTypeFromApi[];
};

export type EventsPageDataWithoutImage = EventsPageFieldsTypeFromApi['fields'];
