'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import React from 'react';

import type { SinglePageType } from '@/api/appNavigationQuery';
import {
  TYPOGRAPHY_COMPONENTS,
  TYPOGRAPHY_VARIANTS,
} from '@/components/Typography/Typography.constants';
import { Typography } from '@/components/Typography/Typography.server';
import { ALLOWED_BREAKPOINTS, useMedia } from '@/hooks/useMedia';

import CloseIcon from '/src/assets/icons/close.svg';
import MenuIcon from '/src/assets/icons/menu.svg';

import { Button } from '@/components/Button/Button';
import { BUTTON_SIZES } from '@/components/Button/Button.constants';

import type { EventsPageData } from '../SideNavigationApi.types';
import { SideNavigationInnerContent } from '../SideNavigationContent/SideNavigationInnerContent/SideNavigationInnerContent';
import styles from './SideNavigationDialog.module.scss';

type Page = Omit<EventsPageData, 'slug'> & { slug: SinglePageType };

export type SideNavigationDialogProps = {
  pages: Page[];
  currentSlug?: string;
};

export const SideNavigationDialog = (props: SideNavigationDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const isDesktop = useMedia(ALLOWED_BREAKPOINTS.MIN_LG);

  React.useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'clip';
    } else {
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return isDesktop ? (
    <SideNavigationInnerContent {...props} />
  ) : (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <DialogTrigger className={styles.dialogTrigger} asChild>
        <Button size={BUTTON_SIZES.MEDIUM} EndIcon={<MenuIcon />}>
          Zobacz wydarzenia
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className={styles.sideNavigationDialog}>
          <div className={styles.sideNavigationDialog_metaWrapper}>
            <DialogTitle asChild>
              <Typography
                as={TYPOGRAPHY_COMPONENTS.H2}
                variant={TYPOGRAPHY_VARIANTS.H3}
              >
                Wybierz Wydarzenie
              </Typography>
            </DialogTitle>

            <DialogClose className={styles.sideNavigationDialog_closeButton}>
              <CloseIcon
                className={styles.sideNavigationDialog_closeButtonIcon}
              />
            </DialogClose>
          </div>
          <SideNavigationInnerContent {...props} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
