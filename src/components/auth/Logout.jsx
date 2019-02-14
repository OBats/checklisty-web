import { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../api/auth-api';
import { handleLogOut } from '../../actions/user';

class Logout extends Component {
  componentDidMount() {
    signOut();
  }

  render() {
    return null;
  }
}

// const mapDispatchToProps = dispatch => ({
//   handleLogOut: () => {
//     dispatch(handleLogOut());
//   },
// });

export default Logout;
