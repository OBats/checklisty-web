import React, { Component } from 'react';
import { Accordion } from 'semantic-ui-react';
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
      <div className={className}>
        <Accordion.Title className={style.accordionCursor}>
          <div className={style.itemHeader}>
            <div className={style.subheaderStyle}>
              <SingleChecklistPopup propsData={propsData} />
              <div className={style.checkboxStyle}>
                <SingleChecklistCheckbox
                  checkedIndex={checkedIndex}
                  propsData={propsData}
                  handleChecked={this.handleChecked}
                />
              </div>
            </div>
            <div className={style.accordionArrowPosition}>
              {propsData.details && (
                <SingleChecklistAccordionArrow
                  iconName={iconName}
                  checkedIndex={checkedIndex}
                  handleClickAccordion={this.handleClickAccordion}
                  accordionIndex={accordionIndex}
                />
              )}
            </div>
          </div>
        </Accordion.Title>
        {(!checkedIndex && propsData.details !== '') && (
          <SingleChecklistDetails propsData={propsData} accordionIndex={accordionIndex} />
        )
        }
        {!checkedIndex && (<SingleChecklistLabels propsData={propsData} />)}
      </div>
    );
  }
}

export default SingleChecklistItem;
