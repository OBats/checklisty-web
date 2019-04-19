/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, Image, Popup, Button, Checkbox } from 'semantic-ui-react';
import { signOut } from '../../api/auth-api';
import style from './NavBar.module.css';
import home from '../main/logo.png';
import { handleSignOut } from '../../actions/user';
import avatar from '../profile/Avatar/avatar.png';
import Notification from './Notification';
import UncheckedMsg from './UncheckedMsg';
import { fetchUserInvites } from '../../actions/fetchUserInvites';


const NavBar = ({ userData, handleSignOut, userInvites, componentLoader, listsLoader, fetchUserInvites }) => {
  useEffect(() => {
    if (userData) {
      fetchUserInvites(userData._id);
    }
  }, [componentLoader, listsLoader]);
  return (
    <Menu className={style.menu} inverted borderless>
      <Menu.Item name="main" position="left" as={Link} to="/">
        <img src={home} alt="home" />
        <span className={style.home}>Checklisty</span>
      </Menu.Item>
      {!userData && (
        <Menu.Item name="signIn" position="right" as={NavLink} to="/auth/signin/">
        Sign In
        </Menu.Item>
      )}
      {!userData && (
        <Menu.Item
          className={style.signUp}
          name="signUp"
          as={NavLink}
          to="/auth/signup/"
        >
        Sign Up
        </Menu.Item>
      )}
      {userData && (
        <React.Fragment>
          <Menu.Menu>
            <Menu.Item className={style.notificationContainer}>
              <UncheckedMsg amount={userInvites && userInvites.length} />
              <Popup
                trigger={<Icon name="bell" size="big" />}
                position="bottom center"
                on="click"
                content={<Notification />
                }
              />
            </Menu.Item>
            <Dropdown
              item
              text={`${userData.firstname} ${userData.lastname}`}
              className={style.NavBarUsername}
            >
              <Dropdown.Menu className={style.NavBarMenu}>
                <Dropdown.Item
                  as={NavLink}
                  to="/profile/maininfo"
                  className={style.MenuItem}
                >
                  <Icon name="edit" className={style.MenuItemIcon} />
                  <span className={style.MenuItemText}>Edit Profile</span>
                </Dropdown.Item>
                <Dropdown.Item
                  as={NavLink}
                  to="/profile/mylists"
                  className={style.MenuItem}
                >
                  <Icon name="list" className={style.MenuItemIcon} />
                  <span className={style.MenuItemText}>My Lists</span>
                </Dropdown.Item>
                <Dropdown.Item
                  as={NavLink}
                  to="/profile/myteam"
                  className={style.MenuItem}
                >
                  <Icon name="group" className={style.MenuItemIcon} />
                  <span className={style.MenuItemText}>Team</span>
                </Dropdown.Item>
                {userData.role !== 'user' && (
                <>
                  <Dropdown.Item
                    as={NavLink}
                    to="/admin"
                    className={style.MenuItem}
                  >
                    <Icon name="user secret" className={style.MenuItemIcon} />
                    <span className={style.MenuItemText}>Admin tools</span>
                  </Dropdown.Item>
                </>
                )}
                <Dropdown.Item
                  className={style.MenuItem}
                  onClick={() => {
                    signOut();
                    handleSignOut();
                  }}
                >
                  <Icon name="sign-out" className={style.MenuItemIcon} />
                  <span className={style.MenuItemText}>Sign Out</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item className={style.NavBarAvatarWrapper}>
              <Image
                src={userData.image || avatar}
                style={{ width: '60px' }}
                size="tiny"
                avatar
              />
            </Menu.Item>
          </Menu.Menu>
        </React.Fragment>
      )}
    </Menu>
  );
};

const mapStateToProps = ({ user, checklists }) => ({
  userData: user.userData,
  userInvites: user.userInvites,
  componentLoader: checklists.componentLoader,
  listsLoader: checklists.listsLoader,
});

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => {
    dispatch(handleSignOut());
  },
  fetchUserInvites: (userInvites) => {
    dispatch(fetchUserInvites(userInvites));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
