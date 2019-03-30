import React, { useState, useEffect } from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';
import TeamListsSearch from './TeamListsSearch';
import TeamLists from './TeamLists';
import TeamListsPagination from './TeamListsPagination';
import http from '../../../../api/http';
import loaderStyle from '../../../main/loader.module.css';
import NoTeamLists from './NoTeamLists';

const TeamListsContainer = (props) => {
  const [checklists, setChecklists] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [teamName, setTeamName] = useState('Team');
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listLoad, setListLoad] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setListLoad(true);
    http.get(`/api/team/${props.id}/checklists?page=${activePage}&search=${search}`)
      .then((res) => {
        setChecklists(res.data.filteredChecklists);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
        setTeamName(res.data.teamName);
        setListLoad(false);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setChecklists(1);
          setTotalPages(1);
          setActivePage(1);
        }
        if (err.response.status === 400) {
          setChecklists(null);
        }
        if (err.response.status === 403) {
          setChecklists(2);
          setTotalPages(1);
          setActivePage(1);
        }

        setListLoad(false);
        setLoading(false);
      });
  }, [activePage, search, totalItems]);

  if (loading) {
    return (
      <div className={loaderStyle.loader}>Loading...</div>
    );
  }

  if (checklists === 2) {
    return <div>The team do not exists or you are not part of it!</div>;
  }

  if (!checklists) {
    return <NoTeamLists teamId={props.id} />;
  }

  return (
    <Container>
      <Header as="h1">
        <Header.Content>{totalItems === 1 ? `${teamName} list` : `${teamName} lists`}</Header.Content>
      </Header>
      <TeamListsSearch
        listsCount={totalItems}
        setSearch={setSearch}
        setActivePage={setActivePage}
        teamId={props.id}
      />
      <Segment style={{ minHeight: '300px' }}>
        <TeamLists
          lists={checklists}
          listLoad={listLoad}
          teamId={props.id}
          setLists={setTotalItems}
        />
      </Segment>
      <Segment.Inline style={{ textAlign: 'center' }}>
        <TeamListsPagination
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
          setLoading={setListLoad}
        />
      </Segment.Inline>
    </Container>
  );
};

export default TeamListsContainer;
