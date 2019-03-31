import React from 'react';
import { Button } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import styles from './css/NotFound404.module.css';
import Footer from '../../main/Footer';

const NotFound404 = () => (
  <>
    <div className={styles.wrapper}>
      <div className={styles.notfound}>
        <div className={styles.notfound404}>
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
        <Link to="/">
          <Button
            content="HOMEPAGE"
            className={styles.btn}
          />
        </Link>
      </div>
    </div>
    <Footer />
  </>
);

export default NotFound404;
