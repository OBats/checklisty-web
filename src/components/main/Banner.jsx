import React from 'react';
import logo from './logo.png';
import styles from './Banner.module.css';

const Banner = () => (
  <div className={styles.banner}>
    <img src={logo} width={100} height={100} alt="Site logo" />
    <h1 className={styles.header}>Checklists</h1>
  </div>
);

export default Banner;
