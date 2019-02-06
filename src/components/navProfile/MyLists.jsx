import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

import ProfileItem from './ProfileItem';
import SearchComponent from './Search';

const Listdata = [{
  icon: 'file',
  name: 'Frontend',
  url: 'url',
},
{
  icon: 'file',
  name: 'Backend',
  url: 'url',
}];

const ProfilesubInfo = () => (
  <Container>
    <SearchComponent />
    <Segment>
      <Header as="h2">Here is your Lists</Header>
      <ProfileItem data={Listdata} />
    </Segment>
  </Container>
);

export default ProfilesubInfo;
