import React from 'react';
import styles from './Banner.module.css';
import logo from './logo.svg';

const Banner = props => (
  <div className={styles.BannerWrapper}>
    <img src={logo} alt="logo" width={140} />
    <h1 className={styles.banner}>{props.title ? props.title : 'Checklisty'}</h1>
  </div>
);

export default Banner;
