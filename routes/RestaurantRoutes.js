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

app.get("/restaurants", async (req, res) => {
    const sortBy = req.query.sortBy;

    let sortOrder = 1;
    if (sortBy && sortBy.toUpperCase() === "DESC") {
        sortOrder = -1;
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

// 7.	Create REST API to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
// -	The selected columns must include cuisines, name and city, but exclude id
// -	The sorting order must be Ascending Order on the name

// http://localhost:3000/restaurants/Delicatessen
module.exports = app;
