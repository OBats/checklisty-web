/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Header, Icon, Button, Segment } from 'semantic-ui-react';

const FindedLocation = (props) => {
  const { isCoordVisible, latitude, longitude, address, isGeocoding } = props.data;
  const { showCoordinates } = props;

  return (
    <Segment placeholder>
      <Header as="h2">
        <Icon name="map marker alternate" />
        <Header.Content>Your location:</Header.Content>
        <Header.Subheader>{address}</Header.Subheader>
      </Header>
      {!isCoordVisible
          && (
            <Segment.Inline>
              <Button onClick={showCoordinates} primary>Show coordinates</Button>
            </Segment.Inline>
          )
      }
      {((isCoordVisible && latitude && longitude) || isGeocoding) && (
        <div>
          <h3 className="Demo__geocode-result-header">Your coordinates</h3>
          {isGeocoding ? (
            <div>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
            </div>
          ) : (
            <div>
              <div className="Demo__geocode-result-item--lat">
                <label>Latitude:</label>
                <span>{latitude}</span>
              </div>
              <div className="Demo__geocode-result-item--lng">
                <label>Longitude:</label>
                <span>{longitude}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </Segment>
  );
};

export default FindedLocation;
