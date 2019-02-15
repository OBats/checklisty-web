/* eslint-disable react/prop-types */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { signOut } from '../../api/auth-api';
import style from './NavBar.module.css';
import home from './logo.png';


const NavBar = ({ user }) => (
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
    {!user && (
      <Menu.Item
        name="signIn"
        position="right"
        as={NavLink}
        to="/auth/signin/"
      >
        Sign In
      </Menu.Item>
    )}
    {!user && (
      <Menu.Item
        className={style.signUp}
        name="signUp"
        as={NavLink}
        to="/auth/signup/"
      >
        Sign Up
      </Menu.Item>
    )}
    {user && (
      <React.Fragment>
        <Menu.Menu>
          <Dropdown item text={user.username} className={style.NavBarUsername}>
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
              <Dropdown.Item className={style.MenuItem} onClick={signOut}>
                <Icon name="sign-out" className={style.MenuItemIcon} />
                <span className={style.MenuItemText}>Sign Out</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item className={style.NavBarAvatarWrapper}>
            <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png" alt="user avatar" className={style.NavBarAvatar} />
          </Menu.Item>
        </Menu.Menu>
      </React.Fragment>
    )}
  </Menu>
);

export default NavBar;
