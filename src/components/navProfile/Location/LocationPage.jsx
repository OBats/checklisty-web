import React, { Component } from 'react';
import { Container, Button, Header, Icon, Segment } from 'semantic-ui-react';

import Geolocation from './Geolocation';

class LocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
    };
  }

  addLocation = () => {
    this.setState({
      showSearch: true,
    });
  };

  render() {
    const { showSearch } = this.state;
    return (
      <Container>
        <Header as="h2" attached="top"> Location </Header>
        {!showSearch
        && (
          <Segment placeholder>
            <Header icon>
              <Icon name="search" />
              {' '}
You have not yet specified your location yet
            </Header>
            <Segment.Inline>
              <Button onClick={this.addLocation} primary>Add Location</Button>
            </Segment.Inline>
          </Segment>
        )}
        {showSearch
        && (
          <Segment placeholder>
            <Geolocation />
          </Segment>
        )
        }
      </Container>
    );
  }
}

export default LocationPage;
