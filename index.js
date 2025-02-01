const express = require("express");
const mongoose = require("mongoose");
const restaurantRouter = require("./routes/RestaurantRoutes.js");

const app = express();
app.use(express.json());

const MONGO_URL =
    "mongodb+srv://klapointe:bO!W1mx4y&A9YB@comp3133-lab03.yf36r.mongodb.net/?retryWrites=true&w=majority&appName=comp3133-lab03";

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((success) => {
        console.log("Connected to Mongodb Successfully");
    })
    .catch((err) => {
        console.log("Error connecting to Mongodb");
    });

app.use(restaurantRouter);
app.listen(8081, () => {
    console.log("Server is running ...");
});
