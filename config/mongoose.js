const mongoose = require("mongoose");

/** Connect to DB */
const dbName = "to_do_list_db";
const mongoURI = "mongodb://localhost/" + dbName;
mongoose.connect(mongoURI);

/** Gain access to the database */
const db = mongoose.connection;

/** Verify connection */
db.on("error", console.error.bind(console, "Error on connecting to the DB"));
db.once("open", function () {
    console.log("Successfully connected to the database");
});