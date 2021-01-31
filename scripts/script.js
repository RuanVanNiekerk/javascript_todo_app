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
//array of all entries
const objList = []

//creates new entry by saving as object and refreshing the todo list
function saveObj() {
    event.preventDefault();

    let taskName = document.getElementById("taskName").value;
    let taskDesc = document.getElementById("taskDesc").value;
    let taskDate = document.getElementById("taskDate").value;

    let obj = new formEntry(taskName, taskDesc, taskDate);

    objList.push(obj);
    let table = document.getElementById("todoList");
    table.innerHTML = "";

    for (let i = 0; i < objList.length; i++) {
        
        let row = table.insertRow(0);
        row.setAttribute("id", i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        //create completed tickbox
        let tick = document.createElement("input");
        tick.setAttribute("type", "checkbox");
        tick.setAttribute("onchange", "strikeTick(this)");

        //create delete Button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.setAttribute("onclick", "deleteEntry(this)");

        //add content to page
        cell1.appendChild(tick);
        cell2.innerHTML = objList[i].task_date;
        cell3.innerHTML = objList[i].task_name;
        cell4.innerHTML = objList[i].task_desc;
        cell5.appendChild(deleteBtn)
    }
}

//function to delete entry
function deleteEntry(e) {
    console.log(e);
    let idD = e.parentNode.parentNode.getAttribute("id");
    console.log(idD);
    document.getElementById(idD).remove();
    objList.splice(idD, 1);
}

//function to strike entry
function strikeTick(e) {
    console.log(e);
    let idT = e.parentNode.parentNode.getAttribute("id");                                                   //sort strike out
    console.log(idT);
    let cellTick1 = document.getElementById(idT).cells[1].innerHTML;
    let cellTick2 = document.getElementById(idT).cells[2].innerHTML;
    let cellTick3 = document.getElementById(idT).cells[3].innerHTML;
    if (e.checked == 1) {
        document.getElementById(idT).cells[1].innerHTML = "<s>" + cellTick1 + "</s>";
        document.getElementById(idT).cells[2].innerHTML = "<s>" + cellTick2 + "</s>";
        document.getElementById(idT).cells[3].innerHTML = "<s>" + cellTick3 + "</s>";
    } else {
        document.getElementById(idT).cells[1].innerHTML = cellTick1.slice(3, cellTick1.length - 4);
        document.getElementById(idT).cells[2].innerHTML = cellTick2.slice(3, cellTick1.length - 4);
        document.getElementById(idT).cells[3].innerHTML = cellTick3.slice(3, cellTick1.length - 4);
    }
}