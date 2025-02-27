import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import { navigationContactListQuery } from '../api/navigationContactListQuery';
import { START_CONTACT_ICONS } from './NavContact.constants';
import styles from './NavContact.module.scss';
import { getDataWithIcons } from './NavContact.utilities';

export const NavContact = async () => {
  const { data } = await navigationContactListQuery();

  const dataRelatedWithIcon = getDataWithIcons(data);

  if (!dataRelatedWithIcon) return null;

  return (
    <div className={styles.navContact}>
      <ul className={styles.navContact_list}>
        {data?.address && (
          <li className={styles.navContact_listItem}>
            {START_CONTACT_ICONS.address()}

            <span className={styles.navContact_textContainer}>
              <Typography
                color={TYPOGRAPHY_COLORS.BACKGROUND}
                variant={TYPOGRAPHY_VARIANTS.BODY2}
              >
                {data.address}
              </Typography>
            </span>
          </li>
        )}

        {dataRelatedWithIcon.map((contactItem) => {
          const linkProps = contactItem.value.shouldOpenInNewWindow
            ? {
                target: '_blank',
                rel: 'noreferrer noopener',
              }
            : {};

          return contactItem ? (
            <li
              key={contactItem.value.title ?? ''}
              className={styles.navContact_listItem}
            >
              <a
                {...linkProps}
                href={contactItem.value.href}
                className={styles.navContact_anchor}
              >
                {contactItem.startIcon}

                <span className={styles.navContact_textContainer}>
                  <Typography
                    color={TYPOGRAPHY_COLORS.BACKGROUND}
                    variant={TYPOGRAPHY_VARIANTS.BODY2}
                  >
                    {contactItem?.value.title}
                  </Typography>
                </span>

                {contactItem.endIcon}
              </a>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};
