import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import style from './CreateChecklistModal.module.css';

const HeaderForModal = (props) => {
  if (props.loggedUser) {
    return (
      <Modal.Header
        className={style.headerStyle}
        content="Choose way for creating new checklist"
      />
    );
  }
  return (
    <Modal.Header
      className={style.headerStyle}
      content="It seems like you are not signed in"
    />
  );
};

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

export default connect(mapStateToProps)(HeaderForModal);
