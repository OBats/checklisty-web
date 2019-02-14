import { Component } from 'react';
import { signOut } from '../../api/auth-api';

class Logout extends Component {
  componentDidMount() {
    signOut();
  }

  render() {
    return null;
  }
}

export default Logout;
