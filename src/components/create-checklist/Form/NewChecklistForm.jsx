import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Formik, FieldArray } from 'formik';
import styles from './NewCheckListForm.module.css';
import ChecklistSchema from './utils/ChecklistSchema';
import createChecklist from '../../../api/http';
import ChecklistItem from './CheckListItem/CheckListItem';
import CheckListTitle from './CheckListTitle/CheckListTitle';

const NewChecklistForm = ({ history }) => (
  <Grid centered>
    <Grid.Row as="section">
      <Grid.Column width={6}>
        <Formik
          initialValues={{
            title: '',
            items_data: [{
              item_title: '',
              description: '',
              details: '',
              tags: [],
              priority: '',
            }],
          }}

          validationSchema={ChecklistSchema}

          onSubmit={values => createChecklist(values)
            .then((res) => {
              history.push(`/home/${res.data._id}`);
            })}

          render={({
            values,
            handleChange,
            setFieldValue,
            setFieldTouched,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <CheckListTitle
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <FieldArray
                name="items_data"
                render={arrayHelpers => (
                  <div className={styles.section_container}>
                    {values.items_data.map((el, index) => (
                      <ChecklistItem
                        key={index.toString()}
                        index={index}
                        arrayHelpers={arrayHelpers}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    ))}

                    <Button
                      className={styles.add_section}
                      icon="add"
                      type="button"
                      title="Add a New Section"
                      onClick={() => arrayHelpers.push({
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
              <div>
                <Button primary fluid type="submit" disabled={!isValid || isSubmitting}>Submit</Button>
              </div>
            </Form>
          )}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default NewChecklistForm;
