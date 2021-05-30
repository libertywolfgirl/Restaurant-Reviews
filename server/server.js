const express = require("express");
const cors = require("cors");
const path = require("path");
const restaurants = require("./api/restaurants.route.js");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const MongoClient = mongodb.MongoClient;

const app = express();

app.use(cors());
app.use(express.json());

// PWAs want HTTPS!
function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

app.all("*", checkHttps);

// Set route
//app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Connect to MongoDB
MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParse: true
  },
  console.log("Connected successfully to MongoDB server")
).catch(err => {
  console.error(err.stack);
  process.exit(1);
}).then(async client => {
  app.listen(port, () => {
    console.log(`❇️ Express server is running on port ${port}`);
  });
});

// Start the listener!
/*const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});*/

module.exports = app;
