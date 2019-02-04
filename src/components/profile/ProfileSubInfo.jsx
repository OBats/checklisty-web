/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import ProfileItem from './ProfileItem';

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

const Frienddata = [{
  icon: 'users',
  name: 'Andrii',
  email: 'email',
},
{
  icon: 'users',
  name: 'Roman',
  email: 'email',
}];

const ProfilesubInfo = () => (
  <Container>
    <Container>
      <Header as="h2">Here is your Lists</Header>
      <ProfileItem data={Listdata} />
    </Container>
    <Container>
      <Header as="h2">Here is your Friends</Header>
      <ProfileItem data={Frienddata} />
    </Container>
    <Container>
      <Header as="h2">Here is your Team</Header>
      <h4>LvNodeJs-379</h4>
    </Container>
  </Container>
);

export default ProfilesubInfo;
