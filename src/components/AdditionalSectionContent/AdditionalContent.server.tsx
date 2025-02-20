import { ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION } from './AdditionalContent.constants';
import { getAdditionalContent } from './api/getAdditionalContent';

type AdditionalSectionContentProps = {
  hash: string;
};

export const AdditionalSectionContent = async ({
  hash,
}: AdditionalSectionContentProps) => {
  const { data, isError, isPending } = await getAdditionalContent(hash);

  console.log('finalData', { data });

  if (isPending || isError) return null;

  switch (data?.variant) {
    case ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.STYLED_LIST:
      return null;
    case ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.LINKS:
      return null;
    default:
      return null;
  }
};
