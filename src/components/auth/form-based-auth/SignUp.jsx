import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Link from 'react-router-dom/Link';
import { Input, Button, Grid, Segment, Message, Header, Divider } from 'semantic-ui-react';
import style from './css/auth.module.css';
import { signUp } from '../../../api/auth-api';
import { SignupSchema } from './validationSchema';
import { saveUserData } from '../../../actions/user';
import { ErrorHandling, ErrorContainer } from '../../errors/ErrorsHandling';
import PasswordInput from '../../showPassword/PasswordInput';
import SocialAuthentiation from '../social-auth/SocialAuthentication';

const SignUp = ({ loggedUser, saveUserData }) => {
  if (!loggedUser) {
    return (
      <div>
        <Grid className={style.Auth} centered verticalAlign="middle">
          <Grid.Column className={style.Form} width={8}>
            <Segment raised>
              <Header textAlign="center" size="huge">
                {'Sign Up'}
                <Header.Subheader size="small" color="grey" className={style.subheader}>
                  {'Become our member with:'}
                </Header.Subheader>
              </Header>
              <SocialAuthentiation />
              <Divider horizontal>
                <Header as="h4">or</Header>
              </Divider>
              <Formik
                initialValues={{
                  username: '', email: '', password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                  signUp(values)
                    .then((data) => {
                      saveUserData(data);
                    })
                    .catch((error) => {
                      if (error.response.status === 500) {
                        ErrorHandling('Server is down. Please try again later.');
                      } else {
                        ErrorHandling(error.response.data.username || error.response.data.email);
                      }
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
                    <Input
                      className={touched.username && errors.username ? style.InputError : style.Input}
                      required
                      icon="user"
                      iconPosition="left"
                      fluid
                      placeholder="Username"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    {touched.username && errors.username && <div className={style.Error}>{touched.username && errors.username}</div>}
                    <Input
                      className={touched.email && errors.email ? style.InputError : style.Input}
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
                    {touched.email && errors.email && <div className={style.Error}>{touched.email && errors.email}</div>}
                    <PasswordInput
                      className={touched.password && errors.password ? style.InputError : style.Input}
                      touched={touched}
                      name="password"
                      placeholder="Password"
                      errors={errors}
                      value={values.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    {touched.password && errors.password && <div className={style.Error}>{touched.password && errors.password}</div>}
                    <ErrorContainer />
                    <Button
                      className={style.AuthBtn}
                      fluid
                      size="large"
                      color="black"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    >
                    Sign Up
                    </Button>
                  </Form>
                )}
              </Formik>
            </Segment>
            <Message className={style.Message}>
          Already Signed Up?
              <Link to="/auth/signin/"> Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
  return <Redirect to="/" />;
};

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: (data) => {
    dispatch(saveUserData(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
