import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { Button, Grid, Segment, Header } from 'semantic-ui-react';
import style from './css/forgotPassword.module.css';
import { ResetPasswordSchema } from './validationSchema';
import { ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import http from '../../../api/http';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import PasswordInput from '../../showPassword/PasswordInput';

class ResetPassword extends Component {
  state = { token: null, alreadyReset: false }

  componentDidMount() {
    const { history } = this.props;
    if (history.location.search.includes('?recovery-token=')) {
      const token = this.props.history.location.search.substring(16);
      this.setState({ token });
    } else {
      history.push('/auth/signin');
    }
  }

  render() {
    const { token, alreadyReset } = this.state;
    return (
      <Grid className={style.Auth} centered verticalAlign="middle">
        <Grid.Column className={style.Form} width={14}>
          <Segment raised>
            {!alreadyReset ? (
              <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={ResetPasswordSchema}
                onSubmit={(values, actions) => {
                  if (values.password !== values.confirmPassword) {
                    actions.setSubmitting(false);
                    return ErrorHandling('Passwords don\'t match');
                  }
                  if (token) {
                    values.token = token;
                    http.post('/api/auth/reset-password', values)
                      .then(() => {
                        this.setState({ alreadyReset: true });
                      })
                      .catch((error) => {
                        if (error.response) {
                          if (error.response.status === 500) {
                            ErrorHandling('Server is down. Please try again later.');
                          } else {
                            ErrorHandling(error.response.data.message);
                          }
                          actions.setSubmitting(false);
                        }
                      });
                  }
                }}
              >
                {({
                  values, handleChange, handleBlur, handleSubmit, errors, touched, isValid,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Header textAlign="center" size="large">
                      {'Reseting password'}
                      <Header.Subheader color="grey" className={style.subheader}>
                        {'Put your new password down and confirm it using these two fields'}
                      </Header.Subheader>
                    </Header>
                    <PasswordInput
                      className={touched.password && errors.password
                        ? style.InputError : style.Input}
                      touched={touched}
                      name="password"
                      placeholder="Password"
                      errors={errors}
                      value={values.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <div className={style.Error}>{touched.password && errors.password}</div>
                    <PasswordInput
                      className={touched.confirmPassword && errors.confirmPassword
                        ? style.InputError : style.Input}
                      touched={touched}
                      placeholder="Confirm your password"
                      name="confirmPassword"
                      errors={errors}
                      value={values.confirmPassword}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <div className={style.Error}>
                      {touched.confirmPassword && errors.confirmPassword}
                    </div>
                    <MessageContainer />
                    <Button
                      className={style.ForgotPasswordBtn}
                      fluid
                      size="large"
                      color="black"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    >
                      {'Reset Password'}
                    </Button>
                  </Form>
                )}
              </Formik>
            ) : <ResetPasswordSuccess />}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ResetPassword;
