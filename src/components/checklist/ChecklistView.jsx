/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Accordion, Container, Grid, Progress, Button, Header, Icon } from 'semantic-ui-react';
import SingleChecklistItem from './SingleChecklistItem';
import style from './css/ChecklistView.module.css';

class ChecklistView extends Component {
  constructor(props) {
    super(props);
    const { checkListData } = this.props;
    this.state = {
      data: checkListData,
      checkboxArray: [],
      accordionIndexArray: [],
      iconNameArray: [],
      isWholeChecklistHidden: false,
      currentProgress: 0,
    };
  }

  componentDidMount() {
    const checkboxArrayTemporal = [];
    const accordionIndexArray = [];
    const iconNameArray = [];

    const { data } = this.state;

    for (let i = 0; i < data.items_data.length; i += 1) {
      checkboxArrayTemporal.push(false);
      accordionIndexArray.push(-1);
      iconNameArray.push('chevron down');
    }
    this.setState({
      checkboxArray: checkboxArrayTemporal, accordionIndexArray, iconNameArray,
    });
  }

  handleChecked = (index) => {
    const { checkboxArray } = this.state;

    const checkboxArrayTemporal = [...checkboxArray];
    checkboxArrayTemporal[index] = !checkboxArrayTemporal[index];

    let countOfCheckedItems = 0;

    for (let i = 0; i < checkboxArray.length; i += 1) {
      if (checkboxArrayTemporal[i] === true) {
        countOfCheckedItems += 1;
      }
    }

    const currentProgress = (
      (countOfCheckedItems / checkboxArray.length) * 100
    ).toFixed(0);

    this.setState({
      checkboxArray: checkboxArrayTemporal,
      currentProgress,
    });
  }

  handleClickAccordion = (index) => {
    const { accordionIndexArray, iconNameArray } = this.state;

    const accordionIndexArrayTemporal = [...accordionIndexArray];
    accordionIndexArrayTemporal[index] = accordionIndexArrayTemporal[index] === 0 ? -1 : 0;

    const iconNameArrayTemporal = [...iconNameArray];
    iconNameArrayTemporal[index] = accordionIndexArrayTemporal[index] === 0 ? 'chevron up' : 'chevron down';

    this.setState({
      accordionIndexArray: accordionIndexArrayTemporal,
      iconNameArray: iconNameArrayTemporal,
    });
  }

  handleClickEyeButton = () => {
    const { isWholeChecklistHidden } = this.state;

    this.setState({
      isWholeChecklistHidden: !isWholeChecklistHidden,
    });
  }

  handleSetAllCheckboxes = () => {
    this.setState(({ checkboxArray }) => ({
      checkboxArray: checkboxArray.map(() => true),
      currentProgress: 100,
    }));
  }

  handleResetAllCheckboxes = () => {
    this.setState(({ checkboxArray }) => ({
      checkboxArray: checkboxArray.map(() => false),
      currentProgress: 0,
    }));
  }

  handleOpenAllAccordions = () => {
    this.setState(({ accordionIndexArray, iconNameArray }) => ({
      accordionIndexArray: accordionIndexArray.map(() => 0),
      iconNameArray: iconNameArray.map(() => 'chevron up'),
    }));
  }

  handleCloseAllAccordions = () => {
    this.setState(({ accordionIndexArray, iconNameArray }) => ({
      accordionIndexArray: accordionIndexArray.map(() => -1),
      iconNameArray: iconNameArray.map(() => 'chevron down'),
    }));
  }

  render() {
    const {
      data,
      currentProgress,
      isWholeChecklistHidden,
      accordionIndexArray,
      checkboxArray,
      iconNameArray,
    } = this.state;
    return (
      <Container>
        <Grid container>
          <Grid.Row verticalAlign="middle">
            <Grid.Column width={6}>
              <Header size="large">{data.title}</Header>
            </Grid.Column>
            <Grid.Column width={4}>
              <Progress percent={currentProgress} indicating size="medium">
                {`Current progress: ${currentProgress}%`}
              </Progress>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={1} className={style.toRightAlign}>
              <Button size="medium" icon color="teal" onClick={this.handleSetAllCheckboxes}>
                <Icon name="check" />
              </Button>
            </Grid.Column>
            <Grid.Column width={1} className={style.toLeftAlign}>
              <Button size="medium" icon color="red" onClick={this.handleResetAllCheckboxes}>
                <Icon name="expand" />
              </Button>
            </Grid.Column>
            <Grid.Column width={1} className={style.toRightAlign}>
              <Button size="medium" icon color="teal" onClick={this.handleOpenAllAccordions} className={style.hoverStyle}>
                <Icon name="angle double down" />
              </Button>
            </Grid.Column>
            <Grid.Column width={1} className={style.toLeftAlign}>
              <Button size="medium" icon color="red" onClick={this.handleCloseAllAccordions}>
                <Icon name="angle double up" />
              </Button>
            </Grid.Column>
            <Grid.Column width={1}>
              <Button size="medium" icon color={isWholeChecklistHidden ? 'red' : 'grey'} onClick={this.handleClickEyeButton}>
                {!isWholeChecklistHidden && (
                  <Icon name="eye" />
                )
                }
                {isWholeChecklistHidden && (
                  <Icon name="eye slash" />
                )
                }
              </Button>
            </Grid.Column>
          </Grid.Row>
          {!isWholeChecklistHidden && (
            <Grid.Row>
              <Accordion className={style.accordionStyle} fluid>
                {
                  data.items_data.map((elem, index) => (
                    <SingleChecklistItem
                      key={index.toString()}
                      propsData={elem}
                      index={index}
                      handleClickAccordion={this.handleClickAccordion}
                      accordionIndex={accordionIndexArray[index]}
                      handleChecked={this.handleChecked}
                      checkedIndex={checkboxArray[index]}
                      iconName={iconNameArray[index]}
                      className={style.checklistItem}
                    />
                  ))
                }
              </Accordion>
            </Grid.Row>
          )}
        </Grid>
      </Container>
    );
  }
}

export default ChecklistView;
