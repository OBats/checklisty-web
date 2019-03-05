import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { Input, Button, Grid, Segment, Header, Loader } from 'semantic-ui-react';
import style from './css/forgotPassword.module.css';
import { ForgotPasswordSchema } from './validationSchema';
import { ErrorHandling, ErrorContainer } from '../../errors/ErrorsHandling';
import http from '../../../api/http';
import ForgotPasswordSuccess from './ForgotPasswordSuccess';

class ForgotPassword extends Component {
  state = { userEmail: null, isDoingNow: false }

  render() {
    const { userEmail, isDoingNow } = this.state;
    return (
      <Grid className={style.Auth} centered verticalAlign="middle">
        <Grid.Column className={style.Form} width={14}>
          <Segment raised>
            {!userEmail ? (
              <Formik
                initialValues={{ email: '' }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={(values, actions) => {
                  this.setState({ isDoingNow: true });
                  http.post('/api/auth/forgot-password', values)
                    .then((res) => {
                      if (res.status === 200) {
                        this.setState({ userEmail: values.email });
                      }
                      actions.setSubmitting(false);
                    })
                    .catch((error) => {
                      if (error) {
                        if (error.response) {
                          if (error.response.status === 500) {
                            ErrorHandling('Server is down. Please try again later.');
                          } else {
                            ErrorHandling(error.response.data.message);
                          }
                          actions.setSubmitting(false);
                        }
                      }
                      actions.setSubmitting(false);
                      this.setState({ isDoingNow: false });
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
                    <Header textAlign="center" size="large">
                      {'Forgot password?'}
                      <Header.Subheader color="grey" className={style.subheader}>
                        {'Put down your account\'s email and we will send you a message with instructions:'}
                      </Header.Subheader>
                    </Header>
                    <Input
                      className={touched.email && errors.email ? style.InputError : ''}
                      required
                      icon="mail"
                      iconPosition="left"
                      fluid
                      placeholder="Email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <div className={style.Error}>{touched.email && errors.email}</div>
                    <ErrorContainer />
                    <Button
                      className={style.ForgotPasswordBtn}
                      fluid
                      size="large"
                      color="black"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    >
                      {isDoingNow
                        ? <Loader className={style.loaderBtn} size="tiny" active inline inverted />
                        : 'Send me an email!'
                      }
                    </Button>
                  </Form>
                )}
              </Formik>
            ) : <ForgotPasswordSuccess userEmail={userEmail} />}
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ForgotPassword;
