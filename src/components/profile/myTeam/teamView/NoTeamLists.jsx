import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import CreateChecklistModal from '../../../create-checklist/checklist-modal';

const NoTeamLists = ({ teamId }) => (
  <Container>
    <Header textAlign="center" as="h1">Your team have no lists yet</Header>
    <Segment textAlign="center" tertiary>
      <Header as="h2">Want to create new ?</Header>
      <CreateChecklistModal teamId={teamId} />
    </Segment>
  </Container>
);

export default NoTeamLists;
