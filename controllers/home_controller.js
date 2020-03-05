const express = require("express");
const Task = require("../models/taskModel");

const dateParser = (dateObj) => {
    return dateObj.toDateString();
}

module.exports.getHome = function (request, response) {
    let tasks_arr = [];
    let locals = { "title": "Home", "tasks_arr": tasks_arr };

    Task.find({}, function (error, tasks) {
        if (error) {
            console.log("Error in fetching task from DB");
            return;
        }
        for (let task of tasks) {
            let currentTask = {
                task_name: task.taskName,
                due_date: dateParser(task.dueDate),
                category: task.category,
                id: task._id
            }
            tasks_arr.push(currentTask);
        }
        return response.render("home", locals);
    });
}


module.exports.addTask = function (request, response) {

    Task.create({
        taskName: request.body.task_name,
        dueDate: request.body.due_date,
        category: request.body.category
    }, function (error, newTask) {
        if (error) {
            console.log("Error in creating a new task in the DB", error);
        }
        else {
            console.log("created new task in the DB");
            return response.redirect("back");
        }
    });
}

module.exports.deleteTasks = function (request, response) {
    // create ids array to delete multiple items based on id
    let ids = [];
    for (let task of request.body.data) {
        ids.push(task.id);
    }

    // delete multiple items
    Task.deleteMany({ _id: { $in: ids } }, function (error, result) {
        if (error) {
            console.log("Failed to delete the records from the DB");
        }
        else {
            console.log(result);
        }
    });
    return response.redirect("back");
}