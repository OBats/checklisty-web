import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Grid, Segment, Message, Header, Divider } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import style from './css/auth.module.css';
import { signIn } from '../../../api/auth-api';
import { SigninSchema } from './validationSchema';
import { saveUserData } from '../../../actions/user';
import { ErrorHandling } from '../../toasters/MessagesHandling';
import SocialAuthentication from '../social-auth/SocialAuthentication';
import SignInInputs from './SignInInputs';
import { SignInInitial } from './initialValues';

const SignIn = ({ loggedUser, saveUserData }) => {
  const handleSubmiting = (values, actions) => {
    signIn(values)
      .then((data) => {
        saveUserData(data);
        actions.setSubmitting(false);
      })
      .catch((error) => {
        values.password = '';
        if (error.response) {
          ErrorHandling(error.response.data.message);
        } else {
          ErrorHandling('Server is down. Please try again later.');
        }
        actions.setSubmitting(false);
      });
  };

  if (!loggedUser) {
    return (
      <div>
        <Grid className={style.Auth} centered verticalAlign="middle">
          <Grid.Column className={style.Form} width={15}>
            <Segment raised>
              <Header textAlign="center" size="huge">
                {'Sign In'}
                <Header.Subheader
                  size="small"
                  color="grey"
                  className={style.subheader}
                >
                  {'Connect our website using:'}
                </Header.Subheader>
              </Header>
              <SocialAuthentication />
              <Divider horizontal>
                <Header as="h4">or</Header>
              </Divider>
              <Formik
                initialValues={SignInInitial}
                validationSchema={SigninSchema}
                onSubmit={(values, actions) => handleSubmiting(values, actions)}
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
                    <SignInInputs
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      handleSubmit={handleSubmit}
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      isSubmitting={isSubmitting}
                    />
                    <Button
                      loading={isSubmitting}
                      className={style.AuthBtn}
                      content="Sign In"
                      fluid
                      size="large"
                      color="black"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    />
                    <div className={style.forgotPassword}>
                      <Link to="/auth/forgot-password/">Forgot Password?</Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </Segment>
            <Message className={style.Message}>
              New to us?
              <Link to="/auth/signup/"> Sign Up</Link>
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
)(SignIn);
