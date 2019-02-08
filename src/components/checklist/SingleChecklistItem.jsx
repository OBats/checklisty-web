/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
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
    this.handleClickAccordion = this.handleClickAccordion.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  componentDidMount() {
    const { propsData } = this.props;
    this.setState({
      readyMDFile: propsData.details,
    });
  }

  handleClickAccordion() {
    const { handleClickAccordion, index } = this.props;
    handleClickAccordion(index);
  }

  handleChecked() {
    const { handleChecked, index } = this.props;
    handleChecked(index);
  }

  render() {
    const { propsData, className, checkedIndex, accordionIndex, iconName } = this.props;
    const { readyMDFile } = this.state;
    return (
      <Container className={className}>
        <Accordion.Title className={style.accordionTitle}>
          <Grid container>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={1}>
                <Popup
                  position="top center"
                  basic
                  trigger={
                    <Icon name="circle" size="tiny" color={priorities[propsData.priority].color} className={style.priorityCircle} />
                  }
                >
                  <Popup.Content>
                    <Icon name="bolt" size="small" color={priorities[propsData.priority].color} />
                    {`${priorities[propsData.priority].label} priority`}
                  </Popup.Content>
                </Popup>
              </Grid.Column>
              <Grid.Column width={14}>
                <Checkbox
                  checked={checkedIndex}
                  onChange={this.handleChecked}
                  label={(
                    <label>
                      {!checkedIndex && (
                        <p>
                          <span className={style.checklistTitle}>
                            {propsData.item_title}
                            {' '}
                          </span>
                          <span className={style.checklistDescription}>
                            {propsData.description}
                          </span>
                        </p>
                      )}
                      {checkedIndex && (
                        <p>
                          <span className={style.checklistTitleCrossedOut}>
                            {propsData.item_title}
                            {' '}
                          </span>
                          <span className={style.checklistDescriptionCrossedOut}>
                            {propsData.description}
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
                  active={accordionIndex === 0}
                  index={0}
                  onClick={this.handleClickAccordion
                  }
                >
                  {
                    !checkedIndex
                        && (
                          <Icon name={iconName} className={style.accordionArrow} />
                        )
                  }
                </Accordion.Title>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Accordion.Title>
        {!checkedIndex && (
          <Accordion.Content active={accordionIndex === 0}>
            <Grid>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={12}>
                <ReactMarkdown source={readyMDFile} />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        )
        }
        {!checkedIndex && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} />
              <Grid.Column width={6} className={style.labelStyleBottomPadding}>
                {propsData.tags.map((elem, index) => <Label key={index.toString()} size="medium"><span className={style.labelStyle}>{elem}</span></Label>)}
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
