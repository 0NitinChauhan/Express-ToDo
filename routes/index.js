const express = require('express');
const router = express.Router();

/* Setup middleware to parse client data */
router.use(express.urlencoded());

console.log("Router is loaded inside /router/index.js");

// import controllers
const homeController = require("../controllers/home_controller")


// setup router to route URIs to respective controllers
router.get("/", homeController.getHome);
router.get("/home", homeController.getHome);
router.post("/add-task", homeController.addTask);
router.post("/delete-tasks", homeController.deleteTasks);


module.exports = router;


