fetch("./picture.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((picture) => {
      const photo = document.querySelector(".grid-photos");
      photo.innerHTML += `
        <img src=${picture.image} />
        `;
    });
  });
