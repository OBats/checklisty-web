import React from 'react';
import avatar from '../../Avatar/avatar.png';
import popupStyle from './css/UserInfoPopup.module.css';

const UserInfoPopup = ({ member, isOnline }) => (
  <div className={popupStyle.mainBlock}>
    <div className={popupStyle.photoBlock}>
      <img src={member.image || avatar} alt="User avatar" className={popupStyle.popupPhoto} />
    </div>
    <div className={popupStyle.infoBlock}>
      <p className={popupStyle.nameStatus}>
        <span className={popupStyle.givenname}>
          {`${member.firstName} ${member.lastName}`}
        </span>
        <span className={isOnline ? popupStyle.online : popupStyle.offline}>
          {isOnline ? 'active' : 'away'}
        </span>
      </p>
      <p className={popupStyle.usernameField}>
        {`${'Username: '}`}
        <span className={popupStyle.username}>{member.username}</span>
      </p>
    </div>
  </div>
);

export default UserInfoPopup;
