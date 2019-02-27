import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ChecklistView from './ChecklistView';

class MainChecklistBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.checkListData,
    };
  }

  render() {
    const { data } = this.state;
    return (
      <Grid>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
          {data.sections_data.map((elem, index) => (
            <ChecklistView key={index.toString()} checklistIndex={index} checkListData={elem} />
          ))}
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    );
  }
}

export default MainChecklistBlock;
