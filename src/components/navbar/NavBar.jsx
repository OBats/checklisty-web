/* eslint-disable react/prop-types */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';


const NavBar = ({ user }) => (
  <Menu borderless>
    <Menu.Item
      name="main"
      position="left"
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
        <Menu.Menu>
          <Dropdown item text={user.username}>
            <Dropdown.Menu>
              <Dropdown.Item icon="edit" text="Edit Profile" as={NavLink} to="/profile/maininfo" />
              <Dropdown.Item icon="list" text="My Lists" as={NavLink} to="/profile/mylists" />
              <Dropdown.Item icon="group" text="Team" as={NavLink} to="/profile/myteam" />
              <Dropdown.Item icon="sign-out" text="Sing Out" as={NavLink} to="/singout" />
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <img src="https://react.semantic-ui.com/logo.png" alt="user avatar" />
          </Menu.Item>
        </Menu.Menu>
      </React.Fragment>
    )}
  </Menu>
);

export default NavBar;
