import React from 'react';
import { Input } from 'semantic-ui-react';
import style from './css/auth.module.css';
import PasswordInput from '../../showPassword/PasswordInput';

const SignInInputs = (props) => {
  const { values, handleChange, handleBlur, errors, touched } = props;

  return (
    <>
      <Input
        className={touched.email && errors.email ? style.InputError : style.Input}
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
    </>
  );
};

export default SignInInputs;
