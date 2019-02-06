/* eslint-disable no-tabs */
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../../App.css';
import { Input, Button, Grid, Segment, Message } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import { signIn } from '../../api/auth-api';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email, please input correct data')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Invalid password, please input correct data')
    .max(15, 'Invalid password, please input correct data')
    .required('Password is required'),
});

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
            onSubmit={values => signIn(values)}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              isSubmitting,
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
                {touched.email && errors.email}
                <br />
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
                {touched.password && errors.password}
                <br />
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
