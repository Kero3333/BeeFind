const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// openning database
const openDatabase = () => {
  let db = new sqlite3.Database("data.db", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
  });
  return db;
};

const closeDatabase = (db) => {
  db.close((err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Close the database connection.");
  });
};

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public/"));
app.use(express.static(__dirname + "/beefind/"));
app.use(express.static(__dirname + "/webcamjs/"));

const newAccount = (email, password, username, res) => {
  const db = openDatabase();

  let sql = "SELECT * FROM Account WHERE email = ?";
  db.get(sql, [email], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (row === undefined) {
      db.get(sql, [username], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        if (row === undefined) {
          db.run(
            `INSERT INTO Account (email, password, username) VALUES ("${email}", "${password}", "${username}")`
          );
          res.sendFile(path.join(__dirname, "beefind/home.html"));
        } else {
          res.send(`${username} is already taken`);
        }
      });
    } else {
      res.send(`${email} is already taken`);
    }
  });
};

app.post("/login", (req, res) => {
  newAccount(db, req.body.mail, req.body.password, req.body.pseudo, res);
});

// Picture :
const dispPicture = (idAccount) => {
  const db = openDatabase();
  db.all(`SELECT * FROM Picture WHERE id_account=${idAccount}`, (err, data) => {
    if (err) console.log(err.message);
    const pictures = JSON.stringify(data);
    setTimeout(() => {
      fs.writeFile("public/picture.json", pictures, function (err) {
        if (err) return console.error(err.message);
        console.log("Fichier créé !");
      });
    }, 1000);
  });
  closeDatabase(db);
};

const newPicture = (idAccount, date, image, localisation, espece) => {
  const db = openDatabase();

  db.get(
    `INSERT INTO Picture (id_account, date, image, localisation, espece) VALUES ("${idAccount}","${date}", "${image}", "${localisation}", "${espece}")`
  );
  closeDatabase(db);
};

const newSpecie = () => {
  const db = openDatabase();

  const descriptionAbeille =
    "Insecte vivant en colonies et produisant la cire et le miel.";
  const imageAbeille = "abeille.png";

  const descriptionFrelonAsiatique =
    "Le frelon asiatique ou frelon à pattes jaunes est une espèce d insectes hyménoptères de la famille des Vespidae, de la sous-famille des Vespinae et du genre Vespa. L espèce est originaire d Asie, avec une vaste aire de répartition dans des zones au climat tropical ou continental. C est une espèce invasive qui attaque les abeilles.";
  const imageFrelonAsiatique = "frelonAsiatique.png";

  const descriptionFrelonEuropeen =
    "Le frelon européen ou frelon est une espèce d hyménoptères eusociaux de la famille des Vespidés ressemblant à une guêpe commune mais de taille deux fois plus importante ; il s agit de la plus grosse des espèces de guêpes européennes.";
  const imageFrelonEuropeen = "frelonEuropeen.png";

  const descriptionBourdon =
    "Insecte hyménoptère au corps lourd et velu, qui butine comme l abeille.";
  const imageBourdon = "bourdon.png";

  db.serialize(() => {
    db.run(
      `INSERT INTO Espece(espece, image, description)
          VALUES('Abeille', '${imageAbeille}', '${descriptionAbeille}')`
    );

    db.run(
      `INSERT INTO Espece(espece, image, description)
          VALUES('Frelon Asiatique', '${imageFrelonAsiatique}', '${descriptionFrelonAsiatique}')`
    );

    db.run(
      `INSERT INTO Espece(espece, image, description)
          VALUES('Frelon Européen', '${imageFrelonEuropeen}','${descriptionFrelonEuropeen}')`
    );

    db.run(
      `INSERT INTO Espece(espece, image, description)
          VALUES('Bourdon','${imageBourdon}','${descriptionBourdon}')`
    );
  });
};

// Level

const newLevel = (database, achievement, level, xp, idAccount) => {
  database.run(
    `INSERT INTO Level (id_account, achievement, level, xp) VALUES ("${idAccount}","${achievement}", "${level}", "${xp}")`
  );

  database.all("SELECT * FROM Level", (err, data) => {
    if (err) console.log(err.message);

    return console.log(data);
  });
};

// Achievement

const newAchievement = (database, achievement, condition) => {
  database.run(
    `INSERT INTO Achievement (achievement, condition) VALUES ("${achievement}", "${condition}")`
  );
};

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./beefind/home.html"));
});

app.get("/photo", function (req, res) {
  res.sendFile(path.join(__dirname, "./beefind/photo.html"));
});

app.post("/photo", (req, res) => {
  console.log(req.body);
  const localisation = `${req.body.latt}/${req.body.long}`;
  const idAccount = 1;
  newPicture(
    idAccount,
    req.body.date,
    req.body.image,
    localisation,
    req.body.espece
  );
  dispPicture(1);
  res.sendFile(path.join(__dirname, "./beefind/photo.html"));
});

app.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "beefind/home.html"));
});

app.get("/user", function (req, res) {
  res.sendFile(path.join(__dirname, "beefind/user.html"));
});

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`);
});
