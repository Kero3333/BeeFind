function initMap() {
  fetch("./picture.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((picture) => {
        const latt = parseFloat(picture.localisation.split("/")[0]);
        const long = parseFloat(picture.localisation.split("/")[1]);

        let test = { lat: latt, lng: long };
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: test,
        });
        const mark = new google.maps.Marker({
          position: test,
          map: map,
        });
      });
    });
}
