import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import { getFooterDocumentsQuery } from '../api/getFooterDocumentsQuery';
import styles from './FooterDocuments.module.scss';

export const FooterDocuments = async () => {
  const { data } = await getFooterDocumentsQuery();

  return (
    <ul className={styles.footerDocuments}>
      <li className={styles.footerDocuments_item}>
        <Typography
          as={TYPOGRAPHY_COMPONENTS.SPAN}
          variant={TYPOGRAPHY_VARIANTS.BODY2}
        >
          © 2025 MZTS. Wszystkie prawa zastrzeżone.
        </Typography>
      </li>

      {data.map((document) => (
        <li key={document.title} className={styles.footerDocuments_item}>
          <a
            href={`https:${document.file.url}`}
            className={styles.footerDocuments_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography
              as={TYPOGRAPHY_COMPONENTS.SPAN}
              variant={TYPOGRAPHY_VARIANTS.BODY2}
            >
              {document.title}
            </Typography>
          </a>
        </li>
      ))}
    </ul>
  );
};
