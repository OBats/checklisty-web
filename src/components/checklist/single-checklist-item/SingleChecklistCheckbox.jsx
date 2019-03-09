import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import style from '../css/SingleChecklistItem.module.css';

const SingleChecklistCheckbox = (props) => {
  const { checkedIndex, handleChecked, propsData } = props;
  return (
    <Checkbox
      checked={checkedIndex}
      onChange={handleChecked}
      label={(
        <label>
          <span className={style.fullTitleItem}>
            <span className={
              checkedIndex ? style.checklistTitleCrossedOut : style.checklistTitle
            }
            >
              {`${propsData.item_title} `}
            </span>
            <span className={
              checkedIndex ? style.checklistDescriptionCrossedOut : style.checklistDescription
            }
            >
              {propsData.description}
            </span>
          </span>
        </label>
      )}
    />
  );
};

export default SingleChecklistCheckbox;
