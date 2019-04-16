import React from 'react';
import style from '../css/SingleChecklistItem.module.css';
import SingleChecklistDetails from './SingleChecklistDetails';
import SingleChecklistLabels from './SingleChecklistLabels';
import SingleChecklistCheckbox from './SingleChecklistCheckbox';
import SingleChecklistPopup from './SingleChecklistPopup';
import SingleChecklistAccordionArrow from './SingleChecklistAccordionArrow';

const SingleChecklistItem = (props) => {
  const handleClickAccordion = () => {
    const { handleClickAccordion, index } = props;
    handleClickAccordion(index);
  };

  const handleChecked = () => {
    const { handleChecked, index } = props;
    handleChecked(index);
  };

  const { propsData, className, checkedIndex, accordionIndex } = props;
  return (
    <div className={className}>
      <div className={style.itemHeader}>
        <div className={style.subheaderStyle}>
          <SingleChecklistPopup propsData={propsData} />
          <div className={style.checkboxStyle}>
            <SingleChecklistCheckbox
              checkedIndex={checkedIndex}
              propsData={propsData}
              handleChecked={handleChecked}
            />
          </div>
        </div>
        <div className={style.accordionArrowPosition}>
          {propsData.details && (
            <div className={style.accordionCursor}>
              <SingleChecklistAccordionArrow
                checkedIndex={checkedIndex}
                handleClickAccordion={handleClickAccordion}
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
};

export default SingleChecklistItem;
