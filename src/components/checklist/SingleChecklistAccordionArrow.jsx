import React from 'react';
import { Accordion, Icon} from 'semantic-ui-react';
import style from './css/SingleChecklistItem.module.css';

const SingleChecklistAccordionArrow = (props) => {
  return (
    <Accordion.Title
      active={props.accordionIndex === 0}
      index={0}
      onClick={props.handleClickAccordion
      }
    >
      {
        !props.checkedIndex
        && (
          <Icon name={props.iconName} className={style.accordionArrow} />
        )
      }
    </Accordion.Title>
  )
}

export default SingleChecklistAccordionArrow;
