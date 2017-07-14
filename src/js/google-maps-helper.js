import loadGoogleMapsAPI from 'load-google-maps-api';


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


  updateHeatMap (data)
  {
    this.assertIsInitialised();
    const { LatLng } = this.api;

    this.heatmap.data.clear();
    data.forEach(datum => {
      this.heatmap.data.push(new LatLng(datum.latitude, datum.longitude));
    });
  }

  getBounds ()
  {
    this.assertIsInitialised();
    const bounds = this.map.getBounds();
    if (bounds)
    {
      return bounds.toJSON();
    }
  }

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
