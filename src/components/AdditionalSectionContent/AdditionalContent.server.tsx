import { getAdditionalContent } from './api/getAdditionalContent';

type AdditionalSectionContentProps = {
  hash: string;
};

export const AdditionalSectionContent = async ({
  hash,
}: AdditionalSectionContentProps) => {
  const {} = await getAdditionalContent(hash);

  return null;
};
