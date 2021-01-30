require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

const apiKey = process.env.API_KEY;
const apodEP = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
const epicLatestEP = "https://epic.gsfc.nasa.gov/api/natural";
const marsManifestEP = "https://api.nasa.gov/mars-photos/api/v1/manifests";
const marsPhotosEP = "https://api.nasa.gov/mars-photos/api/v1/rovers";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", express.static(path.join(path.resolve(), "src/public")));

// Connects to NASA's APOD API and retrieves the image for a specific date
app.get("/apod/get_image", async (req, res) => {
  const { date } = req.query;

  try {
    let image = await fetch(`${apodEP}&date=${date}`).then((res) => res.json());
    res.send(image);
  } catch (err) {
    console.log("error:", err);
  }
});

// Connects to NASA's APOD API and retrieves the images for a date range
app.get("/apod/get_images", async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    let images = await fetch(
      `${apodEP}&start_date=${start_date}&end_date=${end_date}`
    ).then((res) => res.json());
    res.send(images);
  } catch (err) {
    console.log("error:", err);
  }
});

// Connects to NASA's EPIC API and retrieves the latest available date's information
app.get("/epic/get_latest", async (req, res) => {
  try {
    let images = await fetch(`${epicLatestEP}`).then((res) => res.json());
    res.send(images);
  } catch (err) {
    console.log("error:", err);
  }
});

// Connects to NASA's Mars Photos API and retrieves the manifest for a rover
app.get("/mars-photos/manifest/:rover", async (req, res) => {
  const { rover } = req.params;
  try {
    let manifest = await fetch(
      `${marsManifestEP}/${rover}?api_key=` + apiKey
    ).then((res) => res.json());
    res.send(manifest);
  } catch (err) {
    console.log("error:", err);
  }
});

// Connects to NASA's Mars Photos API and retrieves photos for a specific rover on a given date
app.get("/mars-photos/rovers/:rover/:date", async (req, res) => {
  const { rover, date } = req.params;

  try {
    let photos = await fetch(
      `${marsPhotosEP}/${rover}/photos?earth_date=${date}&api_key=` + apiKey
    ).then((res) => res.json());
    res.send(photos);
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
