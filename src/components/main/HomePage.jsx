import React from 'react';
import { Container } from 'semantic-ui-react';
import styles from './HomePage.module.css';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import MainChecklistBlock from '../checklist/MainChecklistBlock';

const HomePage = () => (
  <Container fluid className={styles.home_page}>
    <Header />
    <MainContent />
    <MainChecklistBlock />
    <Footer />
  </Container>
);

export default HomePage;
