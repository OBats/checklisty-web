import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { FieldArray } from 'formik';
import Title from './Title';
import Items from './Items';
import styles from './css/Section.module.css';

const Section = (props) => {
  const {
    values,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = props;

  return (
    <FieldArray
      name="sections_data"
      render={arrayHelpers => (
        <div className={styles.container}>
          {values.sections_data.map((value, sectionIndex) => (
            <Segment
              className={styles.items}
              key={sectionIndex.toString()}
            >

              {!!sectionIndex && (
                <p className={styles.number}>
                  Section #
                  {sectionIndex + 1}
                </p>
              )}

              <Title
                sectionIndex={sectionIndex}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <Items
                value={value}
                sectionIndex={sectionIndex}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              {!!sectionIndex && (
                <Button
                  className={styles.remove_section}
                  color="red"
                  icon="trash alternate"
                  type="button"
                  title="Remove Section"
                  onClick={() => arrayHelpers.remove(sectionIndex)
                  }
                />
              )}
            </Segment>
          ))}

          <Button
            className={styles.add_section}
            icon="add"
            type="button"
            color="teal"
            title="Add New Section"
            onClick={() => arrayHelpers.push({
              section_title: '',
              items_data: [{
                item_title: '',
                description: '',
                details: '',
                tags: [],
                priority: '',
              }],
            })}
          />
        </div>
      )}
    />
  );
};

export default Section;
