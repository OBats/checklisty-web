import React from 'react';
import searchImg from './search.png';
import styles from './NotFound.module.css';

const NotFound = (props) => {
  const { notFound } = props;
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundIcon}>
        <img src={searchImg} alt="search-icon" />
      </div>
      <span className={styles.text}>
        {'No results found for'}
        <span className={styles.notFoundText}>
          {`"${notFound}"`}
        </span>
        {'please try again!'}
      </span>
    </div>
  );
};
export default NotFound;
