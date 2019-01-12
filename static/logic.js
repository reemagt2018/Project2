// initialize the map
//  var map = L.map('map').setView([42.35, -71.08], 13);

  // load a tile layer
//  L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
  //  {
//      attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
//      maxZoom: 17,
  //    minZoom: 9
  //  }).addTo(map);

  // load GeoJSON from an external file
//   $.getJSON("json.geojson",function(data){
    // add GeoJSON layer to the map once the file is loaded
  //  L.geoJson(data).addTo(map);
//  });
//  var url = "json.geojson";

//  d3.json(url, function(error, data) {

  //  if (error) console.log(error);

    //console.log(data);

//L.geoJson(data).addTo(map);

//});

// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);




function Meme (feature, layer) {
    // bind pop up with the name of the city in it.
    if ( feature.properties) {
        layer.bindPopup(feature.properties.City);
    }
}
  //{
  //  layer.bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");
//  };

L.geoJSON(myGeoJson,{

  onEachFeature:Meme

}).addTo(myMap);


  // Create a new marker cluster group
//  var markers = L.markerClusterGroup();

  // Loop through data
//  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
  //  var location = response[i].location;

    // Check for location property
  //  if (location) {

      // Add a new marker to the cluster group and bind a pop-up
  //    markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
    //    .bindPopup(response[i].descriptor));
//    }

  //}

  // Add our marker cluster layer to the map
//  myMap.addLayer(markers);

//});
