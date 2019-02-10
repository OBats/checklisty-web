import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { tagsOptions, priorityOptions } from './SelectOptions';
import ChecklistSchema from './ChecklistSchema';
import createChecklist from '../../api/checklist-api';

const NewChecklistForm = () => (
  <Grid as="section" centered>
    <Grid.Row>
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

          onSubmit={values => createChecklist(values)}

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
              <Field
                name="title"
                placeholder="Add checklist title"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
              />
              <ErrorMessage name="title" />

              <FieldArray
                name="items_data"
                render={arrayHelpers => (
                  <div>
                    {values.items_data.map((el, index) => (
                      <fieldset key={index.toString()}>
                        <Field
                          name={`items_data.${index}.item_title`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                        />
                        <ErrorMessage name={`items_data.${index}.item_title`} />

                        <Field
                          name={`items_data.${index}.description`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                        />
                        <ErrorMessage name={`items_data.${index}.description`} />

                        <Field
                          name={`items_data.${index}.details`}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          component="textarea"
                        />
                        <ErrorMessage name={`items_data.${index}.details`} />

                        <Select
                          name={`items_data.${index}.tags`}
                          options={tagsOptions}
                          components={makeAnimated()}
                          isMulti
                          onBlur={() => setFieldTouched(`items_data.${index}.tags`)}
                          onChange={
                            value => setFieldValue(`items_data.${index}.tags`,
                              value.map(item => item.value))
                          }
                        />
                        <ErrorMessage name={`items_data.${index}.tags`} />

                        <Select
                          name={`items_data.${index}.priority`}
                          options={priorityOptions}
                          onBlur={() => setFieldTouched(`items_data.${index}.priority`)}
                          onChange={value => setFieldValue(`items_data.${index}.priority`, value.value)}
                        />
                        <ErrorMessage name={`items_data.${index}.priority`} />

                        {!!index && <button type="button" onClick={() => arrayHelpers.remove(index)}>Remove</button>}

                      </fieldset>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push({
                        items_data: [{
                          item_title: '',
                          description: '',
                          details: '',
                          tags: [],
                          priority: '',
                        }],
                      })}
                    >
                        Add New
                    </button>
                  </div>
                )}
              />
              <div>
                <button type="submit" disabled={!isValid || isSubmitting}>Submit</button>
              </div>
            </Form>
          )}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default NewChecklistForm;
