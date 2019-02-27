import React from 'react';
import { Form } from 'semantic-ui-react';
import { ErrorMessage } from 'formik';
import styles from './css/Title.module.css';

const Title = (props) => {
  const {
    sectionIndex,
    onBlur,
    onChange,
  } = props;

  return (
    <div className={styles.title_container}>

      <Form.Input
        required
        id={`section_title-${sectionIndex}`}
        name={`sections_data.${sectionIndex}.section_title`}
        label="Section title:"
        onBlur={onBlur}
        onChange={onChange}
      />

      <span className={styles.error}>
        <ErrorMessage name={`sections_data.${sectionIndex}.section_title`} />
      </span>

    </div>
  );
};

export default Title;
