/* eslint-disable no-tabs */
import React from 'react';
import { Formik, Form } from 'formik';
import { Input, Button, Grid, Segment, Message } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import style from './auth.module.css';
import { signIn } from '../../api/auth-api';
import { SigninSchema } from './validationSchema';

const SignIn = () => (
  <div>
    <Grid className="Auth" centered verticalAlign="middle">
      <Grid.Column className="Form" width={8}>
        <Segment>
          <Formik
            initialValues={{
              email: '', password: '',
            }}
            validationSchema={SigninSchema}
            onSubmit={(values, actions) => {
              signIn(values)
                .then(() => {
                  window.location = '/';
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
                <div className="Message Red">{errors.message}</div>
                <Button
                  fluid
                  size="large"
                  color="black"
                  type="submit"
                  disabled={!isValid}
                >
										Login
                </Button>
              </Form>
            )}
          </Formik>
        </Segment>
        <Message className="Message">
					New to us?
          <Link to="/auth/signup/"> Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);
export default SignIn;
