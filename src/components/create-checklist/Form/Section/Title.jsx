import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { ErrorMessage } from 'formik';
import styles from './css/Title.module.css';

const Title = (props) => {
  const {
    sectionIndex,
    handleBlur,
    handleChange,
  } = props;

  return (
    <div className={styles.title_container}>

      <Form.Input
        required
        id={`sections_data.${sectionIndex}.section_title`}
        name={`sections_data.${sectionIndex}.section_title`}
        label="Section title:"
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <span className={styles.error}>
        <ErrorMessage name={`sections_data.${sectionIndex}.section_title`} />
      </span>

    </div>
  );
};

Title.propTypes = {
  sectionIndex: PropTypes.number.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Title;
