import React from 'react';
import { Header, Button, Icon, Modal } from 'semantic-ui-react';
import style from '../css/viewedLists.module.css';

const ClearHistoryModal = ({ confirmOpened, closeConfirm, openConfirm, clearHistory }) => (
  <Modal
    trigger={(
      <Button
        color="red"
        icon
        inverted
        onClick={openConfirm}
      >
        <Icon name="trash alternate" />
        <span className={style.clearHistoryButton}>Clear history</span>
      </Button>
    )}
    open={confirmOpened}
    onClose={closeConfirm}
    size="small"
  >
    <Header icon="trash" content="Do you really want to clear your history?" />
    <Modal.Content>
      <p>
        {'You will lost all your progress and it will be inpossible to recover!'}
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" inverted onClick={closeConfirm}>
        <Icon name="remove" />
        {' '}
        {'No'}
      </Button>
      <Button color="green" inverted onClick={clearHistory}>
        <Icon name="checkmark" />
        {' '}
        {'Yes'}
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ClearHistoryModal;
