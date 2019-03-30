import React from 'react';
import { Formik, Form } from 'formik';
import { Input, Button, Grid } from 'semantic-ui-react';
import styles from './profileForms.module.css';
import http from '../../../api/http';
import { PasswordResetSchema } from './profileValidationSchema';
import { ErrorHandling,
  SuccessHandling } from '../../toasters/MessagesHandling';

const PasswordForm = () => (
  <Grid centered verticalAlign="middle">
    <Grid.Column>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          repeatNewPassword: '',
        }}
        validationSchema={PasswordResetSchema}
        onSubmit={(values, actions) => {
          http
            .put('/api/profile/updatePassword', {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            })
            .then((res) => {
              SuccessHandling('Password changed!');
              values.oldPassword = '';
              values.newPassword = '';
              values.repeatNewPassword = '';
              actions.setSubmitting(false);
            })
            .catch((error) => {
              if (error.response.status === 500) {
                ErrorHandling('Server is down. Please try again later.');
              } else {
                ErrorHandling(error.response.data.message);
              }
              values.oldPassword = '';
              values.newPassword = '';
              values.repeatNewPassword = '';
              actions.setSubmitting(false);
            });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          isValid,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <label htmlFor="OldPassword">Old password</label>
            <Input
              className={`${styles.inputWrapper} ${
                touched.oldPassword && errors.oldPassword
                  ? styles.InputError
                  : ''
              }`}
              id="OldPassword"
              fluid
              placeholder="Old password"
              type="password"
              name="oldPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.oldPassword}
            />
            <div className={styles.Error}>
              {touched.oldPassword && errors.oldPassword}
            </div>
            <label htmlFor="NewPassword">New password</label>
            <Input
              className={`${styles.inputWrapper} ${
                touched.newPassword && errors.newPassword
                  ? styles.InputError
                  : ''
              }`}
              id="NewPassword"
              fluid
              placeholder="New password"
              type="password"
              name="newPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
            />
            <div className={styles.Error}>
              {touched.newPassword && errors.newPassword}
            </div>
            <label htmlFor="RepeatNewPassword">Repeat new password</label>
            <Input
              className={`${styles.inputWrapper} ${
                touched.repeatNewPassword && errors.repeatNewPassword
                  ? styles.InputError
                  : ''
              }`}
              id="RepeatNewPassword"
              fluid
              placeholder="Repeat new password"
              type="password"
              name="repeatNewPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repeatNewPassword}
            />
            <div className={styles.Error}>
              {touched.repeatNewPassword && errors.repeatNewPassword}
            </div>
            <Button
              className={styles.profileBtn}
              size="large"
              color="green"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Grid.Column>
  </Grid>
);

export default PasswordForm;
