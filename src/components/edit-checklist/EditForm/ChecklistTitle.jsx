import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import styles from '../../create-checklist/Form/CheckListTitle/CheckListTitle.module.css';

const ChecklistTitle = (props) => {
  const { handleBlur, handleChange, values } = props;

  return (
    <div className={styles.title_container}>
      <input
        value={values.title}
        className={styles.title}
        name="title"
        id="checklist_title"
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        required
      />
      <label className={styles.label}>
        <span className={styles.span}>Checklist title...</span>
      </label>

      <span className={styles.error_title}>
        <ErrorMessage name="title" />
      </span>
    </div>
  );
};

ChecklistTitle.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ChecklistTitle;
