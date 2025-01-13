import Link from 'next/link';

import { appNavigationQuery } from '@/app/api/appNavigationQuery';
import { getFlattenedLinks } from '@/utilities/getFlattenedLinks';
import MZTSLogoIcon from '@/assets/icons/mztsDesktop.svg';

import { navigationContactListQuery } from '../Layout/Navigation/api/navigationContactListQuery';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '../Typography/Typography.constants';
import { Typography } from '../Typography/Typography.server';
import styles from './Footer.module.scss';
import { FooterDocuments } from './FooterDocuments/FooterDocuments.server';
import {
  END_CONTACT_ICONS,
  START_CONTACT_ICONS,
} from '../Layout/Navigation/NavContact/NavContact.constants';

export const openInNewWindowLinkProps = (shouldOpenInNewWindow: boolean) =>
  shouldOpenInNewWindow
    ? {
        target: '_blank',
        rel: 'noreferrer noopener',
      }
    : {};

export const Footer = async () => {
  const { data } = await appNavigationQuery();
  const { data: contactData } = await navigationContactListQuery();

  if (!data || !contactData) return null;

  const groupedFlattenedLinks = getFlattenedLinks(data);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <nav className={styles.footer_navigation}>
          <section>
            <MZTSLogoIcon className={styles.footer_logo} />

            <Typography
              as={TYPOGRAPHY_COMPONENTS.H2}
              variant={TYPOGRAPHY_VARIANTS.SUBTITLE}
            >
              Dane kontaktowe
            </Typography>

            <ul className={styles.footer_contactList}>
              <li className={styles.footer_contactItem}>
                <Typography
                  as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
                  variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                  noWrap
                >
                  Mazowiecki związek tańca sportowego
                </Typography>
              </li>

              {contactData?.address && (
                <li className={styles.footer_contactOnlyTextItem}>
                  {START_CONTACT_ICONS.address(styles.footer_contactIcon)}

                  <Typography
                    as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
                    variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                    noWrap
                  >
                    {contactData.address}
                  </Typography>
                </li>
              )}
              {contactData?.email && (
                <li className={styles.footer_contactItem}>
                  <a
                    className={styles.footer_contactLink}
                    href={contactData.email.href}
                    {...openInNewWindowLinkProps(
                      contactData.email.shouldOpenInNewWindow,
                    )}
                  >
                    {START_CONTACT_ICONS.email(styles.footer_contactIcon)}

                    <Typography
                      as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
                      variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                      noWrap
                    >
                      {contactData.email.text}
                    </Typography>
                  </a>
                </li>
              )}
              {contactData?.phoneNumber && (
                <li className={styles.footer_contactItem}>
                  <a
                    className={styles.footer_contactLink}
                    href={contactData.phoneNumber.href}
                    {...openInNewWindowLinkProps(
                      contactData.phoneNumber.shouldOpenInNewWindow,
                    )}
                  >
                    {START_CONTACT_ICONS.phoneNumber(styles.footer_contactIcon)}

                    <Typography
                      as={TYPOGRAPHY_COMPONENTS.PARAGRAPH}
                      variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                      noWrap
                    >
                      {contactData.phoneNumber.text}
                    </Typography>
                  </a>
                </li>
              )}
              {contactData?.facebook && (
                <li className={styles.footer_contactItem}>
                  <a
                    className={styles.footer_facebookLink}
                    href={contactData.facebook.href}
                    {...openInNewWindowLinkProps(
                      contactData.facebook.shouldOpenInNewWindow,
                    )}
                  >
                    {END_CONTACT_ICONS.facebook(
                      styles.footer_contactFacebookIcon,
                    )}
                  </a>
                </li>
              )}
            </ul>
          </section>

          <ul className={styles.footer_navigationList}>
            <li>
              <Link href="/" className={styles.footer_link}>
                {
                  <Typography
                    as={TYPOGRAPHY_COMPONENTS.SPAN}
                    variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                    noWrap
                    uppercase
                  >
                    strona główna
                  </Typography>
                }
              </Link>
            </li>
            {groupedFlattenedLinks.subPages.map(({ subPage, page }) => (
              <li key={page}>
                <Link
                  href={`/${subPage}/${page}`}
                  className={styles.footer_link}
                >
                  {
                    <Typography
                      as={TYPOGRAPHY_COMPONENTS.SPAN}
                      variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                      noWrap
                      uppercase
                    >
                      {page}
                    </Typography>
                  }
                </Link>
              </li>
            ))}
            {groupedFlattenedLinks.pages.map((page) => (
              <li key={page}>
                <Link href={`/${page}`} className={styles.footer_link}>
                  {
                    <Typography
                      as={TYPOGRAPHY_COMPONENTS.SPAN}
                      variant={TYPOGRAPHY_VARIANTS.BUTTON_TEXT}
                      noWrap
                      uppercase
                    >
                      {page}
                    </Typography>
                  }
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer_divider} />

        <FooterDocuments />
      </div>
    </footer>
  );
};
