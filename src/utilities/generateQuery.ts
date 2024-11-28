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

  console.log(
    'urle: ',
    `${apiDomain}/spaces/${spaceId}/environments/master/entries${resolvedEntryId}?access_token=${apiKey}&include=${includeLevel}&${entryIds}`,
  );

  return `${apiDomain}/spaces/${spaceId}/environments/master/entries${resolvedEntryId}?access_token=${apiKey}&include=${includeLevel}${entryIds}`;
};

export const generateAssetsQuery = (assetIds: string[]): string =>
  `${apiDomain}/spaces/${spaceId}/environments/master/assets?access_token=${apiKey}&sys.id[all]=${assetIds.join(
    ',',
  )}`;
