import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import { getDocumentsQuery } from '../api/getDocumentsQuery';
import styles from './FooterDocuments.module.scss';

export const FooterDocuments = async () => {
  const { data } = await getDocumentsQuery();

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

      {data?.privacyPolicy && (
        <li className={styles.footerDocuments_item}>
          <a
            href={`https:${data.privacyPolicy.file.url}`}
            className={styles.footerDocuments_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography
              as={TYPOGRAPHY_COMPONENTS.SPAN}
              variant={TYPOGRAPHY_VARIANTS.BODY2}
            >
              {data.privacyPolicy.title}
            </Typography>
          </a>
        </li>
      )}

      {data?.cookies && (
        <li className={styles.footerDocuments_item}>
          <a
            href={`https:${data.cookies.file.url}`}
            className={styles.footerDocuments_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography
              as={TYPOGRAPHY_COMPONENTS.SPAN}
              variant={TYPOGRAPHY_VARIANTS.BODY2}
            >
              {data.cookies.title}
            </Typography>
          </a>
        </li>
      )}

      {data?.rules && (
        <li className={styles.footerDocuments_item}>
          <a
            href={`https:${data.rules.file.url}`}
            className={styles.footerDocuments_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography
              as={TYPOGRAPHY_COMPONENTS.SPAN}
              variant={TYPOGRAPHY_VARIANTS.BODY2}
            >
              {data.rules.title}
            </Typography>
          </a>
        </li>
      )}

      {data?.documents.map((document) => (
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
