const express = require('express');
const db = require("./config/mongoose");
const app = express();
const expressRouter = require("./routes");
const port = 8000;

/* set up views and view engine */
app.set("view engine", "ejs");
app.set("views", "./views");

/* Setup assets folder for all JS/CSS/image files */
app.use(express.static("assets"));

/* route all routes beginning with "/" to expressRoutes */
app.use("/", expressRouter);


app.listen(port, function (err) {
    if (err) {
        console.log(`Failed to run the server due to error: ${err}`);
    }
    else {
        console.log(`Server running on port: ${port}`);
    }
});