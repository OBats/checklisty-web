import React from 'react';
import { Tab, Container } from 'semantic-ui-react';
import MyLists from './MyLists';
import ViewedLists from './viewed-lists/ViewedLists';
import style from './css/viewedLists.module.css';

const panes = [
  { menuItem: 'Your Checklists', render: () => <Tab.Pane><MyLists /></Tab.Pane> },
  { menuItem: 'Viewed Checklists', render: () => <Tab.Pane><ViewedLists /></Tab.Pane> },
];

const ProfileLists = () => (
  <Container className={style.container}>
    <Tab
      menu={{ secondary: true, pointing: true }}
      panes={panes}
    />
  </Container>
);

export default ProfileLists;
