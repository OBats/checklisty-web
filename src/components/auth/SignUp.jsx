import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../../App.css';
import Link from 'react-router-dom/Link';
import { Input, Button, Grid, Segment, Message } from 'semantic-ui-react';
import { signUp } from '../../api/auth-api';


const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Invalid Username, please input correct data')
    .max(15, 'Invalid Username, please input correct data')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email, please input correct data')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Invalid Password, please input correct data')
    .max(15, 'Invalid Password, please input correct data')
    .required('Password is required'),
});

const SignUp = () => (
  <div>
    <Grid className="Auth" centered verticalAlign="middle">
      <Grid.Column className="Form" width={8}>
        <Segment>
          <Formik
            initialValues={{
              username: '', email: '', password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => signUp(values)}
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
                {touched.username && errors.username}
                <br />
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
                {errors.password && touched.password && errors.password}
                <br />
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
export default SignUp;
