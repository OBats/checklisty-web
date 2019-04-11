import React, { useState, useEffect } from 'react';
import { Tab, Container } from 'semantic-ui-react';
import TeamListsContainer from './TeamListsContainer';
import ChatContainer from '../chat/ChatContainer';
import loaderStyle from '../../../main/loader.module.css';
import http from '../../../../api/http';

const panes = [
  { menuItem: 'Team checklists', render: props => <Tab.Pane><TeamListsContainer id={props.id} /></Tab.Pane> },
  { menuItem: 'Chat', render: props => <Tab.Pane><ChatContainer teamId={props.id} /></Tab.Pane> },
];

const TeamView = (props) => {
  const [loading, setLoading] = useState(true);
  const token = props.location.search ? props.location.search.replace('?join=', '') : undefined;

  useEffect(() => {
    if (token) {
      http.get(`/api/team/join/a?token=${token}`)
        .then(() => {
          props.history.push(`/profile/myteam/${props.match.params.id}`);
        })
        .catch(() => props.history.push('/profile/myteam'));
    } else {
      setLoading(false);
    }
  });

  if (loading) {
    return (
      <div className={loaderStyle.loader}>Loading...</div>
    );
  }
  return (
    <Container>
      <TeamTabs id={props.match.params.id} />
    </Container>
  );
};

const TeamTabs = props => (
  <Tab menu={{ secondary: true, pointing: true }} id={props.id} panes={panes} />
);

export default TeamView;
