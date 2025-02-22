type Item = {
  fields: {
    title: string;
    href: string;
    shouldOpenInNewWindow: boolean;
    description?: string;
  };
};

export type linksResponseDataType = {
  items: Item[];
};

type DataItem = Item['fields'];

export type LinkAdditionalContentData = {
  items: DataItem[];
};
