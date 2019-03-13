import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import CreateChecklistModal from '../../create-checklist/checklist-modal';

const NoLists = () => (
  <Container>
    <Header textAlign="center" as="h1">You have no lists yet</Header>
    <Segment textAlign="center" tertiary>
      <Header as="h2">Want to create new ?</Header>
      <CreateChecklistModal />
    </Segment>
  </Container>
);

export default NoLists;
