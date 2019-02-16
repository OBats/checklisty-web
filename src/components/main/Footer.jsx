import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.menu}>
    <span className={styles.fonts}>Made by Lv-379 NodeJS</span>
    <a href="https://github.com/ss-ita/checklisty-web">
      <img
        className={styles.distance}
        src="https://camo.githubusercontent.com/05034eed0515ee94cb8c8829dad9ace1f4e7d79e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f46726f6e74254532253830253931456e645f436865636b6c6973742d666f6c6c6f7765642d627269676874677265656e2e737667"
        alt="Front‑End_Checklisty followed"
        data-canonical-src="https://img.shields.io/badge/Front%E2%80%91End_Checklist-followed-brightgreen.svg"
      />
    </a>
  </footer>
);

export default Footer;
