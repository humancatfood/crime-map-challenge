import loadGoogleMapsAPI from 'load-google-maps-api';


/**
 * A helper class for the google-maps-api.
 */
export default class GoogleMapsHelper
{
  constructor ()
  {
    this.map = null;
    this.heatmap = null;
    this.assertIsInitialised = () => {
      throw new Error('GoogleMapsHelper has not been initialised!');
    };
  }


  /**
   * Initialises the maps-api and returns a promise.
   *
   * @param element the dom-element that the map should be attached to.
   * @return {Promise.<GoogleMapsHelper>} resolves the instance this has been called on.
   */
  async init (element)
  {
    this.api = await loadGoogleMapsAPI({
      key: ENV.API_KEY,
      libraries: ['visualization']
    });

    this.map = this._createMap(this.api, element);
    this.heatmap = this._createHeatMap(this.api);
    this.heatmap.setMap(this.map);

    this.assertIsInitialised = () => {};

    return this;
  }


  /**
   * Updates the heatmap with a list of data-points in the shape of
   *
   * [{
   *   latitude: 123.08876,
   *   longitude; 456.09876
   * }, {
   *   latitude: 789.1322,
   *   longitude; 322.12231
   * }, {
   *  etc ..
   * }]
   *
   * @param data
   */
  updateHeatMap (data)
  {
    this.assertIsInitialised();
    const { LatLng } = this.api;

    this.heatmap.data.clear();
    data.forEach(datum => {
      this.heatmap.data.push(new LatLng(datum.latitude, datum.longitude));
    });
  }

  /**
   * Returns the current bounding box of the map in the shape of
   * {
   *   north: 12124.123,
   *   east: 23042.32,
   *   south: 23090323,
   *   west: 304184.1232
   * }
   */
  getBounds ()
  {
    this.assertIsInitialised();
    const bounds = this.map.getBounds();
    if (bounds)
    {
      return bounds.toJSON();
    }
  }

  /**
   * Attaches a listener callback to the map that receives the map's bounding box when
   * the user pans or zooms the map or resizes the window.
   *
   * @param listener a function that receives the bounding box like this { north, east, south, west}
   */
  onBoundsChanged (listener)
  {
    this.map.addListener('bounds_changed', () => {
      const bounds = this.getBounds();
      if (bounds)
      {
        listener(bounds);
      }
    });
  }

  _createMap (api, element)
  {
    const { Map } = api;
    return new Map(element, {
      // centering it on the London Eye
      center: {
        lat: 51.5033,
        lng: -0.1195
      },
      zoom: 15,
      minZoom: 13
    });
  }

  _createHeatMap (api)
  {
    const { HeatmapLayer } = api.visualization;
    return new HeatmapLayer({
      opacity: 0.4,
      radius: 40,  // making it look nice and scary :D
      dissipating: true,
      data: []
    });
  }

}
