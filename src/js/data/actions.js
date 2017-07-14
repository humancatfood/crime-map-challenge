import { fetchCrime } from './../crime-service';



export const ACTIONS = {
  LOAD_CRIME: 'LOAD_CRIME',
  CRIME_LOADED: 'CRIME_LOADED',

  ERROR: 'ERROR'
};


export const updateCrime = bounds => async dispatch => {

  dispatch({
    type: ACTIONS.LOAD_CRIME
  });

  try
  {
    const crimes = await fetchCrime(bounds);
    dispatch({
      type: ACTIONS.CRIME_LOADED,
      payload: {
        crimes
      }
    });
  }
  catch (error)
  {
    window.console.error(error);
    dispatch({
      type: ACTIONS.ERROR,
      payload: {
        error: error.message
      }
    });
  }

};
