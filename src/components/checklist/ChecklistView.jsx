/* eslint-disable no-plusplus */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Accordion, Container, Grid, Progress, Button, Header, Icon } from 'semantic-ui-react';
import SingleChecklistItem from './SingleChecklistItem';
import style from './css/ChecklistView.module.css';

class ChecklistView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.checkListData,
      checkboxArray: [],
      accordionIndexArray: [],
      iconNameArray: [],
      isWholeChecklistHidden: false,
      currentProgress: 0,
    };
    this.handleClickEyeButton = this.handleClickEyeButton.bind(this);
  }

  componentDidMount() {
    const checkboxArray = [];
    const accordionIndexArray = [];
    const iconNameArray = [];

    for (let i = 0; i < this.state.data.item_data.length; i++) {
      checkboxArray.push(false);
      accordionIndexArray.push(-1);
      iconNameArray.push('chevron down');
    }
    this.setState({
      checkboxArray, accordionIndexArray, iconNameArray,
    });
  }

    handleChecked = (index) => {
      const checkboxArray = [...this.state.checkboxArray];
      checkboxArray[index] = !checkboxArray[index];

      let countOfCheckedItems = 0;

      for (let i = 0; i < this.state.checkboxArray.length; i++) {
        if (checkboxArray[i] === true) {
          countOfCheckedItems++;
        }
      }

      const currentProgress = (
        (countOfCheckedItems / this.state.checkboxArray.length) * 100
      ).toFixed(0);

      this.setState({
        checkboxArray,
        currentProgress,
      });
    }

    handleClickAccordion = (index) => {
      const accordionIndexArray = [...this.state.accordionIndexArray];
      accordionIndexArray[index] = accordionIndexArray[index] === 0 ? -1 : 0;

      const iconNameArray = [...this.state.iconNameArray];
      iconNameArray[index] = accordionIndexArray[index] === 0 ? 'chevron up' : 'chevron down';

      this.setState({
        accordionIndexArray,
        iconNameArray,
      });
    }

    handleClickEyeButton() {
      this.setState({
        isWholeChecklistHidden: !this.state.isWholeChecklistHidden,
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
          <Grid>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={6}>
                <Header size="large">{data.title}</Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Progress percent={currentProgress} indicating size="medium">
                  {' '}
                  {`Current progress: ${currentProgress}%`}
                  {' '}
                </Progress>
              </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={2} floated="right">
                <Button size="medium" icon color="teal" onClick={this.handleSetAllCheckboxes}>
                  <Icon name="check" />
                </Button>
                <Button size="medium" icon color="red" onClick={this.handleResetAllCheckboxes}>
                  <Icon name="expand" />
                </Button>
              </Grid.Column>
              <Grid.Column width={2} floated="right">
                <Button size="medium" icon color="teal" onClick={this.handleOpenAllAccordions}>
                  <Icon name="angle double down" />
                </Button>
                <Button size="medium" icon color="red" onClick={this.handleCloseAllAccordions}>
                  <Icon name="angle double up" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1}>
                <Button size="medium" icon color={isWholeChecklistHidden && ('red')} onClick={this.handleClickEyeButton}>
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
                    data.item_data.map((elem, index) => (
                      <SingleChecklistItem
                        key={index}
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
