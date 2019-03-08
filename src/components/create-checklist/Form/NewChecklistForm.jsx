import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import checklistSchema from './utils/checklistSchema';
import createChecklistReq from '../../../api/checklist-api';
import ChecklistTitle from './ChecklistTitle/ChecklistTitle';
import { ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import Section from './Section/Section';
import styles from './NewChecklistForm.module.css';

const NewChecklistForm = ({ history }) => (
  <div className={styles.main_form_container}>
    <Formik
      initialValues={{
        title: '',
        sections_data: [{
          _id: Math.random(),
          section_title: '',
          items_data: [{
            _id: Math.random(),
            item_title: '',
            description: '',
            details: '',
            tags: [],
            priority: '',
          }],
        }],
      }}

      validationSchema={checklistSchema}

      onSubmit={(values, actions) => {
        values.sections_data.map((section) => {
          delete section._id;
          return (
            section.items_data.map(item => delete item._id)
          );
        });
        createChecklistReq(values)
          .then(res => history.push(`/checklist/${res.data.slug}`))
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
        <Form
          className={styles.main_form}
          onSubmit={handleSubmit}
        >

          <ChecklistTitle
            handleBlur={handleBlur}
            handleChange={handleChange}
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
  </div>
);

NewChecklistForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewChecklistForm;
