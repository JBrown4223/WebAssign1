// ################################################################################
// Web service setup

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const mongodb = require("mongodb");
// Or use some other port number that you like better

// Add support for incoming JSON entities
app.use(bodyParser.json());
// Add support for CORS
app.use(cors());



// ################################################################################
// Data model and persistent store setup

const manager = require("./data_manager.js");
const m = manager("mongodb+srv://dbUser1:Marvin@app1db-8un04.mongodb.net/Cars?retryWrites=true&w=majority");

// ################################################################################
// Deliver the app's home page to browser clients

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});



// ################################################################################
// Resources available in this web API

app.get("/api", (req, res) => {
  // Here are the resources that are available for users of this web API...
  // YOU MUST EDIT THIS COLLECTION
  const links = [];
  // This app's resources...
  links.push({ "rel": "collection", "href": "/api/cars", "methods": "GET,POST,PUT,DELETE" });

  const linkObject = { 
    "apiName": "Assignment 1 Web API",
    "apiDescription": "Web API for cars database, for use with Assignment 1",
    "apiVersion": "1.0", 
    "apiAuthor": "Alexi Joseph",
    "links": links
  };
  res.json(linkObject);
});



// ################################################################################
// Request handlers for data entities (listeners)
// Get all
app.get("/api/cars", (req, res) => {
  // Call the manager method
  m.carGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Get one
app.get("/api/cars/:id", (req, res) => {
  // Call the manager method
  m.carGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

/*app.get("/api/cars/:color", (req,res) => {
  m.carByColour(req.params.color)
  .then((data) => {
    res.json(data);
  })
  .catch(() => {
    res.status(404).json({"message": "Colour Unavailible, Sorry"})
  })
})
*/
// Add new
app.post("/api/cars", (req, res) => {
  // Call the manager method
  m.carAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Edit existing
app.put("/api/cars/:id", (req, res) => {
  // Call the manager method
  m.carEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Delete item
app.delete("/api/cars/:id", (req, res) => {
  // Call the manager method
  m.carDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// ################################################################################
// Resource not found (this should be at the end)

app.use((req, res) => {
  res.status(404).send("Resource not found");
});



// ################################################################################
// Attempt to connect to the database, and
// tell the app to start listening for requests

m.connect().then(() => {
  app.listen(HTTP_PORT, () => { console.log("Ready to handle requests on port " + HTTP_PORT) });
})
  .catch((err) => {
    console.log("Unable to start the server:\n" + err);
    process.exit();
  });