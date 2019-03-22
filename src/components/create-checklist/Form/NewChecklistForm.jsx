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

const NewChecklistForm = () => {
  const [slug, setSlug] = useState('');
  const [checklistId, setChecklistId] = useState('');
  const [isOpen, openModal] = useState(false);
  const [defaultSchema, setSchema] = useState(true);

  const onSubmitClick = (values, actions) => {
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

        <CustomUrlModal
          isSubmitting={isSubmitting}
          isValid={isValid}
          isOpen={isOpen}
          slug={slug}
          checklistId={checklistId}
          setSlug={setSlug}
          handleChange={handleChange}
          handleBlur={handleBlur}
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
