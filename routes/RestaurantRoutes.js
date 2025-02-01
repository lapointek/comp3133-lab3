const express = require("express");
const restaurantModel = require("../models/Restaurant");
const app = express();

// Get All
app.get("/restaurants", async (req, res) => {
    const restaurants = await restaurantModel.find({});
    try {
        console.log(restaurants[0].name);
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get specific cuisine
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
    const cuisine = req.params.cuisine;
    try {
        const restaurants = await restaurantModel.find({ cuisine: cuisine });
        if (restaurants.length !== 0) {
            res.json(restaurants);
        } else {
            res.status(404).send(
                JSON.stringify({ status: false, message: "no data found" })
            );
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Return all restaurants by descending or ascending
app.get("/restaurants", async (req, res) => {
    const sortBy = req.query.sortBy?.toUpperCase();
    const sortOrder = sortBy === "DESC" ? -1 : 1;

    if (sortBy != "DESC" && sortBy != "ASC") {
        res.status(400).json({
            status: false,
            message: "Invalid sortBy parameter. Use ASC or DESC.",
        });
        return;
    }
    try {
        const restaurants = await restaurantModel
            .find(
                {},
                {
                    _id: 0,
                    cuisine: 1,
                    name: 1,
                    city: 1,
                    restaurant_id: 1,
                }
            )
            .sort({ restaurant_id: sortOrder });
        if (restaurants.length > 0) {
            res.status(200).json(restaurants);
        } else {
            res.status(404).json({ status: false, message: "No data found" });
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
});

// Get all restaurants of type Delicatessen
app.get("/restaurants/Delicatessen", async (req, res) => {
    try {
        const restaurants = await restaurantModel
            .find(
                {
                    cuisine: "Delicatessen",
                },
                {
                    _id: 0,
                    cuisine: 1,
                    name: 1,
                    city: 1,
                }
            )
            .sort({ name: 1 });
        if (restaurants.length > 0) {
            res.status(200).json(restaurants);
        } else {
            res.status(404).json({ status: false, message: "No data found" });
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
});

module.exports = app;
