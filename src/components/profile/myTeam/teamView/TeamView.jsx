import React, { useState, useEffect } from 'react';
import { Tab, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TeamListsContainer from './TeamListsContainer';
import ChatContainer from '../chat/ChatContainer';
import loaderStyle from '../../../main/loader.module.css';
import http from '../../../../api/http';
import styles from './TeamView.module.css';
import { saveTeamName } from '../../../../actions/saveTeamName';
import Header from '../../../main/Header';

const panes = [
  { menuItem: 'Team checklists', render: props => <Tab.Pane className={styles.footerFix}><TeamListsContainer id={props.id} /></Tab.Pane> },
  { menuItem: 'Chat', render: props => <Tab.Pane className={styles.chatTab}><ChatContainer teamId={props.id} /></Tab.Pane> },
];

const TeamView = (props) => {
  const [loading, setLoading] = useState(true);
  const token = props.location.search ? props.location.search.replace('?join=', '') : undefined;

  useEffect(() => {
    http.get(`/api/team/team/${props.match.params.id}`).then(res => props.saveTeamName(res.data.name));
    if (token) {
      http.get(`/api/team/join/a?token=${token}`)
        .then(() => {
          setLoading(false);
          props.history.push(`/profile/myteam/${props.match.params.id}`);
        })
        .catch(() => props.history.push('/profile/myteam'));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className={loaderStyle.loader}>Loading...</div>
    );
  }
  return (
    <div>
      <Header title={props.name} />
      <Container>
        <TeamTabs id={props.match.params.id} />
      </Container>
    </div>
  );
};

const TeamTabs = props => (
  <Tab menu={{ secondary: true, pointing: true }} id={props.id} panes={panes} />
);

const mapStateToProps = ({ teamName }) => (
  {
    name: teamName.name,
  });
const mapDispatchToProps = dispatch => ({
  saveTeamName: (name) => {
    dispatch(saveTeamName(name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamView);
