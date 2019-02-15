import React from 'react';
import styles from './Header.module.css';
import Banner from './Banner';

const Header = ({ title }) => (
  <div className={styles.header_wrapper}>
    <header className={styles.header}>
      <Banner title={title} />
    </header>
  </div>
);

export default Header;
