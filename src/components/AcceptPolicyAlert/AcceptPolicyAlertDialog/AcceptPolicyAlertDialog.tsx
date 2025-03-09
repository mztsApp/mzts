'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
} from '@radix-ui/react-alert-dialog';
import React from 'react';

import type { DocumentDataType } from '@/components/Footer/api/getDocumentsQuery';
import { Button } from '@/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_COMPONENTS,
  BUTTON_VARIANTS,
} from '@/components/Button/Button.constants';
import { Typography } from '@/components/Typography/Typography.server';
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import CheckIcon from '@/assets/icons/check.svg';
import LogoIcon from '@/assets/icons/mztsDesktop.svg';
import { ALLOWED_BREAKPOINTS, useMedia } from '@/hooks/useMedia';

import styles from './AcceptPolicyAlertDialog.module.scss';
import { useHandleClientConsentWithCookies } from './hooks/useHandleClientConsentWithCookies';

export const AcceptPolicyAlertDialog = ({
  cookies,
  privacyPolicy,
}: DocumentDataType) => {
  const { isConsented, saveConsent } = useHandleClientConsentWithCookies();

  const isTablet = useMedia(ALLOWED_BREAKPOINTS.MIN_MD);

  return (
    <AlertDialog defaultOpen open={!isConsented}>
      <AlertDialogOverlay className={styles.dialogOverlay} />
      <AlertDialogPortal>
        <AlertDialogContent className={styles.dialog}>
          <div className={styles.dialog_content}>
            <div className={styles.dialog_contentInner}>
              <Typography
                as={TYPOGRAPHY_COMPONENTS.H1}
                variant={TYPOGRAPHY_VARIANTS.H4}
                color={TYPOGRAPHY_COLORS.TEXT}
              >
                Polityka prywantości i Polityka cookies
              </Typography>

              <Typography>
                Aby przejść dalej musisz zaakeptować naszą{' '}
                <Button
                  as={BUTTON_COMPONENTS.ANCHOR}
                  color={BUTTON_COLORS.TEXT_COLOR}
                  variant={BUTTON_VARIANTS.TEXT}
                  href={`https:${cookies?.file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  politykę cookies
                </Button>{' '}
                i
                <Button
                  as={BUTTON_COMPONENTS.ANCHOR}
                  color={BUTTON_COLORS.TEXT_COLOR}
                  variant={BUTTON_VARIANTS.TEXT}
                  href={`https:${privacyPolicy?.file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Politykę prywantości
                </Button>
              </Typography>
            </div>

            <LogoIcon className={styles.dialog_logo} />
          </div>

          <AlertDialogAction asChild className={styles.dialog_button}>
            <Button
              type="button"
              color={BUTTON_COLORS.TEXT_COLOR}
              EndIcon={<CheckIcon />}
              onClick={saveConsent}
            >
              {isTablet ? 'Akceputję i przechodzę dalej' : 'Akceptuję'}
            </Button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
