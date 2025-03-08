import type { FinalDownloadableDocumentsData } from '../SectionList/SectionList.types';
import {
  TYPOGRAPHY_ALIGNMENT,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import { getDownloadableDocumentsAssets } from './api/getDownloadableDocumentsAssets';
import { DownloadableDocumentDownloadButton } from './DownloadableDocumentDownloadButton/DownloadableDocumentDownloadButton';
import styles from './DownloadableDocuments.module.scss';

export const DownloadableDocuments = async ({
  title,
  description,
  files,
}: FinalDownloadableDocumentsData) => {
  const { data } = await getDownloadableDocumentsAssets(
    files.map((file) => file.sys.id),
  );

  if (!data || !data.length) {
    return null;
  }

  return (
    <section className={styles.downloadableDocuments}>
      <Typography
        as={TYPOGRAPHY_COMPONENTS.H2}
        variant={TYPOGRAPHY_VARIANTS.H2}
        align={TYPOGRAPHY_ALIGNMENT.CENTER}
      >
        {title}
      </Typography>

      {Boolean(description) && (
        <Typography align={TYPOGRAPHY_ALIGNMENT.CENTER}>
          {description}
        </Typography>
      )}

      <ul className={styles.downloadableDocuments_list}>
        {data.map((document) => (
          <li
            key={document.title}
            className={styles.downloadableDocuments_listItem}
          >
            <DownloadableDocumentDownloadButton
              title={document.title}
              href={document.file.url}
              fileExtension="pdf"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
