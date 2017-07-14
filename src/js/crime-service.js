export const fetchCrime = async ({ north, east, south, west}) => {

  let response;
  try
  {
    const poly = `${north},${west}:${north},${east}:${south},${east}:${south},${west}`;
    const url = `https://data.police.uk/api/crimes-street/all-crime?poly=${poly}`;
    response = await fetch(url);
  }
  catch (error)
  {
    throw new Error(`Couldn't fetch crime: ${ error.message }.`);
  }

  switch (response.status)
  {
    case 200:
      return await response.json();

    case 503:
      throw new Error('Too much crime to load .. please reduce the zoom level.');

    default:
      window.console.error(`Unexpected Error: ${response}`);
      throw new Error('Something went wrong .. Check the console for more details.');
  }

};
