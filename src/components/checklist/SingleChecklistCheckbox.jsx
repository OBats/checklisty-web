import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import style from './css/SingleChecklistItem.module.css';

const SingleChecklistCheckbox = (props) => {
  return (
    <Checkbox
      checked={props.checkedIndex}
      onChange={props.handleChecked}
      label={(
        <label>
          {!props.checkedIndex && (
            <p>
              <span className={style.checklistTitle}>
                {props.propsData.item_title}
              </span>
              <span className={style.checklistDescription}>
                {props.propsData.description}
              </span>
            </p>
          )}
          {props.checkedIndex && (
            <p>
              <span className={style.checklistTitleCrossedOut}>
                {props.propsData.item_title}
              </span>
              <span className={style.checklistDescriptionCrossedOut}>
                {props.propsData.description}
              </span>
            </p>
          )
          }
        </label>
      )}
    />
  )
}

export default SingleChecklistCheckbox;
