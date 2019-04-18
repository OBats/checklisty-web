import React, { useState } from 'react';
import Log from './Log';
import styles from '../css/TeamChecklistBlock.module.css';
import Buttons from './Buttons';

const ChecklistTeamHeader = (props) => {
  const [isOpened, setOpened] = useState(false);

  const onLogButton = () => setOpened(!isOpened);

  return (
    <div className={styles.container}>
      <Buttons onLogButton={onLogButton} />
      <div>
        {isOpened && <Log messages={props.messages} />}
      </div>
    </div>
  );
};

export default ChecklistTeamHeader;
