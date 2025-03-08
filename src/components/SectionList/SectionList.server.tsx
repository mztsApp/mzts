import { getSectionDataQuery } from './api/getSectionDataQuery';
import { SectionConditionalItem } from './SectionConditionalItem/SectionConditionalItem';
import styles from './SectionList.module.scss';

type SectionApiWrapperProps = {
  entriesIds: string[];
  forceCenterAlignment?: boolean;
};

export const SectionList = async ({
  entriesIds,
  forceCenterAlignment = false,
}: SectionApiWrapperProps) => {
  const { data } = await getSectionDataQuery(entriesIds);

  if (!data) {
    return null;
  }

  return (
    <ul className={styles.sectionList}>
      {data.map((section, index) => {
        const isFirstListElement = index === 0;

        return (
          <li key={section.sectionId} className={styles.sectionList_item}>
            <SectionConditionalItem
              {...section}
              forceCenterAlignment={forceCenterAlignment}
              isPriority={isFirstListElement}
            />
          </li>
        );
      })}
    </ul>
  );
};
