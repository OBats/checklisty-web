import React from 'react';
import { Label } from 'semantic-ui-react';
import style from '../css/SingleChecklistItem.module.css';

const SingleChecklistLabels = (props) => {
  const { propsData } = props;
  if (propsData.tags && propsData.tags.length > 0) {
    return (
      <div className={style.labelItemStyle}>
        {propsData.tags.map((elem, index) => (
          <Label key={index.toString()} size="medium">
            <span className={style.labelStyle}>
              {elem}
            </span>
          </Label>
        ))
        }
      </div>
    );
  }
  return null;
};

export default SingleChecklistLabels;
