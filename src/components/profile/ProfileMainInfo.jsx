/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Button, Grid, Container, Tab } from 'semantic-ui-react';
import AvatarForProfile from './Avatar/Avatar';
import styles from './ProfileMainInfo.module.css';

const panes = [
  { menuItem: 'Edit Profile',
    render: () => (
      <Tab.Pane>
        <Grid.Row>
          <div className={styles.profileAvatar}>
            <AvatarForProfile />
          </div>
          <Form className={styles.profileForm}>
            <Form.Input label="Name" placeholder="Change name" width={6} />
            <Form.Input label="Email" placeholder="Change email" width={6} />
            <Button color="green" type="submit" size="medium" className={styles.profileBtn}>Save</Button>
          </Form>
        </Grid.Row>
      </Tab.Pane>
    ) },
  { menuItem: 'Edit Password',
    render: () => (
      <Tab.Pane>
        <Form className={styles.profileForm}>
          <Form.Input label="Current password" placeholder="Type password" width={6} />
          <Form.Input label="New password" placeholder="Type new password" width={6} />
          <Form.Input label="Repeat new password" placeholder="Repeat password" width={6} />
          <Button color="green" type="submit" size="medium" className={styles.profileBtn}>Save</Button>
        </Form>
      </Tab.Pane>
    ) },
];

const ProfileMainInfo = () => (
  <Container>
    <Tab
      className={styles.tabWrapper}
      menu={{ fluid: true,
        vertical:
      true,
        tabular: true }}
      panes={panes}
    />
  </Container>
);

export default ProfileMainInfo;
