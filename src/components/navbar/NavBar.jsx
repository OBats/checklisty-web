/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
    };

    this.handleItemClick = (e, { name }) => this.setState({
      activeItem: name,
    });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Menu.Item
          name="main"
          as={Link}
          to="/"
          active={activeItem === 'main'}
          onClick={this.handleItemClick}
        >
          Main Page
        </Menu.Item>
        <Menu.Item
          name="profile"
          position="right"
          as={Link}
          to="/profile"
          active={activeItem === 'profile'}
          onClick={this.handleItemClick}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          name="signUp"
          as={Link}
          to="/auth/signup/"
          active={activeItem === 'signUp'}
          onClick={this.handleItemClick}
        >
          Sign Up
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
