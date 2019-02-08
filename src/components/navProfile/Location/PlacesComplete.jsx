/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import style from './Geolocation.css';
import { classnames } from './helpers';

const PlacesComplete = (props) => {
  const { address } = props.data;
  const { handleChange, handleSelect, handleError, handleCloseClick } = props;
  return (
    <PlacesAutocomplete
      onChange={handleChange}
      value={address}
      onSelect={handleSelect}
      onError={handleError}
      shouldFetchSuggestions={address.length > 2}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="Demo__search-bar-container">
          <div className="Demo__search-input-container">
            <input
              {...getInputProps({
                placeholder: 'Search Places...',
                className: 'Demo__search-input',
              })}
            />
            {address.length > 0 && (
              <button
                className="Demo__clear-button"
                onClick={handleCloseClick}
              >
                      x
              </button>
            )}
          </div>
          {suggestions.length > 0 && (
            <div className="Demo__autocomplete-container">
              {suggestions.map((suggestion) => {
                const className = classnames('Demo__suggestion-item', {
                  'Demo__suggestion-item--active': suggestion.active,
                });
                return (
                /* eslint-disable react/jsx-key */
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <strong>
                      {suggestion.formattedSuggestion.mainText}
                    </strong>
                    <small>
                      {suggestion.formattedSuggestion.secondaryText}
                    </small>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default PlacesComplete;
