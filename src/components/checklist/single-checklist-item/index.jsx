import React, { Component } from 'react';
import style from '../css/SingleChecklistItem.module.css';
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
    const { propsData, className, checkedIndex, accordionIndex } = this.props;
    return (
      <div className={className}>
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
              <div className={style.accordionCursor}>
                <SingleChecklistAccordionArrow
                  checkedIndex={checkedIndex}
                  handleClickAccordion={this.handleClickAccordion}
                  accordionIndex={accordionIndex}
                />
              </div>
            )}
          </div>
        </div>
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
