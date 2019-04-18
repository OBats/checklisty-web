import React from 'react';
import CopyList from './copyChecklist/CopyList';
import styles from './Banner.module.css';
import logo from './logo.svg';

const Banner = props => (
  <div className={styles.BannerWrapper}>
    <img src={logo} alt="logo" className={styles.logo} />
    <h1 className={styles.banner}>{props.title ? props.title : 'Checklisty'}</h1>
    {props.canBeCopied && <CopyList user={props.user} checkList={props.checkList} />}
  </div>
);

export default Banner;
