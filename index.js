const express = require('express');

const app = express();
const port = 8000;

app.listen(port, function (err) {
    if (err) {
        console.log(`Failed to run the server due to error: ${err}`);
    }
    else {
        console.log(`Server running on port: ${port}`);
    }
});