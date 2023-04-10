// import express from "express";
const express = require("express");

const bodyParser = require("body-parser");
const data = `
<div>
<h1> Hi  I am legend</h1>
<h2>passoniate front end developer</h2>
</div>
`;
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("<h1> HiLee</h1><h2>welcome</h2>"));
app.get("/bio", (req, res) => res.send(data));
app.get("/cal", (req, res) => res.sendFile(__dirname + "/index.html"));
app.post("/cal", (req, res) => {
  let n1 = Number(req.body.num1);
  let n2 = Number(req.body.num2);
  console.log("posted the data", n1 + n2);
  res.send(`<h1> the result is ${n1 + n2}`);
});

//----------------------------------****************** Weather APP *********************...........................
var weather_url =
  "https://api.openweathermap.org/data/2.5/weather?q=vijayawada&appid=82f84a1ecf214e938bc81e33923dda1b";

app.get("/weather", (req, res) => {
  res.sendFile(__dirname + "/weather.html");
});

app.post("/weather", (req, res) => {
  var Temperature;
  https.get(weather_url, (weather_res) => {
    console.log("status.code", weather_res.statusCode);
    weather_res.on("data", (data) => {
      const weather_data = JSON.parse(data);
      console.log("temp", weather_data.main.temp);
      Temperature = JSON.stringify(weather_data.main.pressure);

      res.send(`The current ${loc} Temperature is ${weather_data.main.temp}`);
    });
  });
  var loc = req.body.Location;
});
app.listen(3000, () => {
  console.log("server started");
});

//----------------------------------****************** News Letter *********************...........................
app.use(express.static("newsLetter"));
app.get("/newsletter", (req, res) => {
  console.log(__dirname, __filename);
  res.sendFile(__dirname + "/newsLetter/signUp.html");
});
app.post("/newsletter", (req, res) => {
  let fn = req.body.firstname;
  let ln = req.body.lastname;
  let email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fn,
          LNAME: ln,
        },
      },
    ],
  };
  
});
