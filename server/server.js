"use strict";

const express = require("express");
const mongoose = require("mongoose");
const Vans = require("./models/vans");
const cors = require("cors");
const bp = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_URL);

app.get("/", (request, response) => {
  response.json("This is the home route");
});

//retrieve all vans
app.get("/vans", async (request, response) => {
  try {
    const allVans = await Vans.find();
    response.status(200).json(allVans);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

//retrieve a specific van
app.get("/vans/:id", async (request, response) => {
  try {
    const theVan = await Vans.findOne({ _id: request.params.id });
    response.status(200).json(theVan);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

//add a new Van
app.post("/vans", async (request, response) => {
  try {
    const newVan = await Vans.create(request.body);
    response.status(200).json(newVan);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

//Edit a Van
app.put("/vans/:id", async (request, response) => {
  try {
    const vanToUpdate = request.params.id;
    const updatedVan = await Vans.updateOne({ _id: vanToUpdate }, request.body);
    response.status(200).json(updatedVan);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

//delete a van
app.delete("/vans/:id", async (request, response) => {
  const vanToDelete = request.params.id;
  const deletedVan = await Vans.deleteOne({ _id: vanToDelete });
  response.status(200).json(deletedVan);
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
