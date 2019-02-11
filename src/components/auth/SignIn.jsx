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
    <Grid className={style.Auth} centered verticalAlign="middle">
      <Grid.Column className={style.Form} width={8}>
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
              <Form onSubmit={handleSubmit}>
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
                <Input
                  className={touched.password && errors.password ? style.InputError : ''}
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
                <div className={style.Error}>{touched.password && errors.password}</div>
                <div className={style.RedMessage}>{errors.message}</div>
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
        <Message className={style.Message}>
					New to us?
          <Link to="/auth/signup/"> Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);
export default SignIn;
