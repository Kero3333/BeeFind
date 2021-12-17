function initMap() {
  fetch("./picture.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((picture) => {
        if (picture.localisation !== "undefined/undefined") {
          const latt = parseFloat(picture.localisation.split("/")[0]);
          const long = parseFloat(picture.localisation.split("/")[1]);

          let loca = { lat: latt, lng: long };
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: loca,
          });
          const mark = new google.maps.Marker({
            position: loca,
            map: map,
          });
        } else {
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: { lat: 47.869906, lng: -3.303309 },
          });
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 47.869906, lng: -3.303309 },
      });
    });
}
