import React, { useState } from 'react';
import { Form, Icon, Segment, Checkbox } from 'semantic-ui-react';
import { Formik } from 'formik';
import { checklistSchema, customUrlSchema } from './utils/validationSchemas';
import initialValues from './utils/initialValues';
import { createChecklist } from '../../../api/checklist-api';
import ChecklistTitle from './CheckListTitle/CheckListTitle';
import { ErrorHandling } from '../../toasters/MessagesHandling';
import Section from './Section/Section';
import CustomUrlModal from './CustomUrlModal/CustomUrlModal';
import styles from './NewCheckListForm.module.css';

const NewChecklistForm = ({ location }) => {
  const [slug, setSlug] = useState('');
  const [checklistId, setChecklistId] = useState('');
  const [isOpen, openModal] = useState(false);
  const [defaultSchema, setSchema] = useState(true);

  const teamId = location.query ? location.query.teamId : undefined;

  const onSubmitClick = (values, actions) => {
    if (teamId) {
      values.teamId = teamId;
      values.isPrivate = true;
    }

    createChecklist(values)
      .then((res) => {
        setSchema(false);
        setChecklistId(res.data._id);
        setSlug(res.data.slug);
        openModal(true);
      })
      .catch((error) => {
        if (error.response) {
          ErrorHandling(error.response.data.message);
        } else {
          ErrorHandling('Server is down. Please try again later.');
        }
        actions.setSubmitting(false);
      });
  };

  const checklistForm = (props) => {
    const {
      values,
      handleChange,
      setFieldValue,
      setFieldTouched,
      handleBlur,
      handleSubmit,
      isValid,
      isSubmitting,
    } = props;

    values.isPrivate = teamId ? true : values.isPrivate;

    return (
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
          <Icon
            color={values.isPrivate ? 'red' : 'green'}
            name={values.isPrivate ? 'lock' : 'unlock'}
            size="large"
            className={styles.icon}
          />
          <Checkbox
            fitted
            label={values.isPrivate ? 'Private' : 'Public'}
            name="isPrivate"
            toggle
            checked={!!values.isPrivate}
            onChange={(e, { name, checked }) => setFieldValue(name, !!checked)}
            disabled={!!teamId}
          />
        </Segment>

        <CustomUrlModal
          isSubmitting={isSubmitting}
          isValid={isValid}
          isOpen={isOpen}
          slug={slug}
          checklistId={checklistId}
          setSlug={setSlug}
          handleChange={handleChange}
          handleBlur={handleBlur}
          query={location.query}
        />
      </Form>
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={defaultSchema ? checklistSchema : customUrlSchema}
      onSubmit={onSubmitClick}
      render={checklistForm}
    />
  );
};

export default NewChecklistForm;
