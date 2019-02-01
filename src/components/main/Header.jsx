import React from 'react';
import styles from './Header.module.css';
import Banner from './Banner';

const Header = () => (
  <div className={styles.header_wrapper}>
    <header className={styles.header}>
      <Banner />
    </header>
  </div>
);

export default Header;
