const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    city: {
        type: String,
    },
    cuisine: {
        type: String,
    },
    updateDate: {
        type: Date,
    },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
