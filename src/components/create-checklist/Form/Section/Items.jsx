import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import { FieldArray } from 'formik';
import Item from './Item';
import styles from './css/Section.module.css';

const Items = (props) => {
  const {
    section,
    sectionIndex,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = props;

  return (
    <FieldArray
      name={`sections_data.${sectionIndex}.items_data`}
      render={nestedArrayHelpers => (
        <div className={styles.item_wrapper}>
          {section.items_data.map((item, itemIndex) => (
            <Segment
              className={styles.item}
              key={item._id}
            >
              <Item
                sectionIndex={sectionIndex}
                itemIndex={itemIndex}
                nestedArrayHelpers={nestedArrayHelpers}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
            </Segment>
          ))}

          <Button
            className={styles.add_item}
            inverted
            color="green"
            type="button"
            onClick={() => nestedArrayHelpers.push({
              _id: Math.random(),
              item_title: '',
              description: '',
              details: '',
              tags: [],
              priority: '',
            })}
          >
            Add Item
          </Button>
        </div>
      )}
    />
  );
};

Items.propTypes = {
  section: PropTypes.object.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default Items;
