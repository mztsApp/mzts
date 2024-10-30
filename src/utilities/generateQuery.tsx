const apiDomain = "https://cdn.contentful.com";
const apiKey = process.env.CONTENTFUL_ACCESS_TOKEN;
const spaceId = process.env.CONTENTFUL_SPACE_ID;

export const generateEntryQuery = (
  entryId: string,
  includeLevel: number = 1
): string =>
  `${apiDomain}/spaces/${spaceId}/environments/master/entries/${entryId}?access_token=${apiKey}&include=${includeLevel}`;

export const generateAssetsQuery = (assetIds: string[]): string =>
  `${apiDomain}/spaces/${spaceId}/environments/master/assets?access_token=${apiKey}&sys.id[in]=${assetIds.join(
    ","
  )}`;
