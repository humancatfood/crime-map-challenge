export const fetchCrime = async ({ north, east, south, west}) => {

  try
  {
    const poly = `${north},${west}:${north},${east}:${south},${east}:${south},${west}`;
    const url = `https://data.police.uk/api/crimes-street/all-crime?poly=${poly}`;
    const crimes = await fetch(url);
    return await crimes.json();
  }
  catch (error)
  {
    window.console.error(error);
    return error;
  }

};
