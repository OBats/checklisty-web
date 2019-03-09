import React from 'react';
import { Label } from 'semantic-ui-react';
import style from '../css/SingleChecklistItem.module.css';

const SingleChecklistLabels = (props) => {
  const { propsData } = props;
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
};

export default SingleChecklistLabels;
