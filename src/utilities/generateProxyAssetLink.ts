type GenerateProxyAssetLinkProps = {
  fileName: string;
  assetUrl: string;
};

export const generateProxyAssetLink = ({
  fileName,
  assetUrl,
}: GenerateProxyAssetLinkProps) => {
  return `/api/proxy/${fileName}?url=${encodeURIComponent(`https:${assetUrl}`)}`;
};
