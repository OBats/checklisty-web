import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Link from 'react-router-dom/Link';
import { Input,
  Button,
  Grid,
  Segment,
  Message,
  Header,
  Divider } from 'semantic-ui-react';
import style from './css/auth.module.css';
import styleBlocks from './css/twoBlockFields.module.css';
import { signUp } from '../../../api/auth-api';
import { SignupSchema } from './validationSchema';
import { saveUserData } from '../../../actions/user';
import { ErrorHandling,
  MessageContainer } from '../../toasters/MessagesHandling';
import PasswordInput from '../../showPassword/PasswordInput';
import SocialAuthentication from '../social-auth/SocialAuthentication';

const SignUp = ({ loggedUser, saveUserData }) => {
  if (!loggedUser) {
    return (
      <div>
        <Grid className={style.Auth} centered verticalAlign="middle">
          <Grid.Column className={style.Form} width={15}>
            <Segment raised>
              <Header textAlign="center" size="huge">
                {'Sign Up'}
                <Header.Subheader
                  size="small"
                  color="grey"
                  className={style.subheader}
                >
                  {'Become our member with:'}
                </Header.Subheader>
              </Header>
              <SocialAuthentication />
              <Divider horizontal>
                <Header as="h4">or</Header>
              </Divider>
              <Formik
                initialValues={{
                  firstname: '',
                  lastname: '',
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                  const obj = values;
                  delete obj.confirmPassword;
                  signUp(obj)
                    .then((data) => {
                      saveUserData(data);
                    })
                    .catch((error) => {
                      values.password = '';
                      values.confirmPassword = '';
                      if (!error.response || error.response.status === 500) {
                        ErrorHandling(
                          'Server is down. Please try again later.',
                        );
                      } else {
                        ErrorHandling(
                          error.response.data.username
                            || error.response.data.email,
                        );
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
                    <div className={styleBlocks.fullBlock}>
                      <div className={styleBlocks.leftBlock}>
                        <Input
                          className={
                            touched.firstname && errors.firstname
                              ? style.InputError
                              : style.Input
                          }
                          required
                          fluid
                          placeholder="Firstname"
                          type="text"
                          name="firstname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstname}
                        />
                        {touched.firstname && errors.firstname && (
                          <div className={style.Error}>
                            {touched.firstname && errors.firstname}
                          </div>
                        )}
                      </div>

                      <div className={styleBlocks.rightBlock}>
                        <Input
                          className={
                            touched.lastname && errors.lastname
                              ? style.InputError
                              : style.Input
                          }
                          required
                          fluid
                          placeholder="Lastname"
                          type="text"
                          name="lastname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastname}
                        />
                        {touched.lastname && errors.lastname && (
                          <div className={style.Error}>
                            {touched.lastname && errors.lastname}
                          </div>
                        )}
                      </div>
                    </div>

                    <Input
                      className={
                        touched.username && errors.username
                          ? style.InputError
                          : style.Input
                      }
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
                    {touched.username && errors.username && (
                      <div className={style.Error}>
                        {touched.username && errors.username}
                      </div>
                    )}
                    <Input
                      className={
                        touched.email && errors.email
                          ? style.InputError
                          : style.Input
                      }
                      touched={touched}
                      errors={errors}
                      required
                      icon="mail"
                      iconPosition="left"
                      fluid
                      placeholder="Email"
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <div className={style.Error}>
                        {touched.email && errors.email}
                      </div>
                    )}

                    <PasswordInput
                      touched={touched.password}
                      errors={errors.password}
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    {touched.password && errors.password && (
                      <div className={style.Error}>
                        {touched.password && errors.password}
                      </div>
                    )}
                    <PasswordInput
                      touched={touched.confirmPassword}
                      errors={errors.confirmPassword}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={values.confirmPassword}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className={style.Error}>
                        {touched.confirmPassword && errors.confirmPassword}
                      </div>
                    )}

                    <MessageContainer />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
