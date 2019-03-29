import React from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';
import styles from './PasswordInputWithConfirmation.module.css';

class PasswordInputWithConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordIsMasked: true,
    };
  }

  togglePasswordMask = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  render() {
    const { passwordIsMasked } = this.state;
    const {
      id,
      handleChange,
      handleBlur,
      name,
      confirmName,
      placeholder,
      placeholderForConfirm,
      value,
      errors,
      errorsConfirm,
      touched,
      touchedConfirm,
      valueForConfirm,
    } = this.props;
    return (
      <div className={styles.passwordWrapper}>
        <Input
          id="maskInput"
          value={value}
          required
          icon="lock"
          iconPosition="left"
          className={
            touched && errors
              ? styles.passwordConfirmInputError
              : styles.passwordInput
          }
          placeholder={placeholder}
          type={passwordIsMasked ? 'password' : 'text'}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          fluid
        />

        <Input
          id={id}
          className={
            touchedConfirm && errorsConfirm
              ? styles.passwordConfirmInputError
              : styles.passwordConfirmInput
          }
          value={valueForConfirm}
          required
          icon="lock"
          iconPosition="left"
          placeholder={placeholderForConfirm}
          type={passwordIsMasked ? 'password' : 'text'}
          name={confirmName}
          onChange={handleChange}
          onBlur={handleBlur}
          fluid
        />

        <Button
          basic
          onClick={this.togglePasswordMask}
          size="big"
          className={styles.passwordConfirmMask}
          type="button"
        >
          <Icon
            name={passwordIsMasked ? 'eye slash' : 'eye'}
            className={styles.passwordIcon}
          />
        </Button>
      </div>
    );
  }
}

export default PasswordInputWithConfirmation;
