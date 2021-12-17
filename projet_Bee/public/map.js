// initialize the map
function initMap() {
  // take pictures and their informations inside a json file
  fetch("./picture.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // for each picture
      data.forEach((picture) => {
        // if the information of the localisation is "empty"
        if (picture.localisation !== "undefined/undefined") {
          const latt = parseFloat(picture.localisation.split("/")[0]);
          const long = parseFloat(picture.localisation.split("/")[1]);

          let loca = { lat: latt, lng: long };
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: loca,
          });
          const mark = new google.maps.Marker({
            position: loca,
            map: map,
          });
          // if the information of the localisation is not "empty"
        } else {
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: { lat: 47.869906, lng: -3.303309 },
          });
        }
      });
    })
    .catch((err) => {
      // if there is an error
      console.log(err.message);
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 47.869906, lng: -3.303309 },
      });
    });
}
