const apiDomain = 'https://cdn.contentful.com';
const apiKey = process.env.CONTENTFUL_ACCESS_TOKEN;
const spaceId = process.env.CONTENTFUL_SPACE_ID;

export const generateEntryQuery = (
  entryId: string[] | string,
  includeLevel: number = 1,
): string => {
  const resolvedEntryId = typeof entryId === 'string' ? `/${entryId}` : '';
  const entryIds =
    typeof entryId === 'string' ? '' : `&sys.id[in]=${entryId.join(',')}`;

  return `${apiDomain}/spaces/${spaceId}/environments/master/entries${resolvedEntryId}?access_token=${apiKey}&include=${includeLevel}${entryIds}`;
};

export const generateEntryRelatedWithEntryIdQuery = (entryId: string) =>
  `${apiDomain}/spaces/${spaceId}/environments/master/entries?access_token=${apiKey}&links_to_entry=${entryId}`;

export const generateAssetsQuery = (assetIds: string[]): string =>
  `${apiDomain}/spaces/${spaceId}/environments/master/assets?access_token=${apiKey}&sys.id[in]=${assetIds.join(
    ',',
  )}`;

export const generateAssetQuery = (assetId: string): string =>
  `${apiDomain}/spaces/${spaceId}/environments/master/assets/${assetId}?access_token=${apiKey}`;
