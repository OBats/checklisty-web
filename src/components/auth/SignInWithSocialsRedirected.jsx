import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveUserData } from '../../actions/user';
import { validateUser } from '../../api/auth-api';
import style from './auth.module.css';
import loaderStyle from '../main/loader.module.css';

class SignInWithSocialsRedirected extends Component {
  async componentDidMount() {
    const { location, history, saveUserData } = this.props;
    if (location.search.includes('?access-token=')) {
      const token = location.search.replace('?access-token=', '');
      localStorage.setItem('access-token', token);
      const user = await validateUser();
      saveUserData(user);
      history.push('/');
    } else {
      history.push('/');
    }
  }

  render() {
    return (
      <Grid className={style.Auth} centered verticalAlign="middle">
        <Grid.Column className={style.Form} width={12}>
          <div className={loaderStyle.loader}>Loading...</div>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: (data) => {
    dispatch(saveUserData(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInWithSocialsRedirected);
