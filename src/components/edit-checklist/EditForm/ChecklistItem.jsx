import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { ErrorMessage } from 'formik';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import makeAnimated from 'react-select/lib/animated';
import Accordion from '../../create-checklist/Form/Accordion/Accordion';
import { tagsOptions, priorityOptions } from '../../create-checklist/Form/utils/SelectOptions';
import styles from '../../create-checklist/Form/Section/css/Item.module.css';
import setLabel from './setLabel';

const ChecklistItem = (props) => {
  const {
    values,
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
        value={values.item_title}
        required
        className={styles.field}
        id={`sections_data.${sectionIndex}.items_data.${itemIndex}.item_title`}
        name={`sections_data.${sectionIndex}.items_data.${itemIndex}.item_title`}
        label="Item title:"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <span className={styles.error}>
        <ErrorMessage name={`sections_data.${sectionIndex}.items_data.${itemIndex}.item_title`} />
      </span>

      <Form.TextArea
        value={values.description}
        className={styles.field}
        rows="2"
        id={`sections_data.${sectionIndex}.items_data.${itemIndex}.description`}
        label="Item description:"
        name={`sections_data.${sectionIndex}.items_data.${itemIndex}.description`}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <span className={styles.error}>
        <ErrorMessage name={`sections_data.${sectionIndex}.items_data.${itemIndex}.description`} />
      </span>

      <CreatableSelect
        defaultValue={values.tags.map(tag => ({ value: tag, label: tag }))}
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
        defaultValue={{
          value: values.priority,
          label: setLabel(values),
        }}
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
        value={values.details}
        details={values.details}
        name={`sections_data.${sectionIndex}.items_data.${itemIndex}.details`}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />

    </div>
  );
};

ChecklistItem.propTypes = {
  sectionIndex: PropTypes.number.isRequired,
  itemIndex: PropTypes.number.isRequired,
  nestedArrayHelpers: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default ChecklistItem;
