const mongoose = require("mongoose");

const schemaObj = {
    taskName: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: false
    },

    category: {
        type: String,
        required: false
    },


}
/** Create schema */
const taskSchema = new mongoose.Schema(schemaObj);

/** Compiling schema into a model */
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;