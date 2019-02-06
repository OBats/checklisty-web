import React from 'react';
import { Search, Grid } from 'semantic-ui-react';

const SearchComponent = () => (
  <Grid>
    <Grid.Column width={6}>
      <Search />
    </Grid.Column>
  </Grid>
);

export default SearchComponent;
