import React, { Component } from 'react';
import { Container, Grid, Accordion } from 'semantic-ui-react';
import style from './css/SingleChecklistItem.module.css';
import SingleChecklistDetails from './SingleChecklistDetails';
import SingleChecklistLabels from './SingleChecklistLabels';
import SingleChecklistCheckbox from './SingleChecklistCheckbox';
import SingleChecklistPopup from './SingleChecklistPopup';
import SingleChecklistAccordionArrow from './SingleChecklistAccordionArrow';

class SingleChecklistItem extends Component {
  handleClickAccordion = () => {
    const { handleClickAccordion, index } = this.props;
    handleClickAccordion(index);
  }

  handleChecked = () => {
    const { handleChecked, index } = this.props;
    handleChecked(index);
  }

  render() {
    const { propsData, className, checkedIndex, accordionIndex, iconName } = this.props;
    return (
      <Container className={className}>
        <Accordion.Title className={style.accordionTitle}>
          <Grid container>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={1}>
                <SingleChecklistPopup propsData={propsData} />
              </Grid.Column>
              <Grid.Column width={14} className={style.pointerStyle}>
                <SingleChecklistCheckbox
                  checkedIndex={checkedIndex}
                  propsData={propsData}
                  handleChecked={this.handleChecked}
                />
              </Grid.Column>
              {propsData.details && (
                <Grid.Column width={1} floated="right">
                  <SingleChecklistAccordionArrow
                    iconName={iconName}
                    checkedIndex={checkedIndex}
                    handleClickAccordion={this.handleClickAccordion}
                    accordionIndex={accordionIndex}
                  />
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Accordion.Title>
        {(!checkedIndex && propsData.details !== '') && (
          <SingleChecklistDetails propsData={propsData} accordionIndex={accordionIndex} />
        )
        }
        {!checkedIndex && (<SingleChecklistLabels propsData={propsData} />)}
      </Container>
    );
  }
}

export default SingleChecklistItem;
