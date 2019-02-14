import React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

const ProfilesubInfo = () => (
  <Container>
    <Header as="h1">Your list will be here</Header>
    <Image
      src="http://www.joelnelsongroup.com/wp-content/uploads/2015/08/Coming-Soon.jpg"
      as="a"
      size="medium"
      href="http://google.com"
      target="_blank"
    />
  </Container>
);

export default ProfilesubInfo;
