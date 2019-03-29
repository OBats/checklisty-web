import React from 'react';
import searchImg from './search.png';
import styles from './NotFoundResult.module.css';

const NotFoundResult = ({ searchText }) => (
  <div className={styles.notFoundContainer}>
    <div className={styles.notFoundIcon}>
      <img src={searchImg} alt="search-icon" />
    </div>
    <span className={styles.text}>
      {'No results found for'}
      <span className={styles.notFoundText}>
        {`"${searchText}"`}
      </span>
      {'please try again!'}
    </span>
  </div>
);

export default NotFoundResult;
