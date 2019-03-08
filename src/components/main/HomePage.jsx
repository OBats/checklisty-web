import React from 'react';
import styles from './HomePage.module.css';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

const HomePage = () => (
  <div className={styles.home_page}>
    <Header />
    <MainContent />
    <Footer />
  </div>
);

export default HomePage;
