import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import ChecklistSchema from './utils/ChecklistSchema';
import createChecklistReq from '../../../api/checklist-api';
import CheckListTitle from './CheckListTitle/CheckListTitle';
import { ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import Section from './Section/Section';

const NewChecklistForm = ({ history }) => (
  <Grid centered>
    <Grid.Row as="section">
      <Grid.Column width={6}>
        <Formik
          initialValues={{
            title: '',
            sections_data: [{
              section_title: '',
              items_data: [{
                item_title: '',
                description: '',
                details: '',
                tags: [],
                priority: '',
              }],
            }],
          }}

          validationSchema={ChecklistSchema}

          onSubmit={(values, actions) => {
            createChecklistReq(values)
              .then((res) => {
                history.push(`/home/${res.data._id}`);
              })
              .catch((error) => {
                if (error.response.status === 500) {
                  ErrorHandling('Server is down. Please try again later.');
                } else {
                  ErrorHandling(error.response.data.message);
                }
                actions.setSubmitting(false);
              });
          }}

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

              <Section
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              <Button primary fluid type="submit" disabled={isSubmitting || !isValid}>Submit</Button>
              <MessageContainer />

            </Form>
          )}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default NewChecklistForm;
