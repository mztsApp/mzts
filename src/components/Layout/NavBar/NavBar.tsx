import styles from './NavBar.module.scss';
import { NavContact } from './NavContact/NavContact';

export const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <NavContact />

      <nav className={styles.navBar_contentContainer}></nav>
    </div>
  );
};
