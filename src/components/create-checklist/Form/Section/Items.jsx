import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { FieldArray } from 'formik';
import Item from './Item';
import styles from './css/Section.module.css';

const Items = (props) => {
  const {
    value,
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
          {value.items_data.map((el, itemIndex) => (
            <Segment
              className={styles.item}
              key={itemIndex.toString()}
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

export default Items;
