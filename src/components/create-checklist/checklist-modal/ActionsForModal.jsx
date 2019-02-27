import React from 'react';
import { Grid, Modal, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';

const ActionsForModal = (props) => {
  if (props.loggedUser) {
    return (
      <Modal.Actions>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <Link to="/create-checklist">
                <Button animated="vertical" color="teal">
                  <Button.Content visible>Fields</Button.Content>
                  <Button.Content hidden>
                    <Icon name="check" />
                  </Button.Content>
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Link to="/create-checklist/markdown">
                <Button animated="vertical" color="blue">
                  <Button.Content visible>Markdown</Button.Content>
                  <Button.Content hidden>
                    <Icon name="check" />
                  </Button.Content>
                </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
          {'Sign In now!'}
        </Button>
      </Link>
    </Modal.Actions>
  );
};

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

export default connect(mapStateToProps)(ActionsForModal);
