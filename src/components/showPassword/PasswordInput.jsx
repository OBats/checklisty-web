import React from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';
import styles from './PasswordInput.module.css';

class PasswordInput extends React.Component {
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
    const { id, className, handleChange, handleBlur, values } = this.props;
    return (
      <div className={styles.passwordWrapper}>
        <Input
          id={id}
          className={[className, styles.passwordInput].join(' ')}
          value={values.password}
          required
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type={passwordIsMasked ? 'password' : 'text'}
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          fluid
        />
        <Button
          basic
          onClick={this.togglePasswordMask}
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
  }
}

export default PasswordInput;
