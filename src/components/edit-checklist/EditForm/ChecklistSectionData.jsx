import React from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import { FieldArray } from 'formik';
import SectionTitle from './SectionTitle';
import ChecklistItems from './ChecklistItems';
import styles from '../../create-checklist/Form/Section/css/Section.module.css';

const ChecklistSectionData = (props) => {
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
          {values.sections_data.map((section, sectionIndex) => (
            <Segment
              className={styles.items}
              key={section._id}
            >
              {!!sectionIndex && (
                <p className={styles.number}>
                  Section #
                  {sectionIndex + 1}
                </p>
              )}

              <SectionTitle
                section={section}
                checklistData={section.section_title}
                sectionIndex={sectionIndex}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />

              <ChecklistItems
                section={section}
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
                  onClick={() => arrayHelpers.remove(sectionIndex)}
                />
              )}
            </Segment>
          ))}

          <Button
            className={styles.add_section}
            icon="add"
            type="button"
            color="teal"
            title="Add Section"
            onClick={() => arrayHelpers.push({
              _id: Math.random().toString(),
              section_title: '',
              items_data: [{
                _id: Math.random().toString(),
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

ChecklistSectionData.propTypes = {
  values: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

export default ChecklistSectionData;
