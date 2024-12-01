import styles from './NavBar.module.scss';
import { NavContact } from './NavContact/NavContact';

export const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBar_contact}>
        <NavContact />
      </div>

      <div className={styles.navBar_navigationContainer}>
        <nav className={styles.navigation}>
          <a className={styles.navigation_logo} href="/">
            logo
          </a>

          <button
            type="button"
            arial-label="otwórz/zamknij menu"
            className={styles.navigation_toggleMenuButton}
          >
            menu
          </button>
        </nav>
      </div>
    </div>
  );
};
