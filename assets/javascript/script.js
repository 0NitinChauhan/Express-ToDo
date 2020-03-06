/** to add item to the table  */
function addListItem(taskObj) {
    console.log(taskObj.category);
    let string = `<tr class="task-list-row"><td class="task-list-element" id=${taskObj.id}>
                <label class="task-item-label p-2" for=task-${taskObj.id}><input type="checkbox" class="task-item" name="content"
                id=task-${taskObj.id}>${taskObj.task_name} - (${taskObj.category})<br><br><i class="far fa-calendar-alt"></i>${taskObj.due_date}</label>
                </td></tr>`;

    $("#incomplete-tasks").append(string);
}

/** to clear input fields after hitting Add button*/
function clearFields() {
    $("#description").val("");
    $('#category').prop('selectedIndex', 0);
    $("input[type=date]").val("");
}

/** event handler for add button */
function addTask() {
    // get text
    let inputText = $("textarea#description").val().trim();
    let dueDate = $("#due-date").val();
    let category = $("#category").val();

    if (inputText.length == 0) {
        window.alert("Cannot add empty task");
        return;
    }
    $.post("/add-task", { "task_name": inputText, "due_date": dueDate, "category": category }, function (responseData) {
        addListItem(responseData);
        clearFields();
    });
}

/** event handler for delete button */
function deleteTasks() {

    let labelList = $(".task-item-label");
    let tasksArr = prepareTasksList(labelList);

    $.post("/delete-tasks", { "data": tasksArr }, function (responseData) {
        removeElements(labelList);
    });
}


/** helper function to prepare task list based on label */
function prepareTasksList(labelList) {
    let tasksArr = [];
    for (let label of labelList) {
        let query = `#${label.htmlFor}`;
        if ($(query)[0].checked) {
            let textContent = label.textContent;
            let id = $(query)[0].id.slice("text-".length);
            tasksArr.push({ "taskName": textContent, "id": id });
        }
    }
    return tasksArr;
}

/** helper function to remove HTML elements from the page */
function removeElements(labelList) {
    for (let label of labelList) {
        let query = `#${label.htmlFor}`;
        if ($(query)[0].checked) {
            $(label).closest(".task-list-row").remove();
        }
    }
}

$("#add-task").click(addTask);
$("#delete-tasks").click(deleteTasks);