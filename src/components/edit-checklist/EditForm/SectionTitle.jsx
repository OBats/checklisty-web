import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { ErrorMessage } from 'formik';
import styles from '../../create-checklist/Form/Section/css/Title.module.css';

const SectionTitle = (props) => {
  const {
    section,
    sectionIndex,
    handleBlur,
    handleChange,
  } = props;

  return (
    <div className={styles.title_container}>

      <Form.Input
        value={section.section_title}
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

SectionTitle.propTypes = {
  sectionIndex: PropTypes.number.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SectionTitle;
