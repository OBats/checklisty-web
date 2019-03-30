import React, { useState } from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';
import styles from './PasswordInput.module.css';

const PasswordInput = (props) => {
  const [passwordIsMasked, setIsMasked] = useState(true);

  const togglePasswordMask = (e) => {
    e.preventDefault();
    setIsMasked(!passwordIsMasked);
  };

  const { id, handleChange, handleBlur, name, placeholder, value, touched, errors } = props;

  return (
    <div className={styles.passwordWrapper}>
      <Input
        id={id}
        className={
          touched && errors ? styles.passwordInputError : styles.passwordInput
        }
        value={value}
        required
        icon="lock"
        iconPosition="left"
        placeholder={placeholder}
        type={passwordIsMasked ? 'password' : 'text'}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        fluid
      />
      <Button
        basic
        onClick={togglePasswordMask}
        size="big"
        className={styles.passwordMask}
        type="button"
      >
        <Icon
          name={passwordIsMasked ? 'eye slash' : 'eye'}
          className={styles.passwordIcon}
        />
      </Button>
    </div>
  );
};

export default PasswordInput;
