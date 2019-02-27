import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { ErrorMessage } from 'formik';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import makeAnimated from 'react-select/lib/animated';
import Accordion from '../Accordion/Accordion';
import { tagsOptions, priorityOptions } from '../utils/SelectOptions';
import styles from './css/Item.module.css';

const Item = (props) => {
  const {
    sectionIndex,
    itemIndex,
    nestedArrayHelpers,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = props;

  return (
    <div className={styles.section}>
      {!!itemIndex && (
        <div className={styles.item_header}>

          <p className={styles.item_number}>
            Item #
            {itemIndex + 1}
          </p>

          <Button
            className={styles.remove_item}
            color="red"
            icon="remove"
            type="button"
            title="Remove Item"
            onClick={() => nestedArrayHelpers.remove(itemIndex)}
          />

        </div>
      )}

      <Form.Input
        required
        id={`item_title-${itemIndex}`}
        name={`sections_data.${sectionIndex}.items_data.${itemIndex}.item_title`}
        label="Item title:"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <span className={styles.error}>
        <ErrorMessage name={`sections_data.${sectionIndex}.items_data.${itemIndex}.item_title`} />
      </span>

      <Form.TextArea
        required
        rows="2"
        id={`section_desc-${itemIndex}`}
        label="Item description:"
        name={`sections_data.${sectionIndex}.items_data.${itemIndex}.description`}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <span className={styles.error}>
        <ErrorMessage name={`sections_data.${sectionIndex}.items_data.${itemIndex}.description`} />
      </span>

      <CreatableSelect
        className={styles.select}
        isMulti
        name={`sections_data.${sectionIndex}.items_data.${itemIndex}.tags`}
        options={tagsOptions}
        components={makeAnimated()}
        placeholder="Choose tags..."
        closeMenuOnSelect={false}
        onBlur={() => setFieldTouched(`sections_data.${sectionIndex}.items_data.${itemIndex}.tags`)}
        onChange={
          value => setFieldValue(`sections_data.${sectionIndex}.items_data.${itemIndex}.tags`,
            value.map(item => item.value))
        }
      />
      <span className={styles.error}>
        <ErrorMessage name={`sections_data.${sectionIndex}.items_data.${itemIndex}.tags`} />
      </span>

      <Select
        className={styles.select}
        name={`sections_data.${sectionIndex}.items_data.${itemIndex}.priority`}
        options={priorityOptions}
        placeholder="Choose priority..."
        onBlur={() => setFieldTouched(`sections_data.${sectionIndex}.items_data.${itemIndex}.priority`)}
        onChange={value => setFieldValue(`sections_data.${sectionIndex}.items_data.${itemIndex}.priority`, value.value)}
      />
      <span className={styles.error}>
        <ErrorMessage name={`sections_data.${sectionIndex}.items_data.${itemIndex}.priority`} />
      </span>

      <Accordion
        name={`sections_data.${sectionIndex}.items_data.${itemIndex}.details`}
        onBlur={handleBlur}
        onChange={handleChange}
      />

    </div>
  );
};

export default Item;
