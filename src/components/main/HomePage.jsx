import React from 'react';
import { Container } from 'semantic-ui-react';
import styles from './HomePage.module.css';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

const HomePage = () => (
  <Container fluid className={styles.home_page}>
    <Header />
    <MainContent />
    <Footer />
  </Container>
);

export default HomePage;
