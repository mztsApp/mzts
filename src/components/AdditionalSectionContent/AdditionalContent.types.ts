type Item = {
  fields: {
    text: string;
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
