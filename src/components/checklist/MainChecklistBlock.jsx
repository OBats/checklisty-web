import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import ChecklistView from './ChecklistView';
import style from './css/MainChecklistBlock.module.css';

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
          {data.sections_data.map(elem => (
            <ChecklistView styleSectionDivider={style.sectionDivider} checkListData={elem} />
          ))}
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    );
  }
}

export default MainChecklistBlock;
