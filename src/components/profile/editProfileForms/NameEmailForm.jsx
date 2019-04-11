import React from 'react';
import { Formik, Form } from 'formik';
import { Input, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveUserData } from '../../../actions/user';
import styles from './profileForms.module.css';
import http from '../../../api/http';
import { NameEmailSchema } from './profileValidationSchema';
import { ErrorHandling,
  SuccessHandling } from '../../toasters/MessagesHandling';

const NameEmailForm = ({ saveUserData, userData }) => (
  <Grid centered verticalAlign="middle">
    <Grid.Column>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          username: '',
          email: '',
        }}
        validationSchema={NameEmailSchema}
        onSubmit={(values, actions) => {
          http
            .put('/api/profile', values)
            .then((res) => {
              saveUserData(res.data.updatedUser);
              values.firstname = '';
              values.lastname = '';
              values.username = '';
              values.email = '';
              SuccessHandling('Profile data updated!');
              actions.setSubmitting(false);
            })
            .catch((error) => {
              if (error.response.status === 500) {
                ErrorHandling('Server is down. Please try again later.');
              } else {
                ErrorHandling(error.response.data.message);
              }
              values.firstname = '';
              values.lastname = '';
              values.username = '';
              values.email = '';
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
          <Form onSubmit={handleSubmit} className={styles.profileForm}>
            <label htmlFor="firstname">New Firstname</label>
            <Input
              className={`${styles.inputWrapper} ${
                touched.firstname && errors.firstname ? styles.InputError : ''
              }`}
              id="firstname"
              fluid
              placeholder={userData.firstname}
              type="text"
              name="firstname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstname}
            />
            <div className={styles.Error}>
              {touched.firstname && errors.firstname}
            </div>
            <label htmlFor="lastname">New Lastname</label>
            <Input
              className={`${styles.inputWrapper} ${
                touched.lastname && errors.lastname ? styles.InputError : ''
              }`}
              id="lastname"
              fluid
              placeholder={userData.lastname}
              type="text"
              name="lastname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
            />
            <div className={styles.Error}>
              {touched.lastname && errors.lastname}
            </div>
            <label htmlFor="username">New Username</label>
            <Input
              className={`${styles.inputWrapper} ${
                touched.username && errors.username ? styles.InputError : ''
              }`}
              id="username"
              fluid
              placeholder={userData.username}
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <div className={styles.Error}>
              {touched.username && errors.username}
            </div>
            <label htmlFor="email">New Email</label>
            <Input
              className={`${styles.inputWrapper} ${
                touched.email && errors.email ? styles.InputError : ''
              }`}
              id="email"
              fluid
              placeholder={userData.email}
              type="text"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div className={styles.Error}>{touched.email && errors.email}</div>
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

const mapDispatchToProps = dispatch => ({
  saveUserData: (data) => {
    dispatch(saveUserData(data));
  },
});
const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps, mapDispatchToProps)(NameEmailForm);
