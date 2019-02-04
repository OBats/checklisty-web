/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Avatar from 'react-avatar';
import { Button, Container, Form, Card } from 'semantic-ui-react';

const image = <Avatar size={200} color="green" name="Elliot Baker" />;

const ProfileMainInfo = () => (
  <Container>
    <Card
      centered
      image={image}
      header="Elliot Baker"
    />
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder="Change name" />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input type="email" placeholder="Change email" />
      </Form.Field>
      <Form.Field>
        <label>Old password</label>
        <input type="password" placeholder="Type password" />
      </Form.Field>
      <Form.Field>
        <label>New password</label>
        <Form.Group>
          <input type="password" placeholder="Type new password" />
          <input type="password" placeholder="Repeat password" />
        </Form.Group>
      </Form.Field>
      <Button.Group size="large" widths={5}>
        <Button color="green" type="submit">Save</Button>
        <Button color="red" type="submit">Cancel</Button>
      </Button.Group>
    </Form>
  </Container>
);

export default ProfileMainInfo;
