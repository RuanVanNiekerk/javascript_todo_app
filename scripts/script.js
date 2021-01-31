// JavaScript source code
document.getElementById("addBtn").addEventListener("click", openForm);

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

class formEntry {
    constructor(taskName, taskDesc, taskDate) {
        this.task_name = taskName;
        this.task_desc = taskDesc;
        this.task_date = taskDate;
    }
}

const objList = []

//creates new entry by saving as object and refreshing the todo list
function saveObj() {
    event.preventDefault();
    console.log("test");

    let taskName = document.getElementById("taskName").value;
    let taskDesc = document.getElementById("taskDesc").value;
    let taskDate = document.getElementById("taskDate").value;

    let obj = new formEntry(taskName, taskDesc, taskDate);

    objList.push(obj);
    let table = document.getElementById("todoList");
    table.innerHTML = "";

    for (let i = 0; i < objList.length; i++) {
        
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        //create completed tickbox
        let tick = document.createElement("input");
        tick.setAttribute("type", "checkbox");

        cell1.innerHTML = tick;
        cell2.innerHTML = objList[i].task_date;
        cell3.innerHTML = objList[i].task_name;
        cell4.innerHTML = objList[i].task_desc;

    }
}