const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const routes = require("./routes/index");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  console.log("request");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

module.exports = app;
