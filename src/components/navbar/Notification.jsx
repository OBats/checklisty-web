import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import style from './NavBar.module.css';
import http from '../../api/http';
import { refreshInvitesLength } from '../../actions/fetchUserInvites';


const Notification = (props) => {
  const { userInvites, userData, refreshInvitesLength } = props;
  const declineInvite = (teamId) => {
    http.get(`/api/team/declineInvite/?teamId=${teamId}&userId=${userData._id}`);
    const removeInvite = userInvites.filter(currentInvite => currentInvite._id !== teamId);
    refreshInvitesLength(removeInvite);
  };
  const acceptInvite = async (teamId) => {
    http.get(`/api/team/acceptInvite/?teamId=${teamId}&userId=${userData._id}`);
    const acceptInvite = userInvites.filter(currentInvite => currentInvite._id !== teamId);
    refreshInvitesLength(acceptInvite);
  };
  if (userInvites && userInvites.length !== 0) {
    return (
      <div className={style.container}>
        {userInvites.reverse().map(currentInvite => (
          <div className={style.notificationList} key={currentInvite._id}>
            <span className={style.inviteText}>
You have been invited to
              <span className={style.mainInfo}>{currentInvite.name}</span>
              {' '}
team by
              <span className={style.mainInfo}>{currentInvite.creator.username}</span>
            </span>
            <div className={style.notificationBtns}>
              <Button color="red" inverted onClick={() => declineInvite(currentInvite._id)}>Decline</Button>
              <Button color="green" inverted onClick={() => acceptInvite(currentInvite._id)}>Accept</Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={style.noNotification}>
      <span>No notifications yet...</span>
    </div>
  );
};
const mapStateToProps = ({ user }) => ({
  userInvites: user.userInvites,
  userData: user.userData,
});
const mapDispatchToProps = dispatch => ({
  refreshInvitesLength: (userInvites) => {
    dispatch(refreshInvitesLength(userInvites));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
