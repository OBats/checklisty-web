import React from 'react';
import popupStyle from '../css/LogPopup.module.css';

const PopupContent = ({ user }) => (
  <div className={popupStyle.mainBlock}>
    <div className={popupStyle.photoBlock}>
      <img src={user.image} alt="user" className={popupStyle.popupPhoto} />
    </div>
    <div className={popupStyle.infoBlock}>
      <span className={popupStyle.givenname}>{`${user.firstname} ${user.lastname}`}</span>
      <span className={popupStyle.usernameField}>
        {'Username:'}
        {' '}
        <span className={popupStyle.username}>{user.username}</span>
      </span>
      <span className={popupStyle.emailField}>
        {'Email: '}
        {' '}
        <span className={popupStyle.email}>{user.email}</span>
      </span>
    </div>
  </div>
);

export default PopupContent;
