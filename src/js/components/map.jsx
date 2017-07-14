import React from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';



export default class Map extends React.Component
{

  constructor (...args)
  {
    super (...args);

    this.state = {
      msg: 'Loading Map ..'
    };
  }

  componentDidMount ()
  {

    const mapOptions = {
      key: ENV.API_KEY
    };

    loadGoogleMapsAPI(mapOptions)
      .then(googleMaps => this._setupMap(googleMaps))
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


  _setupMap (googleMaps)
  {
    this.setState({
      msg: null,
      map: new googleMaps.Map(this.refs.mapwrapper, {
        center: {
          lat: 51.5033,
          lng: -0.1195
        },
        zoom: 13
      })
    });
  }

}
