/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Container, Segment, Divider, Grid } from 'semantic-ui-react';

import ProfilesubInfo from './ProfileSubInfo';
import ProfileMainInfo from './ProfileMainInfo';
import styles from './ProfilePage.module.css';

const ProfileForm = () => (
  <Segment>
    <Grid columns={2} relaxed="very">
      <Grid.Column>
        <ProfileMainInfo />
      </Grid.Column>
      <Grid.Column>
        <Container>
          <ProfilesubInfo />
        </Container>
      </Grid.Column>
    </Grid>
    <Divider vertical />
  </Segment>
);

export default ProfileForm;
