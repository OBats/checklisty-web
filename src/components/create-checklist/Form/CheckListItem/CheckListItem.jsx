import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { ErrorMessage } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import Accordion from '../Accordion/Accordion';
import { tagsOptions, priorityOptions } from '../utils/SelectOptions';
import styles from './CheckListItem.module.css';

const ChecklistItem = (props) => {
  const { index, arrayHelpers, onBlur, onChange, setFieldValue, setFieldTouched } = props;

  return (
    <Segment className={styles.section}>
      {!!index && (
        <Button
          className={styles.remove_section}
          color="red"
          icon="trash alternate"
          type="button"
          title="Remove Section"
          onClick={() => arrayHelpers.remove(index)}
        />
      )}

      <Form.Input
        required
        id="section_title"
        name={`items_data.${index}.item_title`}
        label="Section title:"
        onBlur={onBlur}
        onChange={onChange}
      />
      <span className={styles.error}>
        <ErrorMessage name={`items_data.${index}.item_title`} />
      </span>

      <Form.TextArea
        required
        rows="2"
        label="Section description:"
        id="section_desc"
        name={`items_data.${index}.description`}
        onBlur={onBlur}
        onChange={onChange}
      />
      <span className={styles.error}>
        <ErrorMessage name={`items_data.${index}.description`} />
      </span>

      <Select
        className={styles.select}
        name={`items_data.${index}.tags`}
        options={tagsOptions}
        components={makeAnimated()}
        isMulti
        placeholder="Choose tags..."
        closeMenuOnSelect={false}
        onBlur={() => setFieldTouched(`items_data.${index}.tags`)}
        onChange={
          value => setFieldValue(`items_data.${index}.tags`,
            value.map(item => item.value))
        }
      />
      <span className={styles.error}>
        <ErrorMessage name={`items_data.${index}.tags`} />
      </span>

      <Select
        className={styles.select}
        name={`items_data.${index}.priority`}
        options={priorityOptions}
        placeholder="Choose priority..."
        onBlur={() => setFieldTouched(`items_data.${index}.priority`)}
        onChange={value => setFieldValue(`items_data.${index}.priority`, value.value)}
      />
      <span className={styles.error}>
        <ErrorMessage name={`items_data.${index}.priority`} />
      </span>

      <Accordion
        name={`items_data.${index}.details`}
        onBlur={onBlur}
        onChange={onChange}
      />

    </Segment>
  );
};

export default ChecklistItem;
