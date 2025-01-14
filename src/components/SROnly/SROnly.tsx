import React from 'react';

import styles from './SROnly.module.scss';

export const SROnly = ({ children }: React.PropsWithChildren) => {
  return <span className={styles.srOnly}>{children}</span>;
};
