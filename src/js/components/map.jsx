import React from 'react';
import { connect } from 'react-redux';
import loadGoogleMapsAPI from 'load-google-maps-api';
import debounce from 'lodash/debounce';

import { updateCrime } from './../data/actions';



@connect(store => ({
  crimes: store.crime.crimes
}), {
  updateCrime
})
export default class Map extends React.Component
{

  constructor (...args)
  {
    super (...args);

    this.state = {};

    this._updateCrimeFromMap = debounce(this._updateCrimeFromMap, 500);
  }

  componentDidMount ()
  {
    this._setupGoogleMaps();
  }

  componentWillReceiveProps ({ crimes })
  {
    this._updateHeatMap(crimes);
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


  async _setupGoogleMaps () {

    try
    {
      this.state = {
        msg: 'Loading Google Maps API ..'
      };

      const googleMaps = await loadGoogleMapsAPI({
        key: ENV.API_KEY,
        libraries: ['visualization']
      });

      this.setState({
        api: googleMaps,
        msg: 'Setting up map ..'
      });

      const map = await this._setupMap(googleMaps, this.refs.mapwrapper);

      this.setState({
        map: map,
        msg: 'Setting up heatmap ..'
      });

      const heatmap = await this._setupHeatmap(googleMaps, map);

      this.setState({
        heatmap: heatmap,
        msg: 'Setting up event listeners ..'
      });

      this._setupEventListeners(map);
      this._updateCrimeFromMap(map);

    }
    catch (error)
    {
      window.console.error(error);
      this.setState({
        msg: 'Loading Map failed. Please reload the page or try again later.'
      });
    }
  }

  _setupMap (googleMaps, element)
  {
    return new googleMaps.Map(element, {
      center: {
        lat: 51.5033,
        lng: -0.1195
      },
      zoom: 15,
      minZoom: 13
    });
  }

  _setupHeatmap (googleMaps, map)
  {
    const heatmap = new googleMaps.visualization.HeatmapLayer({
      opacity: 0.4,
      radius: 50,  // making it look nice and scary :D
      dissipating: true,
      data: []
    });
    heatmap.setMap(map);
    return heatmap;
  }

  _setupEventListeners (map)
  {
    map.addListener('bounds_changed', () => this._updateCrimeFromMap(map));
  }

  _updateCrimeFromMap (map)
  {
    const bounds = map.getBounds();
    if (bounds)
    {
      const { north, east, south, west } = bounds.toJSON();
      this.props.updateCrime({ north, east, south, west });
    }
  }

  _updateHeatMap (crimes)
  {
    const { heatmap, api: { LatLng } } = this.state;

    heatmap.data.clear();
    crimes.forEach(crime => {
      const {latitude, longitude} = crime.location;
      heatmap.data.push(new LatLng(latitude, longitude));
    });
  }

}
