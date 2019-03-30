import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Link from 'react-router-dom/Link';
import { Button, Grid, Segment, Message, Header, Divider } from 'semantic-ui-react';
import style from './css/auth.module.css';
import { signUp } from '../../../api/auth-api';
import { SignupSchema } from './validationSchema';
import { saveUserData } from '../../../actions/user';
import { ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import SocialAuthentication from '../social-auth/SocialAuthentication';
import SignUpInputs from './SignUpInputs';
import { SignUpInitial } from './initialValues';

const SignUp = ({ loggedUser, saveUserData }) => {
  const handleSubmiting = (values, actions) => {
    const obj = values;
    delete obj.confirmPassword;
    signUp(obj)
      .then((data) => {
        saveUserData(data);
        actions.setSubmitting(false);
      })
      .catch((error) => {
        values.password = '';
        values.confirmPassword = '';
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
                initialValues={SignUpInitial}
                validationSchema={SignupSchema}
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
                    <SignUpInputs
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      handleSubmit={handleSubmit}
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      isSubmitting={isSubmitting}
                    />
                    <MessageContainer />
                    <Button
                      loading={isSubmitting}
                      className={style.AuthBtn}
                      fluid
                      content="Sign Up"
                      size="large"
                      color="black"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    />
                  </Form>
                )}
              </Formik>
            </Segment>
            <Message className={style.Message}>
              Already Signed Up?
              <Link to="/auth/signin/"> Sign In</Link>
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
