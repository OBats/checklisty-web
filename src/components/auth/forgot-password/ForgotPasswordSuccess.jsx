import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import style from './css/forgotPassword.module.css';

const ForgotPasswordSuccess = props => (
  <>
    <Header textAlign="center" size="large" icon>
      <Icon name="check circle" color="green" />
      {'Email has been sent successfully'}
      <Header.Subheader color="black" className={style.successfullSend}>
        {'Check your email: '}
        {<span className={style.userEmailStyle}>{props.userEmail}</span>}
        {' and follow the instructions in mail to reset your password!'}
      </Header.Subheader>
    </Header>
    <Link to="/" className={style.linkStyle}>Go to Homepage</Link>
  </>
);

export default ForgotPasswordSuccess;
