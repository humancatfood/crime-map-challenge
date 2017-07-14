import { ACTIONS } from '../actions';



export const defaultStatusState = {
  loading: false,
  error: null
};


export default (state=defaultStatusState, action) => {

  switch (action.type)
  {

    case ACTIONS.LOAD_CRIME:
      return {
        ...state,
        loading: true
      };

    case ACTIONS.CRIME_LOADED:
      return {
        ...state,
        loading: false
      };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;

  }

};

