import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

import FriendElement from './FriendElement';
import SearchComponent from './Search';

const Frienddata = [{
  icon: 'users',
  title: 'title',
  name: 'Nukolai',
  email: 'email',
  src: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/242ce817-97a3-48fe-9acd-b1bf97930b01/09-posterization-opt.jpg',
},
{
  icon: 'users',
  name: 'Roman',
  email: 'email',
}];

const MyFriends = () => (
  <Container>
    <SearchComponent data={Frienddata} />
    <Segment>
      <Header as="h2">Here is your Friends</Header>
      <FriendElement data={Frienddata} />
    </Segment>
  </Container>
);

export default MyFriends;
