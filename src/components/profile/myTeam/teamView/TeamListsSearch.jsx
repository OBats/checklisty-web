import React from 'react';
import { Segment, Statistic, Search } from 'semantic-ui-react';
import { debounce } from 'throttle-debounce';
import CreateChecklistModal from '../../../create-checklist/checklist-modal';

const TeamListsSearch = ({ listsCount, setSearch, setActivePage, teamId }) => {
  const searchChange = debounce(500, (searchText) => {
    setSearch(searchText);
    setActivePage(1);
  });

  return (
    <Segment.Group horizontal>
      <Segment basic>
        <Statistic style={{ paddingRight: '1em' }}>
          <Statistic.Value>{listsCount}</Statistic.Value>
          <Statistic.Label>{listsCount === 1 ? 'list' : 'lists'}</Statistic.Label>
        </Statistic>
      </Segment>
      <Segment basic style={{ margin: 'auto' }}>
        <Search
          showNoResults={false}
          placeholder="Search lists..."
          onSearchChange={e => searchChange(e.target.value)}
        />
      </Segment>
      <Segment basic textAlign="right" style={{ margin: 'auto', border: 'none' }}>
        <CreateChecklistModal teamId={teamId} />
      </Segment>
    </Segment.Group>
  );
};

export default TeamListsSearch;
