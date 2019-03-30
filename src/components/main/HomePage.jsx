import React from 'react';
import styles from './HomePage.module.css';
import Header from './Header';
import MainContent from './MainContent';

const HomePage = () => (
  <div className={styles.home_page}>
    <Header />
    <MainContent />
  </div>
);

export default HomePage;
