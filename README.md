# crime-map-challenge



Full specs, can be found [here](FrontEndCrimeMapTest.pdf).

How to run:

```commandline
> git clone git@github.com:humancatfood/crime-map-challenge.git

> cd crime-map-challenge

> (npm|yarn) install

> (npm|yarn) start

```

Then open a browser and navigate to `localhost:3000` (in dev-mode, the maps-api is restricted to `localhost`, so `127.0.0.1` etc won't work)

OR

go [here](git@github.com:humancatfood/crime-map-challenge.git)

---

The code is pretty straightforward and self-documenting, except for the [crime service](src/js/crime-service.js) and the [Google Maps helper](src/js/google-maps-helper.js) which do have some documentation.

---

Things to improve:

- Cache seen areas:

  The api gets hit every time the map position changes. Instead the previously _seen_ areas should be cached and new data should only be requested when the map position changes to a previously _unseen_ area.

  A naive solution would be to keep track of the previously seen bounds (furthest north, east, south & west) and only update if those are exceeded, but this will lead to holes if the map is panned to an area that is _further_ outside the bounds than it is wide.

  Ideally this would require tracking _seen_ areas in a polygon that new areas can be joined into, but this requires a bit more coding.
