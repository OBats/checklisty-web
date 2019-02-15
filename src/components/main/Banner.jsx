import React from 'react';
import styles from './Banner.module.css';
import logo from './logo.svg';

const Banner = () => (
  <div className={styles.banner}>
    <img src={logo} width={140} alt="Site logo" />
    <h1 className={styles.banner}>Checklists</h1>
  </div>
);

export default Banner;
