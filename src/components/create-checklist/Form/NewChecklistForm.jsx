import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Segment, Checkbox } from 'semantic-ui-react';
import { Formik } from 'formik';
import checklistSchema from './utils/ChecklistSchema';
import createChecklistReq from '../../../api/checklist-api';
import ChecklistTitle from './CheckListTitle/CheckListTitle';
import { ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import Section from './Section/Section';
import styles from './NewCheckListForm.module.css';

const NewChecklistForm = ({ history }) => (
  <div className={styles.main_form_container}>
    <Formik
      initialValues={{
        title: '',
        isPrivate: false,
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
        createChecklistReq(values)
          .then(res => history.push(`/checklist/${res.data.slug}`))
          .catch((error) => {
            if (!error.response || error.response.status === 500) {
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
          <Segment color="blue">
            <Icon color="green" className={styles.icon} name="lock" />
            <Checkbox
              fitted
              label="Make list private"
              name="isPrivate"
              toggle
              checked={!!values.isPrivate}
              onChange={(e, { name, checked }) => setFieldValue(name, !!checked)}
            />
          </Segment>

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
