import React, { useState, useEffect } from 'react';
import { Form, Button, Icon, Segment, Checkbox } from 'semantic-ui-react';
import { Formik } from 'formik';
import { checklistSchema } from '../../create-checklist/Form/utils/validationSchemas';
import { getChecklist, updateChecklist } from '../../../api/checklist-api';
import ChecklistTitle from './ChecklistTitle';
import { ErrorHandling } from '../../toasters/MessagesHandling';
import styles from './css/EditChecklistForm.module.css';
import ChecklistSectionData from './ChecklistSectionData';
import loader from '../../main/loader.module.css';
import initialValues from './initialValues';

const EditCheckListForm = (props) => {
  const [loading, setLoading] = useState(true);
  const [checklistData, setChecklistData] = useState(initialValues);
  let teamId;

  if (props.location.query) teamId = props.location.query.teamId;

  useEffect(() => {
    const slugOfChecklist = props.match.params.slug;
    getChecklist(slugOfChecklist)
      .then((res) => {
        setChecklistData(res.data);
        setLoading(false);
      });
  }, []);

  const handleSubmiting = (values, actions) => {
    const checklistSlug = props.match.params.slug;
    values.teamId = teamId;
    updateChecklist(checklistSlug, values)
      .then(res => (values.teamId ? props.history.push(`/profile/myteam/${values.teamId}/${res.data.list.slug}`) : props.history.push('/profile/mylists')))
      .catch((error) => {
        if (!error.response) {
          ErrorHandling('Can\'t connect to server. Please try again later.');
        } else {
          ErrorHandling(error.response.data.message);
        }
        actions.setSubmitting(false);
      });
  };

  const { title, isPrivate, sections_data } = checklistData;

  if (loading) {
    return (
      <div className={loader.loader}>
        {'Loading...'}
      </div>
    );
  }

  return (
    <div className={styles.main_form_container}>
      <Formik
        initialValues={{ title, isPrivate: teamId ? true : isPrivate, sections_data }}
        validationSchema={checklistSchema}
        onSubmit={(values, actions) => handleSubmiting(values, actions)}
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
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              titleValue={checklistData.title}
            />
            <ChecklistSectionData
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
            <Button primary fluid type="submit" disabled={isSubmitting || !isValid}>
                Submit
            </Button>
          </Form>
        )}
      />
    </div>
  );
};

export default EditCheckListForm;
