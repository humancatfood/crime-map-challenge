import React from 'react';
import { connect } from 'react-redux';
import loadGoogleMapsAPI from 'load-google-maps-api';
import debounce from 'lodash/debounce';

import { updateCrime } from './../data/actions';



@connect(store => ({
  store
}), {
  updateCrime
})
export default class Map extends React.Component
{

  constructor (...args)
  {
    super (...args);

    this.state = {
      msg: 'Loading Map ..'
    };

    this._updateCrimeMap = debounce(this._updateCrimeMap, 500);
  }

  componentDidMount ()
  {

    const mapOptions = {
      key: ENV.API_KEY
    };

    loadGoogleMapsAPI(mapOptions)
      .then(googleMaps => this._setupMap(googleMaps, this.refs.mapwrapper))
      .then(map => this._setupEventListeners(map))
      .then(map => this._updateCrimeMap(map))
      .catch(error => {
        window.console.error(error);
        this.setState({
          msg: 'Loading Map failed. Please reload the page or try again later.'
        });
      });

  }

  render ()
  {
    const { msg } = this.state;

    return (
      <div id="map" ref="mapwrapper">
        <b>{ msg }</b>
      </div>
    );
  }


  _setupMap (googleMaps, element)
  {
    return new googleMaps.Map(element, {
      center: {
        lat: 51.5033,
        lng: -0.1195
      },
      zoom: 15,
      minZoom: 15
    });
  }

  _setupEventListeners (map)
  {
    map.addListener('bounds_changed', () => this._updateCrimeMap(map));
    return map;
  }

  _updateCrimeMap (map)
  {
    const bounds = map.getBounds();
    if (bounds)
    {
      const { north, east, south, west } = bounds.toJSON();
      console.log("update");
      this.props.updateCrime({ north, east, south, west });
    }
  }

}
