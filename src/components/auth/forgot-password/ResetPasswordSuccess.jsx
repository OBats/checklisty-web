import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import style from './css/forgotPassword.module.css';

const ResetPasswordSuccess = () => (
  <>
    <Header textAlign="center" size="large" icon>
      <Icon name="check circle" color="green" />
      {'Password has been reseted'}
      <Header.Subheader color="black" className={style.successfullSend}>
        {'Please go to Sign In page to authorize into your account'}
      </Header.Subheader>
    </Header>
    <Link to="/auth/signin" className={style.linkStyle}>To Sign In page</Link>
  </>
);

export default ResetPasswordSuccess;
