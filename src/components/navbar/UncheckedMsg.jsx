import React from 'react';
import styles from './NavBar.module.css';

const UncheckedMsg = ({ amount }) => {
  if (amount) {
    return (
      <div className={styles.uncheckedAmount}>
        <span>{amount}</span>
      </div>
    );
  }
  return null;
};

export default UncheckedMsg;
