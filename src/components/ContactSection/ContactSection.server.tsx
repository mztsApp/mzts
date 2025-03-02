import { twMerge } from 'tailwind-merge';

import { openInNewWindowLinkProps } from '../Footer/Footer.server';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import { ContactFrom } from './ContactFrom/ContactFrom';
import styles from './ContactSection.module.scss';
import { navigationContactListQuery } from '../Navigation/api/navigationContactListQuery';
import { START_CONTACT_ICONS } from '../Navigation/NavContact/NavContact.constants';

export const ContactSection = async () => {
  const { data } = await navigationContactListQuery();

  if (!data) return null;

  return (
    <section className={styles.contactSection} id="skontaktuj-sie-z-nami">
      <header className={styles.contactSection_hero}>
        <Typography variant={TYPOGRAPHY_VARIANTS.SUBTITLE}>
          Masz pytania?
        </Typography>

        <Typography
          as={TYPOGRAPHY_COMPONENTS.H2}
          variant={TYPOGRAPHY_VARIANTS.H2}
        >
          Kontakt
        </Typography>

        <Typography>
          Masz pytanie lub potrzebujesz pomocy? Napisz do nas. Jesteśmy do
          Twojej dyspozycji. Odpowiadamy najszybciej jak to możliwe.
        </Typography>

        <ul className={styles.contactSection_contactList}>
          {data?.email && (
            <li className={styles.contactSection_contactItem}>
              <a
                className={styles.contactSection_contactLink}
                href={data.email.href}
                {...openInNewWindowLinkProps(data.email.shouldOpenInNewWindow)}
              >
                {START_CONTACT_ICONS.email(styles.contactSection_contactIcon)}

                <Typography
                  noWrap
                  as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
                  variant={TYPOGRAPHY_VARIANTS.BODY2}
                  className={styles.contactSection_linkText}
                >
                  {data.email.title}
                </Typography>
              </a>
            </li>
          )}
          {data?.phoneNumber && (
            <li className={styles.contactSection_contactItem}>
              <a
                className={styles.contactSection_contactLink}
                href={data.phoneNumber.href}
                {...openInNewWindowLinkProps(
                  data.phoneNumber.shouldOpenInNewWindow,
                )}
              >
                {START_CONTACT_ICONS.phoneNumber(
                  styles.contactSection_contactIcon,
                )}

                <Typography
                  noWrap
                  as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
                  variant={TYPOGRAPHY_VARIANTS.BODY2}
                  className={styles.contactSection_linkText}
                >
                  {data.phoneNumber.title}
                </Typography>
              </a>
            </li>
          )}
          {data?.address && (
            <li
              className={twMerge(
                styles.contactSection_contactItem,
                styles.contactSection_contactItem__address,
              )}
            >
              {START_CONTACT_ICONS.address(styles.contactSection_contactIcon)}

              <Typography
                noWrap
                as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
                variant={TYPOGRAPHY_VARIANTS.BODY2}
              >
                {data.address}
              </Typography>
            </li>
          )}
        </ul>
      </header>

      <ContactFrom />
    </section>
  );
};
