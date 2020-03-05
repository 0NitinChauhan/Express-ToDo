function deleteTasks() {

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
            console.log(id);
            console.log(textContent);
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

$("#delete-tasks").click(deleteTasks);