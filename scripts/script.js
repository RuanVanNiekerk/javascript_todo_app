//JavaScript source code
let currentEntry;

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
    static fillTable() {
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
            tick.setAttribute("onchange", "formEntry.strikeTick(this)");

            //create Edit Button
            let editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.setAttribute("onclick", "formEntry.editEntry(this)");

            //create delete Button
            let deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.setAttribute("onclick", "formEntry.deleteEntry(this)");

            //add content to page
            cell1.appendChild(tick);
            cell2.innerHTML = objList[i].task_date;
            cell3.innerHTML = objList[i].task_name;
            cell4.innerHTML = objList[i].task_desc;
            cell5.appendChild(editBtn)
            cell5.appendChild(deleteBtn)
        };
    };

    //method to edit entry
    static editEntry(e) {
        let idE = e.parentNode.parentNode.getAttribute("id");

        document.getElementById("popupForm").style.display = "block";
        document.getElementById("edit").style.display = "initial";
        document.getElementById("create").style.display = "none";

        document.getElementById("taskName").value = objList[idE].task_name;
        document.getElementById("taskDesc").value = objList[idE].task_desc;
        document.getElementById("taskDate").value = objList[idE].task_date;

        currentEntry = idE;
    }

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

    static replaceEntry() {
        objList[currentEntry].task_name = document.getElementById("taskName").value;
        objList[currentEntry].task_desc = document.getElementById("taskDesc").value;
        objList[currentEntry].task_date = document.getElementById("taskDate").value;

        data = JSON.stringify(objList);
        localStorage.setItem("Data", data);

        document.getElementById("edit").style.display = "none";
        document.getElementById("create").style.display = "initial";

        this.fillTable();

        document.getElementById("popupForm").style.display = "none";
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

    //Method that sorts list in ascending order
    static ascending(objList, data, table) {
        console.log(objList);
        objList.sort((a, b) => {
            let fa = a.task_name.toLowerCase(),
                fb = b.task_name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        data = JSON.stringify(objList);
        localStorage.setItem("Data", data);
        objList = JSON.parse(localStorage.getItem("Data"));

        table = document.getElementById("todoList");
        table.innerHTML = "";

        this.fillTable(objList, table);

    };

    //Method that sorts list in descending order
    static descending(objList, data, table) {
        console.log(objList);
        objList.sort((a, b) => {
            let fa = a.task_name.toLowerCase(),
                fb = b.task_name.toLowerCase();

            if (fa < fb) {
                return 1;
            }
            if (fa > fb) {
                return -1;
            }
            return 0;
        });
        data = JSON.stringify(objList);
        localStorage.setItem("Data", data);
        objList = JSON.parse(localStorage.getItem("Data"));

        table = document.getElementById("todoList");
        table.innerHTML = "";

        this.fillTable(objList, table);

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

formEntry.fillTable();

//function that creates object and calls addObj method 
function saveObj() {
    event.preventDefault();

    let taskName = document.getElementById("taskName").value;
    let taskDesc = document.getElementById("taskDesc").value;
    let taskDate = document.getElementById("taskDate").value;

    let obj = new formEntry(taskName, taskDesc, taskDate);

    formEntry.addObj(obj, objList, data);

    document.getElementById("popupForm").style.display = "none";
}