import { ACTIONS } from '../actions';



export const defaultCrimeState = {
  crimes: []
};


export default (state=defaultCrimeState, action) => {

  switch (action.type)
  {

    case ACTIONS.CRIME_LOADED:
      return {
        ...state,
        crimes: action.payload.crimes
      };

    default:
      return state;

  }

};

