function addListItem(taskObj) {
    let string = `<li class="task-list-element" id=${taskObj.id}>
                <div class="details">
                <label class="task-item-label" for=task-${taskObj.id}><input type="checkbox" class="task-item" name="content"
                id=task-${taskObj.id}>${taskObj.task_name}<br><i class="far fa-calendar-alt"></i>${taskObj.due_date}</label>
                </div></li>`;
    console.log(string);

    $("#incomplete-tasks").append(string);
}

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
        console.log(responseData);
        addListItem(responseData);
    });
}

function deleteTasks() {

    console.log("inside");
    let labelList = $(".task-item-label");
    let tasksArr = prepareTaskList(labelList);

    $.post("/delete-tasks", { "data": tasksArr }, function (responseData) {
        removeElements(labelList);
    });
}

function prepareTaskList(labelList) {
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

function removeElements(labelList) {
    for (let label of labelList) {
        let query = `#${label.htmlFor}`;
        if ($(query)[0].checked) {
            $(label).remove();
        }
    }
}

$("#add-task").click(addTask);
$("#delete-tasks").click(deleteTasks);