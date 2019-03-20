import React from 'react';
import { Icon, Header, Button } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import style from '../css/viewedLists.module.css';

const NoViewedLists = () => (
  <div className={style.noLists}>
    <Header as="h2" icon textAlign="center">
      <Icon name="history" />
      {'Your history is empty!'}
      <Header.Subheader>
        {
          `All of your viewed lists will display right here.
            Go to main page and choose some list or create your own!`
        }
      </Header.Subheader>
    </Header>
    <Link to="/">
      <Button icon="home" content="To main page" color="black" className={style.homeButton} />
    </Link>
  </div>
);

export default NoViewedLists;
