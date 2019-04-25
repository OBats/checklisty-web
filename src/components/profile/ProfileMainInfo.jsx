/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Grid, Container, Tab } from 'semantic-ui-react';
import AvatarForProfile from './Avatar/Avatar';
import styles from './ProfileMainInfo.module.css';
import NameEmailForm from './editProfileForms/NameEmailForm';
import PasswordForm from './editProfileForms/PasswordForm';

const panes = [
  { menuItem: 'Edit Profile',
    render: () => (
      <Tab.Pane className={styles.footerFix}>
        <Grid.Row>
          <div className={styles.profileAvatar}>
            <AvatarForProfile />
          </div>
          <NameEmailForm />
        </Grid.Row>
      </Tab.Pane>
    ) },
  { menuItem: 'Edit Password',
    render: () => (
      <Tab.Pane>
        <PasswordForm />
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
