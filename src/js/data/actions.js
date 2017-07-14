import { fetchCrime } from './../crime-service';



export const ACTIONS = {
  LOAD_CRIME: 'LOAD_CRIME',
  RECEIVE_CRIME: 'RECEIVE_CRIME',

  PUSH_ERROR: 'PUSH_ERROR',
  POP_ERROR: 'POP_ERROR'
};


export const receiveCrime = crimes => ({
  type: ACTIONS.RECEIVE_CRIME,
  payload: {
    crimes
  }
});


export const pushError = error => dispatch => {

  dispatch({
    type: ACTIONS.PUSH_ERROR,
    payload: {
      error
    }
  });

  setTimeout(() => dispatch({
    type: ACTIONS.POP_ERROR
  }), 2000);

};


export const updateCrime = bounds => async dispatch => {

  dispatch({
    type: ACTIONS.LOAD_CRIME
  });

  try
  {
    const crimes = await fetchCrime(bounds);
    dispatch(receiveCrime(crimes));
  }
  catch (error)
  {
    window.console.error(error);
    dispatch(pushError(error.message));
  }

};
