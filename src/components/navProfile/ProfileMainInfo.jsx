/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Avatar from 'react-avatar';
import { Container, Form, Card } from 'semantic-ui-react';

import ProfileButtons from './ProfileButtons';

const image = <Avatar size={200} color="green" name="Elliot Baker" />;

const ProfileMainInfo = () => (
  <Container>
    <Card
      className="card_image"
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
      <ProfileButtons />
    </Form>
  </Container>
);

export default ProfileMainInfo;
