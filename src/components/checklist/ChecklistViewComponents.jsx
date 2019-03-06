import React from 'react';
import { Accordion, Container, Progress, Icon, Divider } from 'semantic-ui-react';
import SingleChecklistItem from './SingleChecklistItem';
import style from './css/ChecklistView.module.css';

const ChecklistViewComponents = (props) => {
  const {
    data, checklistIndex, currentProgress, handleSetAllCheckboxes,
    handleResetAllCheckboxes, handleOpenAllAccordions, handleCloseAllAccordions,
    handleClickEyeButton, isWholeChecklistHidden,
  } = props;
  return (
    <Container>
      {checklistIndex !== 0 && (<Divider />)}
      <div className={style.sectionDivider}>
        <div className={style.optionsBlock}>
          <div className={style.checklistHeader}>
            <div className={style.checklistTitle}>
              <span className={style.sectionTitle}>
                {data.section_title}
              </span>
            </div>
            <Progress
              percent={currentProgress}
              indicating
              size="medium"
              className={style.progressbar}
            >
              {`Current progress: ${currentProgress}%`}
            </Progress>
          </div>
          <div className={style.checklistButtons}>
            <div className={style.buttonGroup}>
              <button
                type="button"
                onClick={handleSetAllCheckboxes}
                className={[style.buttonStyle, style.tealButton].join(' ')}
              >
                <Icon name="check" inverted fitted />
              </button>
              <button
                type="button"
                onClick={handleResetAllCheckboxes}
                className={[style.buttonStyle, style.redButton].join(' ')}
              >
                <Icon name="expand" inverted fitted />
              </button>
            </div>
            <div className={style.buttonGroup}>
              <button
                type="button"
                onClick={handleOpenAllAccordions}
                className={[style.buttonStyle, style.tealButton].join(' ')}
              >
                <Icon name="angle double down" inverted fitted />
              </button>
              <button
                type="button"
                onClick={handleCloseAllAccordions}
                className={[style.buttonStyle, style.redButton].join(' ')}
              >
                <Icon name="angle double up" inverted fitted />
              </button>
            </div>
            <div className={style.buttonGroup}>
              <button
                type="button"
                onClick={handleClickEyeButton}
                className={[
                  style.buttonStyle,
                  isWholeChecklistHidden ? style.redButton : style.grayButton,
                ].join(' ')}
              >
                <Icon name={isWholeChecklistHidden ? 'eye' : 'eye slash'} fitted inverted />
              </button>
            </div>
          </div>
        </div>
        {!isWholeChecklistHidden && (
          <Accordion className={style.accordionStyle} fluid>
            {
              data.items_data.map((elem, index) => (
                <SingleChecklistItem
                  key={index.toString()}
                  propsData={elem}
                  index={index}
                  handleClickAccordion={props.handleClickAccordion}
                  accordionIndex={props.accordionIndexArray[index]}
                  handleChecked={props.handleChecked}
                  checkedIndex={props.checkboxArray[index]}
                  iconName={props.iconNameArray[index]}
                  className={style.checklistItem}
                />
              ))}
          </Accordion>
        )}
      </div>
    </Container>
  );
};

export default ChecklistViewComponents;
