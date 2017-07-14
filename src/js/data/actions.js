import { fetchCrime } from './crime-service';



export const ACTIONS = {};


export const updateCrime = bounds => async dispatch => {
  try
  {
    const crime = await fetchCrime(bounds);
    console.log(crime);
  }
  catch (error)
  {
    window.console.error(error);
  }

};
