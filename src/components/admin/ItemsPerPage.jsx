import React from 'react';
import styles from './ItemsPerPage.module.css';

const ItemsPerPage = ({ setSelectItemsNumber, setActivePage }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setSelectItemsNumber(value);
    setActivePage(1);
  };

  return (
    <div className={styles.selectContainer}>
      <span className={styles.perPageText}>Per page:</span>
      <select className={styles.select} onChange={handleChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
};

export default ItemsPerPage;
