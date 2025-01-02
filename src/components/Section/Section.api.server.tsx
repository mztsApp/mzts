import { sectionDataQuery } from './api/sectionDataQuery';

type SectionApiWrapperProps = {
  apiId: string;
};

export const SectionApiWrapper = async ({ apiId }: SectionApiWrapperProps) => {
  const {} = await sectionDataQuery(apiId);

  return null;
};
