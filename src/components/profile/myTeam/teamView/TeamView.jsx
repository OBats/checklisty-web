import React from 'react';
import { Tab, Container } from 'semantic-ui-react';
import TeamListsContainer from './TeamListsContainer';

const panes = [
  { menuItem: 'Team checklists', render: props => <Tab.Pane><TeamListsContainer id={props.id} /></Tab.Pane> },
  { menuItem: 'Chat', render: props => <Tab.Pane>Chat</Tab.Pane> },
];

const TeamView = props => (
  <Container>
    <TeamTabs id={props.match.params.id} />
  </Container>
);

const TeamTabs = props => (
  <Tab menu={{ secondary: true, pointing: true }} id={props.id} panes={panes} />
);

export default TeamView;
