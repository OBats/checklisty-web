/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react';
import { signOut } from '../../api/auth-api';
import style from './NavBar.module.css';
import home from './logo.png';
import { handleSignOut } from '../../actions/user';


const NavBar = ({ userData, handleSignOut }) => (
  <Menu className={style.menu} inverted borderless>
    <Menu.Item
      name="main"
      position="left"
      as={Link}
      to="/"
    >
      <img src={home} alt="home" />
      <span className={style.home}>Checklisty</span>
    </Menu.Item>
    {!userData && (
      <Menu.Item
        name="signIn"
        position="right"
        as={NavLink}
        to="/auth/signin/"
      >
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
          <Dropdown item text={userData.username} className={style.NavBarUsername}>
            <Dropdown.Menu className={style.NavBarMenu}>
              <Dropdown.Item as={NavLink} to="/profile/maininfo" className={style.MenuItem}>
                <Icon name="edit" className={style.MenuItemIcon} />
                <span className={style.MenuItemText}>Edit Profile</span>
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/profile/mylists" className={style.MenuItem}>
                <Icon name="list" className={style.MenuItemIcon} />
                <span className={style.MenuItemText}>My Lists</span>
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/profile/myteam" className={style.MenuItem}>
                <Icon name="group" className={style.MenuItemIcon} />
                <span className={style.MenuItemText}>Team</span>
              </Dropdown.Item>
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
              src={userData.image || 'https://uniandes.hcmifactum.com/resources/images/no-image.jpg'}
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

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => {
    dispatch(handleSignOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
