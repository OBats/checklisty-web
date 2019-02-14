import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Input, Button, Grid, Segment, Message } from 'semantic-ui-react';
import style from './auth.module.css';
import { signUp } from '../../api/auth-api';
import { SignupSchema } from './validationSchema';
import { saveUserData } from '../../actions/user';

const SignUp = props => (
  <div>
    <Grid className="Auth" centered verticalAlign="middle">
      <Grid.Column className="Form" width={8}>
        <Segment>
          <Formik
            initialValues={{
              username: '', email: '', password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              signUp(values)
                .then((data) => {
                  props.saveUserData(data);
                  // window.location = '/';
                })
                .catch(error => (
                  actions.setErrors(error.response.data)
                ));
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
            }) => (
              <Form className="login-form" onSubmit={handleSubmit}>
                <Input
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
                <div className="Error">{touched.username && errors.username}</div>
                <Input
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
                <div className="Error">{touched.email && errors.email}</div>
                <Input
                  required
                  icon="lock"
                  iconPosition="left"
                  fluid
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <div className="Error">{touched.password && errors.password}</div>
                <Button
                  fluid
                  size="large"
                  color="black"
                  type="submit"
                  disabled={!isValid}
                >
                    Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Segment>
        <Message className="Message">
          Already Signed Up?
          <Link to="/auth/signin/"> Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

const mapDispatchToProps = dispatch => ({
  saveUserData: (data) => {
    dispatch(saveUserData(data));
  },
});

export default connect(null, mapDispatchToProps)(SignUp);
