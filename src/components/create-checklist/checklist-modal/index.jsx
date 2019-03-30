import React, { Component } from 'react';
import { Container, Modal, Button, Icon } from 'semantic-ui-react';
import style from './CreateChecklistModal.module.css';
import ContentForModal from './ContentForModal';
import ActionsForModal from './ActionsForModal';
import HeaderForModal from './HeaderForModal';

class CreateChecklistModal extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpened: false };
  }

  show = () => this.setState({ isModalOpened: true })

  close = () => this.setState({ isModalOpened: false })

  render() {
    const { isModalOpened } = this.state;
    return (
      <Container>
        <Button
          onClick={this.show}
          className={style.plusButtonStyle}
          icon
          circular
          title="Add new Checklist"
        >
          <Icon name="plus" size="large" className={style.iconPlusButtonStyle} />
        </Button>

        <Modal open={isModalOpened} onClose={this.close} closeIcon>
          <HeaderForModal />
          <ContentForModal />
          <ActionsForModal close={this.close} teamId={this.props.teamId} />
        </Modal>

      </Container>
    );
  }
}

export default CreateChecklistModal;
