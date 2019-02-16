import React from 'react';
import { ErrorMessage } from 'formik';
import styles from './CheckListTitle.module.css';

const CheckListTitle = (props) => {
  const { onBlur, onChange } = props;

  return (
    <div className={styles.title_container}>
      <input
        required
        autoComplete="off"
        className={styles.title}
        name="title"
        id="checklist_title"
        type="text"
        onBlur={onBlur}
        onChange={onChange}
      />
      <label className={styles.label} htmlFor="checklist_title">
        <span className={styles.span}>Checklist title...</span>
      </label>

      <span className={styles.error_title}>
        <ErrorMessage name="title" />
      </span>
    </div>
  );
};

export default CheckListTitle;
