const iss_url = "https://api.wheretheiss.at/v1/satellites/25544";
var map = L.map("map", { zoomControl: false }).setView([0, 0], 10);
var marker = L.marker([0, 0]).addTo(map);

let latitude,
  longitude = "";

async function getIss() {
  const response = await fetch(iss_url);
  const data = await response.json();
  const { latitude, longitude } = data;

  document.getElementById("lat").textContent = `Latitude: ${latitude}`;
  document.getElementById("lon").textContent = `Longitude: ${longitude}`;

  // Setting up map cords
  map.setView([latitude, longitude], 5);

  marker.setLatLng([latitude, longitude]);

  // Get cords of a marker
  const { lat, lng } = marker.getLatLng();

  console.log(marker.getLatLng());
  console.log(lat, lng);

  // Some map stuff
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution: "© OpenStreetMap",
  }).addTo(map);
}
getIss();
setInterval(getIss, 5000);
var worldMiniMap = L.control
  .worldMiniMap({
    position: "bottomleft",
    width: "300",
    height: "180",
    lineColor: "red",
    circleColor: "red",
    style: {
      opacity: 0.8,
      borderRadius: "20px",
      backgroundColor: "lightblue",
      border: "2px solid white",
    },
  })
  .addTo(map);
