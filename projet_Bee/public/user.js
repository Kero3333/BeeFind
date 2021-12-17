// we take pictures from a json file and displays them inside the user page
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
  })
  .catch((err) => console.log(err.message));

// we take the username and the avatar and displays them inside the user page
fetch("./account.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const username = document.querySelector("#username");
    username.textContent += ` : ${data.username}`;
    const picture = document.querySelector("#avatar");
    picture.src = data.image;
  })
  .catch((err) => console.log(err.message));
