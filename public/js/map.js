// MapBox - https://docs.mapbox.com/mapbox-gl-js/example/simple-map/

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 8,
});

// console.log(listing.geometry.coordinates);

// Create a default "Marker" and add it to the map.
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h6>${listing.title}</h6><p>Exact location provided after booking.</p>`
    )
  )
  .addTo(map);
