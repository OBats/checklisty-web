import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import style from './CreateChecklistModal.module.css';

const ActionsForModal = (props) => {
  if (props.loggedUser) {
    return (
      <Modal.Actions>
        <div className={style.buttonBlock}>
          <div className={style.regularButton}>
            <Link to={{ pathname: '/create-checklist/form', query: { teamId: props.teamId } }}>
              <Button animated="vertical" color="teal">
                <Button.Content visible>Fields</Button.Content>
                <Button.Content hidden>
                  <Icon name="check" />
                </Button.Content>
              </Button>
            </Link>
          </div>
          <div className={style.regularButton}>
            <Link to={{ pathname: '/create-checklist/markdown', query: { teamId: props.teamId } }}>
              <Button animated="vertical" color="blue">
                <Button.Content visible>Markdown</Button.Content>
                <Button.Content hidden>
                  <Icon name="check" />
                </Button.Content>
              </Button>
            </Link>
          </div>
          <div className={style.regularButton}>
            <Button animated="vertical" color="yellow" disabled>
              <Button.Content visible>Nested Checklists</Button.Content>
              <Button.Content hidden>
                <Icon name="check" />
              </Button.Content>
            </Button>
          </div>
        </div>
        <div className={style.alternativeBlock}>
          <Button color="red" inverted onClick={props.close}>
            <Icon name="remove" />
            {'Close'}
          </Button>
        </div>
      </Modal.Actions>
    );
  }
  return (
    <Modal.Actions>
      <Button color="red" inverted onClick={props.close}>
        <Icon name="remove" />
        {'No, thanks'}
      </Button>
      <Link to="/auth/signin">
        <Button color="green" inverted>
          <Icon name="checkmark" />
          {'Sign In!'}
        </Button>
      </Link>
    </Modal.Actions>
  );
};

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

export default connect(mapStateToProps)(ActionsForModal);
