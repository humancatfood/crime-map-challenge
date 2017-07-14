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

    case ACTIONS.RECEIVE_CRIME:
      return {
        ...state,
        loading: false
      };

    case ACTIONS.PUSH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case ACTIONS.POP_ERROR:
      return {
        ...state,
        loading: false,
        error: null
      };

    default:
      return state;

  }

};

