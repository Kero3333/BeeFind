const btn = document.getElementById("btn");
console.log(document.getElementById("espece").options[0].textContent);

// btn "take a picture"
btn.addEventListener("click", () => {
  // if camera is visible
  if (document.querySelector("#my_camera").style.visibility !== "hidden") {
    const cam = document.querySelector("#my_camera");
    cam.style.visibility = "hidden";
    cam.style.width = "0px";
    cam.style.height = "0px";
    if (!!document.querySelector("#save")) {
      document
        .querySelector("#my_result")
        .removeChild(document.querySelector("#localisation"));
      document
        .querySelector("#take_photo")
        .removeChild(document.querySelector("#save"));
      document
        .querySelector("form")
        .removeChild(document.querySelector("#specie"));
      document
        .querySelector("form")
        .removeChild(document.querySelector("#date"));
    }
    // if camera is hidden
  } else {
    const cam = document.querySelector("#my_camera");
    cam.style.visibility = "visible";
    cam.style.width = "300px";
    cam.style.height = "225px";
    if (!!document.querySelector("#save")) {
      document
        .querySelector("#take_photo")
        .removeChild(document.querySelector("#save"));
      document
        .querySelector("form")
        .removeChild(document.querySelector("#specie"));
      document
        .querySelector("form")
        .removeChild(document.querySelector("#date"));
      if (!!document.querySelector("#localisation")) {
        document
          .querySelector("#my_result")
          .removeChild(document.querySelector("#localisation"));
      }
    }
    return;
  }
  // if the btn "save" exist
  if (!!document.querySelector("#save")) {
    document
      .querySelector("#my_result")
      .removeChild(document.querySelector("#localisation"));
    document
      .querySelector("#take_photo")
      .removeChild(document.querySelector("#save"));
    document
      .querySelector("form")
      .removeChild(document.querySelector("#specie"));
    document.querySelector("form").removeChild(document.querySelector("#date"));
  }
  // take the geolocation
  window.navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(longitude, latitude);

    const ul = document
      .querySelector("#my_result")
      .appendChild(document.createElement("ul"));
    ul.id = "localisation";
    ul.innerHTML = `
    <input name="latt" type="hidden" value="${latitude}"/>
    <input name="long" type="hidden" value="${longitude}"/>
    
    `;
  });
  // create the btn "save"
  const p = document
    .querySelector("#take_photo")
    .appendChild(document.createElement("p"));
  p.id = "save";
  p.innerHTML = `
  <br>
  <input type="submit" value="Enregistrer" />
  `;
  //take the specie
  const espece = document.getElementById("espece").options;
  for (let i = 0; i < 3; i++) {
    if (espece[i].selected === true) {
      const p = document
        .querySelector("form")
        .appendChild(document.createElement("p"));
      p.id = "specie";
      p.innerHTML = `
      <input name="espece" type="hidden" value="${espece[i].textContent}"/>
      `;
    }
  }
  // take the date
  const date = new Date();
  const pDate = document
    .querySelector("form")
    .appendChild(document.createElement("p"));
  pDate.id = "date";
  pDate.innerHTML = `
  <input name="date" type="hidden" value="${date.getDate()}/${
    date.getUTCMonth() + 1
  }/${date.getFullYear()}"/>
  `;
});
