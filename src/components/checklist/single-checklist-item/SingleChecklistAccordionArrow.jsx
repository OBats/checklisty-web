import React from 'react';
import { Icon } from 'semantic-ui-react';
import style from '../css/SingleChecklistItem.module.css';

const SingleChecklistAccordionArrow = props => (
  <div role="button" onClick={props.handleClickAccordion}>
    {
      !props.checkedIndex
      && (
        <Icon
          name="chevron down"
          fitted
          className={props.accordionIndex
            ? style.accordionArrowClosed : style.accordionArrowOpened}
        />
      )
    }
  </div>
);

export default SingleChecklistAccordionArrow;
