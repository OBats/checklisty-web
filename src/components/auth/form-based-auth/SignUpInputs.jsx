import React from 'react';
import { Input } from 'semantic-ui-react';
import style from './css/auth.module.css';
import PasswordInput from '../../showPassword/PasswordInput';
import styleBlocks from './css/twoBlockFields.module.css';

const SignUpInputs = (props) => {
  const { values, handleChange, handleBlur, errors, touched } = props;

  return (
    <>
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
    </>
  );
};

export default SignUpInputs;
