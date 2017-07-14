import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import GoogleMapsHelper from './../google-maps-helper';
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
      this.setState({ msg: 'Loading Google Maps API ..' });

      this.mapHelper = await new GoogleMapsHelper().init(this.refs.mapwrapper);
      this.mapHelper.onBoundsChanged(bounds => this._updateCrimeFromMap(bounds));
      this._updateCrimeFromMap(this.mapHelper.getBounds());

      this.setState({ msg: null });

    }
    catch (error)
    {
      window.console.error(error);
      this.setState({
        msg: 'Loading Map failed. Please reload the page or try again later.'
      });
    }
  }


  _updateCrimeFromMap ({ north, east, south, west })
  {
    this.props.updateCrime({ north, east, south, west });
  }

  _updateHeatMap (crimes)
  {
    this.mapHelper.updateHeatMap(crimes.map(crime => crime.location));
  }

}
