import React from 'react';
import styles from './Header.module.css';
import Banner from './Banner';

const Header = ({ title, canBeCopied, user, checkList }) => (
  <div className={styles.header_wrapper}>
    <header className={styles.header}>
      <Banner title={title} user={user} checkList={checkList} canBeCopied={canBeCopied} />
    </header>
  </div>
);

export default Header;
