/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import AvatarForProfile from './Avatar';

const ProfileMainInfo = () => (
  <Grid columns="equal">
    <Grid.Row width={8}>
      <Grid.Column>
        <AvatarForProfile />
        <Form>
          <Form.Field>
            <Form.Input label="Name" placeholder="Change name" width={6} />
          </Form.Field>
          <Form.Field>
            <Form.Input label="Email" placeholder="Change email" width={6} />
          </Form.Field>
          <Form.Field>
            <Form.Input label="Old password" placeholder="Type password" width={6} />
          </Form.Field>
          <Form.Field>
            <Form.Group>
              <Form.Input label="Old password" placeholder="Type new password" width={6} />
              <Form.Input label="Old password" placeholder="Repeat password" width={6} />
            </Form.Group>
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={6}>
        <Button fluid color="green" type="submit" size="big">Save</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ProfileMainInfo;
