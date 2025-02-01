const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
    {
        restaurant_id: String,
        address: {
            building: String,
            street: String,
            zipcode: String,
        },
        name: {
            type: String,
        },
        city: {
            type: String,
        },
        cuisine: {
            type: String,
        },
    },
    { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
