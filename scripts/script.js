/*// JavaScript source code
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

    static addObj() {
        let taskName = document.getElementById("taskName").value;
        let taskDesc = document.getElementById("taskDesc").value;
        let taskDate = document.getElementById("taskDate").value;

        let obj = new formEntry(taskName, taskDesc, taskDate);

        objList.push(obj);
        let table = document.getElementById("todoList");
        table.innerHTML = "";
    }
}

let objList;
let localList;
//makes sure Data is not null
if (localStorage.getItem("Data") == undefined) {
    objList = [];

    localList = JSON.stringify(objList);
    localStorage.setItem("Data", localList);
    objList = JSON.parse(localStorage.getItem("Data"));
};
}*/
//JavaScript source code
document.getElementById("addBtn").addEventListener("click", openForm);

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

class formEntry {
    constructor(_taskName, _taskDesc, _taskDate) {
        this.task_name = _taskName;
        this.task_desc = _taskDesc;
        this.task_date = _taskDate;
    };

    //method that adds obj to array
    static addObj(obj, objList, data) {
        console.log(obj);
        console.log(objList);
        objList.push(obj);

        //removes any null values from array and local storage when adding a new task
        for (let i = 0; i < objList.length; i++) {
            if (objList[i] == null) {
                objList.splice(i, 1);
                i--
            };
        };

        data = JSON.stringify(objList);
        localStorage.setItem("Data", data);
        objList = JSON.parse(localStorage.getItem("Data"));

        table = document.getElementById("todoList");
        table.innerHTML = "";

        this.fillTable(objList, table);
    };

    //method that fills in table on html
    static fillTable(objList, table) {
        
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
            tick.setAttribute("onchange", "formEntry.strikeTick(this)");

            //create delete Button
            let deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.setAttribute("onclick", "formEntry.deleteEntry(this)");

            //add content to page
            cell1.appendChild(tick);
            cell2.innerHTML = objList[i].task_date;
            cell3.innerHTML = objList[i].task_name;
            cell4.innerHTML = objList[i].task_desc;
            cell5.appendChild(deleteBtn)
        };
    };

    //method that deletes row and object in array
    static deleteEntry(e) {
        let idD = e.parentNode.parentNode.getAttribute("id");
        console.log(idD);
        document.getElementById(idD).remove();
        delete objList[idD];

        console.log(objList);

        data = JSON.stringify(objList);
        localStorage.setItem("Data", data);
    };

    //Method that trikes out content of row
    static strikeTick(e) {
        console.log(e);
        let idT = e.parentNode.parentNode.getAttribute("id");
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
    };
};

let objList = JSON.parse(localStorage.getItem("Data"));

if (objList == undefined || objList == null) {
    objList = [];
};

//removes any null values from array and local storage on page load
for (let i = 0; i < objList.length; i++) {
    if (objList[i] == null) {
        objList.splice(i, 1);
        i--
    };
};

let data = JSON.stringify(objList);
localStorage.setItem("Data", data);

let table = document.getElementById("todoList");
table.innerHTML = "";

formEntry.fillTable(objList, table);

//function that creates object and calls addObj method 
function saveObj() {
    event.preventDefault();

    let taskName = document.getElementById("taskName").value;
    let taskDesc = document.getElementById("taskDesc").value;
    let taskDate = document.getElementById("taskDate").value;

    let obj = new formEntry(taskName, taskDesc, taskDate);

    formEntry.addObj(obj, objList, data);
}