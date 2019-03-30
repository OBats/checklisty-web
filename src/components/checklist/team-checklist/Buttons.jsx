import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from '../css/TeamChecklistBlock.module.css';

const Buttons = ({ onLogButton }) => (
  <div className={styles.headerStyle}>
    <div>
      <Link to="/">
        <Button secondary>
          <Icon name="home" />
          {'Back to team'}
        </Button>
      </Link>
    </div>
    <div>
      <Button onClick={onLogButton} secondary>
        <Icon name="history" />
        {'Show team log'}
      </Button>
    </div>
  </div>
);

export default Buttons;
