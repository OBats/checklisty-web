import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import style from './css/SingleChecklistItem.module.css';

const priorities = [
  {
    color: 'green', label: 'Low',
  },
  {
    color: 'yellow', label: 'Medium',
  },
  {
    color: 'red', label: 'High',
  },
];

const SingleChecklistPopup = props => (
  <Popup
    position="top center"
    basic
    trigger={
      <Icon name="circle" size="tiny" color={priorities[props.propsData.priority].color} className={style.priorityCircle} />
    }
  >
    <Popup.Content>
      <Icon name="bolt" size="small" color={priorities[props.propsData.priority].color} />
      {`${priorities[props.propsData.priority].label} priority`}
    </Popup.Content>
  </Popup>
);

export default SingleChecklistPopup;
