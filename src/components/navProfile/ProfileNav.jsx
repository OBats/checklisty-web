/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable object-curly-newline */

import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfileMainInfo from './ProfileMainInfo';
import MyLists from './MyLists';
import MyTeam from './MyTeam';
import MyFriends from './MyFriends';
import LocationPage from './Location/LocationPage';

const panes = [
  { menuItem: 'Main info', render: () => <ProfileMainInfo /> },
  { menuItem: 'My friends', render: () => <MyFriends /> },
  { menuItem: 'My lists', render: () => <MyLists /> },
  { menuItem: 'My team', render: () => <MyTeam /> },
  { menuItem: 'Location', render: () => <LocationPage /> },
];

const ProfileSidebar = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
);

export default ProfileSidebar;
