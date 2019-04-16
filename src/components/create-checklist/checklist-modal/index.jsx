import React, { useState } from 'react';
import { Container, Modal, Button, Icon } from 'semantic-ui-react';
import style from './CreateChecklistModal.module.css';
import ContentForModal from './ContentForModal';
import ActionsForModal from './ActionsForModal';
import HeaderForModal from './HeaderForModal';

const CreateChecklistModal = (props) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const show = () => setIsModalOpened(true);

  const close = () => setIsModalOpened(false);

  return (
    <Container>
      <Button
        onClick={show}
        className={style.plusButtonStyle}
        icon
        circular
        title="Add new Checklist"
      >
        <Icon name="plus" size="large" className={style.iconPlusButtonStyle} />
      </Button>

      <Modal open={isModalOpened} onClose={close} closeIcon>
        <HeaderForModal />
        <ContentForModal />
        <ActionsForModal close={close} teamId={props.teamId} />
      </Modal>

    </Container>
  );
};


export default CreateChecklistModal;
