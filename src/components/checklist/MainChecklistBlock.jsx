/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import ChecklistView from './ChecklistView';
import checkListData from './dataExample';

class MainChecklistBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: checkListData,
    };
  }

  render() {
    const { data } = this.state;
    return (
      <Grid>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={10}>
          <Container>
            <ChecklistView checkListData={data[0]} />
            <ChecklistView checkListData={data[1]} />
          </Container>
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid>
    );
  }
}

export default MainChecklistBlock;
