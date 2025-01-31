const mongoose = require("mongoose");

const Restaurant = new mongoose.Schema({
    name: {
        type: String,
    },
    city: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    updateDate: {
        type: Date,
    },
});
