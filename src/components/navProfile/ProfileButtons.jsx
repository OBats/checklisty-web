import React from 'react';
import { Button, Container } from 'semantic-ui-react';

const ProfileButtons = () => (
  <Container>
    <Button.Group size="large" widths={2}>
      <Button color="green" type="submit">Save</Button>
      <Button color="red" type="submit">Cancel</Button>
    </Button.Group>
  </Container>
);

export default ProfileButtons;
