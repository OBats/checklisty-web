/* eslint-disable react/prop-types */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';


const NavBar = ({ user }) => (
  <Menu>
    <Menu.Item
      name="main"
      as={Link}
      to="/"
    >
      Main Page
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
    {user && (
      <React.Fragment>
        <Menu.Item
          name="profile"
          position="right"
          as={NavLink}
          to="/profile"
        >
          {user.username}
        </Menu.Item>
        <Menu.Item
          name="profile"
          as={NavLink}
          to="/logout"
        >
          Logout
        </Menu.Item>
      </React.Fragment>
    )}
  </Menu>
);

export default NavBar;
