/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Grid, Modal, Button, Icon, Segment, Header } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import style from './CreateChecklistModal.module.css';

const CreateChecklistOptons = (props) => {
  const { modalTrigger } = props;
  return (
    <Container>
      <Modal trigger={modalTrigger}>
        <Modal.Header
          className={style.headerStyle}
          content="Choose way for creating new checklist"
        />
        <Modal.Content>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column textAlign="center">
                <Segment className={style.segmentHover}>
                  <Header size="small" icon>
                    <Icon name="list" color="teal" />
                    Create with form fields
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
                    Create with markdown
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
        <Modal.Actions>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column textAlign="center">
                <Link to="/create_checklist">
                  <Button animated="vertical" color="teal">
                    <Button.Content visible>Fields</Button.Content>
                    <Button.Content hidden>
                      <Icon name="check" />
                    </Button.Content>
                  </Button>
                </Link>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Button animated="vertical" color="blue" disabled>
                  <Button.Content visible>Markdown</Button.Content>
                  <Button.Content hidden>
                    <Icon name="check" />
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default CreateChecklistOptons;
