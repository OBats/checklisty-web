import React from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import FindedLocation from './FindedLocation';
import PlacesComplete from './PlacesComplete';

class Geolocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      isFinded: false,
      isCoordVisible: false,
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  handleChange = (address) => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = (selected) => {
    this.setState({
      isGeocoding: true, address: selected, isFinded: true,
    });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch((error) => {
        this.setState({
          isGeocoding: false,
        });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({
      errorMessage: status,
    }, () => {
      clearSuggestions();
    });
  };

  showCoordinates = () => {
    this.setState({
      isCoordVisible: true,
    });
  };

  render() {
    const { isFinded } = this.state;

    return (
      <div>
        {isFinded
          && <FindedLocation data={this.state} showCoordinates={this.showCoordinates} />}
        {!isFinded
          && (
            <PlacesComplete
              data={this.state}
              handleCloseClick={this.handleCloseClick}
              handleChange={this.handleChange}
              handleSelect={this.handleSelect}
              handleError={this.handleError}
            />
          )}

      </div>
    );
  }
}

export default Geolocation;
