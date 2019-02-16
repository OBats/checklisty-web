import React from 'react';
import { Grid, Modal, Icon, Segment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import style from './CreateChecklistModal.module.css';

const ContentForModal = (props) => {
  if (props.loggedUser) {
    return (
      <Modal.Content>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <Segment className={style.segmentHover}>
                <Header size="small" icon>
                  <Icon name="list" color="teal" />
                  {'Create with form fields'}
                </Header>
                <p>
                  This option is recommended for regular user.
                  Here you can add some information using good
                  known user-friendly form fields for quick checklists
                  creation.
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Segment className={style.segmentHoverDisabled}>
                <Header size="small" icon>
                  <Icon name="code" color="blue" />
                  {'Create with markdown'}
                </Header>
                <p>
                  This option is recommended for advanced user.
                  Here you can simply add markdown from your local file
                  or even put something down in the field on the next page.
                </p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    );
  }
  return (
    <Modal.Content>
      <Grid>
        <Grid.Row columns={1} centered>
          <Grid.Column verticalAlign="middle">
            <Header as="h1" icon>
              <Icon name="user secret" />
              {'We couldn\'t recognise you!'}
              <Header.Subheader>
                {'To create your own checklist you should sign in!'}
              </Header.Subheader>
              <Header.Subheader>
                {'Would you like to do it now? Just click the button you like!'}
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Modal.Content>
  );
};

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

export default connect(mapStateToProps)(ContentForModal);
