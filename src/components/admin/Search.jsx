import React from 'react';
import { Segment, Search as SemanticSearch } from 'semantic-ui-react';

const Search = ({ setSearchFilter, setActivePage }) => {
  const handleSearch = (e) => {
    const { value } = e.target;

    setSearchFilter(value);
    setActivePage(1);
  };

  return (
    <Segment basic style={{ margin: 0, border: '1px solid rgba(34,36,38,.15)', borderRadius: '.28571429rem' }}>
      <SemanticSearch
        showNoResults={false}
        placeholder="Search users..."
        onSearchChange={handleSearch}
      />
    </Segment>
  );
};

export default Search;
