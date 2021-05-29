const app = require("./server.js");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const MongoClient = mongodb.MongoClient;

MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  {
    poolSize: 50,
    wtimeout: 2500,
    useNewUrlParse: true
  },
  console.log("Connected successfully to server")
).catch(err => {
  console.error(err.stack);
  process.exit(1);
});
