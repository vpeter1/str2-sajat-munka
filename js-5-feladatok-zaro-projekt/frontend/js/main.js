'use strict';

// Keys of users.
let keys = ["id", "name", "email", "address"]
let editLock = false;
let table = document.querySelector("#userTable");

// Get data from the server.
function getServerdata(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };
    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );
}

function startGetUsers() {
    getServerdata("http://localhost:3000/users").then(
        data => fillDataTable(data)
    );
}

document.querySelector("#getDataBtn").addEventListener("click", startGetUsers);

// Fill table with server data
function fillDataTable(data) {
    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';

    for (let row of data) {
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }

        let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);
        //tBody.appendChild(tr);
        tBody.insertAdjacentHTML('afterbegin', tr.innerHTML);
    }
}
// Create new user.
function createNewUser(btn) {
    let inputs = document.querySelectorAll("input");
    let data = {};
    data.id = 0;
    data.name = inputs[0].value;
    data.email = inputs[1].value;
    data.address = inputs[2].value;
    console.log(data);
    createUser(data);
}

function createUser(data) {
    console.log(data);
    //delete data.id;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(`http://localhost:3000/users`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        function () {
            return startGetUsers();
        }
    );
}

function getRowData(tr) {
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

function createBtnGroup() {
    let group = createAnyElement("div", { class: "btn btn-group" });
    let editBtn = createAnyElement("button", { class: "btn btn-warning", onclick: "editUser(this)", style: "margin: 0;", title: "Edit"});
    //editBtn.setAttribute("data-toggle","tooltip" );
    editBtn.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>'
    let delBtn = createAnyElement("button", { class: "btn btn-danger", onclick: "delRow(this)", style: "margin: 0;", title: "Delete"});

    delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'

    group.appendChild(editBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td", { style: "padding: 0;" });
    td.appendChild(group);
    return td;
}

function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function createBtnGroupEdit() {
    let group = createAnyElement("div", { class: "btn btn-group" });
    let refreshBtn = createAnyElement("button", { class: "btn btn-primary", onclick: "refreshUser(this)", style: "margin: 0;", title: "Save modified data"});
    refreshBtn.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>'
    let undoBtn = createAnyElement("button", { class: "btn btn-secondary", onclick: "undo(this)", style: "margin: 0;", title: "Cancel"});
    undoBtn.innerHTML = '<i class="fa fa-undo" aria-hidden="true"></i>'

    group.appendChild(refreshBtn);
    group.appendChild(undoBtn);

    let td = createAnyElement("td", { style: "padding: 0;" });
    td.appendChild(group);
    return td;
}

function editUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    console.log(id);
    let namePrev = tr.querySelector("td:nth-child(2)").innerHTML;
    let emailPrev = tr.querySelector("td:nth-child(3)").innerHTML;
    let addressPrev = tr.querySelector("td:nth-child(4)").innerHTML;
    console.log(namePrev, emailPrev, addressPrev);

    let disableButtons = document.querySelectorAll(".btn-group");
    disableButtons.forEach(item => item.style.display = "none");

    document.getElementById("getDataBtn").style.visibility = "hidden";
    document.getElementById("createUserBtn").style.visibility = "hidden";

    function editFields(items) {
        for (let i = 0; i < items.length; i++) {
            let input = createAnyElement("input", {
                class: "form-control",
                name: keys[i + 1],
                value: items[i]
            });
            let td = createAnyElement("td");
            td.appendChild(input);
            tr.replaceChild(td, tr.childNodes[i + 1])
        }
    }
    //let td = createAnyElement("td");
    let buttons = createBtnGroupEdit();
    //td.appendChild(buttons);
    tr.replaceChild(buttons, tr.childNodes[4])

    editFields([namePrev, emailPrev, addressPrev]);
    //editLock = true;
}

function undo(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    console.log(id);
    editLock = false;
    document.getElementById("getDataBtn").style.visibility = "visible";
    document.getElementById("createUserBtn").style.visibility = "visible";
    startGetUsers();

}
function refreshUser(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    let inputs = tr.querySelectorAll("input.form-control");
    let data = {}
    data.id = id;
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    console.log(data);
    if (nameCheck(data.name, inputs[0]) == false) return;
    if (emailCheck(data.email, inputs[1]) == false) return;
    if (addressCheck(data.address, inputs[2]) == false) return;

    //editLock = false;
    document.getElementById("getDataBtn").style.visibility = "visible";
    document.getElementById("createUserBtn").style.visibility = "visible";

    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(`http://localhost:3000/users/${data.id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        //alert('DATABASE UPDATED!')
        messageSuccess()
    ).then(
        function () {
            return startGetUsers();
        }
    );
}

function delRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;
    console.log(id);

    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };
    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(
        //alert('USER DELETED!')
        messageDelete()
    ).then(
        function () {
            return startGetUsers();
        }
     )
}

function messageSuccess() {
    document.getElementById("messageSuccess").style.visibility = "visible";
    setTimeout(() => {
        document.getElementById("messageSuccess").style.visibility = "hidden"
    }, 5000);
}
function messageValidation() {
    document.getElementById("messageValidation").style.visibility = "visible";
    setTimeout(() => {
        document.getElementById("messageValidation").style.visibility = "hidden"
    }, 5000);
}
function messageDelete() {
    document.getElementById("messageDelete").style.visibility = "visible";
    setTimeout(() => {
        document.getElementById("messageDelete").style.visibility = "hidden"
    }, 5000);
}

function nameCheck(text, nameError) {
    let condition = /^[A-Z][a-z]*\s\w*$/;
    nameError.style.color = "black";
    if (!text.match(condition)) {
        nameError.style.color = "red";
        nameError.value = "Invalid Name";
        messageValidation();
        return false;
    }
    return true;
}

function emailCheck(text, emailError) {
    let condition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.style.color = "black";
    if (!text.match(condition)) {
        emailError.style.color = "red";
        emailError.value = "Invalid Email Address";
        messageValidation();
        return false;
    }
    return true;
}

function addressCheck(text, addressError) {
    let condition = /^\d{1,5}\s[\w*\s]{0,50}/;
    addressError.style.color = "black";
    if (!text.match(condition)) {
        addressError.style.color = "red";
        addressError.value = "Invalid Address";
        messageValidation();
        return false;
    }
    return true;
}

