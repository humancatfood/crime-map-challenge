import { ACTIONS } from '../actions';



export const defaultStatusState = {
  fetching: false,
  errorMessages: []
};


export default (state=defaultStatusState, action) => {

  switch (action.type)
  {

    case ACTIONS.LOAD_CRIME:
      return {
        ...state,
        fetching: true
      };

    case ACTIONS.CRIME_LOADED:
      return {
        ...state,
        fetching: false
      };

    case ACTIONS.ERROR:
      return {
        ...state,
        fetching: false,
        errorMessages: action.payload.errorMessages
      };

    default:
      return state;

  }

};

