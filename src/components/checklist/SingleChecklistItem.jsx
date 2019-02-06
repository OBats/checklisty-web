/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Container, Grid, Checkbox, Accordion, Icon, Popup, Label } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import style from './css/SingleChecklistItem.module.css';

const priorities = [
  {
    color: 'green', label: 'Low',
  },
  {
    color: 'yellow', label: 'Medium',
  },
  {
    color: 'red', label: 'High',
  },
];

class SingleChecklistItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readyMDFile: null,
    };
  }

  componentDidMount() {
    fetch(this.props.propsData.details).then(response => response.text()).then((text) => {
      this.setState({
        readyMDFile: text,
      });
    });
  }

    handleClickAccordion = () => {
      this.props.handleClickAccordion(this.props.index);
    }

    handleChecked = () => {
      this.props.handleChecked(this.props.index);
    }

    render() {
      return (
        <Container className={this.props.className}>
          <Accordion.Title className={style.accordionTitle}>
            <Grid container>
              <Grid.Row verticalAlign="middle">
                <Grid.Column width={1}>
                  <Popup
                    position="top center"
                    basic
                    trigger={
                      <Icon name="circle" size="tiny" color={priorities[this.props.propsData.priority].color} className={style.priorityCircle} />
                    }
                  >
                    <Popup.Content>
                      <Icon name="bolt" size="small" color={priorities[this.props.propsData.priority].color} />
                      {`${priorities[this.props.propsData.priority].label} priority`}
                    </Popup.Content>
                  </Popup>
                </Grid.Column>
                <Grid.Column width={14}>
                  <Checkbox
                    checked={this.props.checkedIndex}
                    onChange={this.handleChecked}
                    label={(
                      <label>
                        {!this.props.checkedIndex && (
                          <p>
                            <span className={style.checklistTitle}>
                              {this.props.propsData.title}
                              {' '}
                            </span>
                            <span className={style.checklistDescription}>
                              {this.props.propsData.description}
                            </span>
                          </p>
                        )}
                        {this.props.checkedIndex && (
                          <p>
                            <span className={style.checklistTitleCrossedOut}>
                              {this.props.propsData.title}
                              {' '}
                            </span>
                            <span className={style.checklistDescriptionCrossedOut}>
                              {this.props.propsData.description}
                            </span>
                          </p>
                        )
                        }
                      </label>
                    )}
                  />
                </Grid.Column>
                <Grid.Column width={1} floated="right">
                  <Accordion.Title
                    active={
                      this.props.accordionIndex === 0}
                    index={0}
                    onClick={this.handleClickAccordion
                    }
                  >
                    {
                      !this.props.checkedIndex
                        && (
                          <Icon name={this.props.iconName} className={style.accordionArrow} />
                        )
                    }
                  </Accordion.Title>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Title>
          {!this.props.checkedIndex && (
            <Accordion.Content active={this.props.accordionIndex === 0}>
              <Grid>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={12}>
                  <ReactMarkdown source={this.state.readyMDFile} />
                </Grid.Column>
              </Grid>
            </Accordion.Content>
          )
          }
          {!this.props.checkedIndex && (
            <Grid>
              <Grid.Row>
                <Grid.Column width={1} />
                <Grid.Column width={6} className={style.labelStyleBottomPadding}>
                  {this.props.propsData.tags.map((elem, index) => <Label key={index} size="medium"><span className={style.labelStyle}>{elem}</span></Label>)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )
          }
        </Container>
      );
    }
}

export default SingleChecklistItem;
