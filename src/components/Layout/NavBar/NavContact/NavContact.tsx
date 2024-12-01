import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';

import { navigationContactListQuery } from '../api/navigationContactListQuery';
import { START_CONTACT_ICONS } from './NavContact.constants';
import styles from './NavContact.module.scss';
import {
  getIcons,
  getListedData,
  IconObjectType,
} from './NavContact.utilities';

export const NavContact = async () => {
  const { data } = await navigationContactListQuery();

  const restData = getListedData(data);
  const icons: IconObjectType[] = getIcons(data);

  return (
    <div className={styles.navContact}>
      <ul className={styles.navContact_list}>
        {data?.address && (
          <li className={styles.navContact_listItem}>
            {START_CONTACT_ICONS.address}

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

        {restData.map((contactItem, index) => {
          const linkProps = contactItem.shouldOpenInNewWindow
            ? {
                target: '_blank',
                rel: 'noreferrer noopener',
              }
            : {};

          return contactItem ? (
            <li
              key={contactItem.text ?? ''}
              className={styles.navContact_listItem}
            >
              <a
                {...linkProps}
                href={contactItem.href}
                className={styles.navContact_anchor}
              >
                {icons[index].startIcon}

                <span className={styles.navContact_textContainer}>
                  <Typography
                    color={TYPOGRAPHY_COLORS.BACKGROUND}
                    variant={TYPOGRAPHY_VARIANTS.BODY2}
                  >
                    {contactItem?.text}
                  </Typography>
                </span>

                {icons[index].endIcon}
              </a>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};
