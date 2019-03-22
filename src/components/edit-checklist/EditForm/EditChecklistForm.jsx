import React from 'react';
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

class EditCheckListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      checklistData: initialValues,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const slugOfChecklist = match.params.slug;

    getChecklist(slugOfChecklist)
      .then(res => this.setState({ checklistData: res.data, loading: false }));
  }

  render() {
    const { loading, checklistData } = this.state;
    const { history, match } = this.props;
    const { title, isPrivate, sections_data } = checklistData;
    const checklistSlug = match.params.slug;

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
          initialValues={{ title, isPrivate, sections_data }}
          validationSchema={checklistSchema}
          onSubmit={(values, actions) => {
            updateChecklist(checklistSlug, values)
              .then(res => history.push(`/${res.data.list.slug}`))
              .catch((error) => {
                if (!error.response) {
                  ErrorHandling('Can\'t connect to server. Please try again later.');
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
              <Button primary fluid type="submit" disabled={isSubmitting || !isValid}>
                  Submit
              </Button>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default EditCheckListForm;
