import React, { useState } from 'react';
import { Button, Segment, Divider, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import style from '../css/Message.module.css';

const Message = ({ property }) => {
  const [isOpened, setIsOpened] = useState(true);

  const closeMessage = () => setIsOpened(false);

  if (property && isOpened) {
    return (
      <Segment
        color="yellow"
        raised
        className={style.messageSegment}
      >
        <div className={style.headerRow}>
          <h3 className={style.header}>Warning!</h3>
          <button type="button" onClick={closeMessage} className={style.closeButton}>
            <Icon name="close" size="large" fitted />
          </button>
        </div>
        <Divider />
        {'Pay attention that your progress won\'t be saved, because you are not signed in!'}
        <div className={style.signinButton}>
          <Link to="/auth/signin">
            <Button primary>
              {'Sign In now!'}
            </Button>
          </Link>
        </div>
      </Segment>
    );
  }
  return null;
};

export default Message;
