import { ACTIONS } from '../actions';



export const defaultCrimeState = {
  crimes: []
};


export default (state=defaultCrimeState, action) => {

  switch (action.type)
  {

    case ACTIONS.RECEIVE_CRIME:
      return {
        ...state,
        crimes: action.payload.crimes
      };

    default:
      return state;

  }

};

