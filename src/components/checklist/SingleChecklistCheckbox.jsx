import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import style from './css/SingleChecklistItem.module.css';

const SingleChecklistCheckbox = props => (
  <Checkbox
    checked={props.checkedIndex}
    onChange={props.handleChecked}
    label={(
      <label>
        <p>
          <span className={
            props.checkedIndex ? style.checklistTitleCrossedOut : style.checklistTitle
          }
          >
            {`${props.propsData.item_title} `}
          </span>
          <span className={
            props.checkedIndex ? style.checklistDescriptionCrossedOut : style.checklistDescription
          }
          >
            {props.propsData.description}
          </span>
        </p>
      </label>
    )}
  />
);

export default SingleChecklistCheckbox;
