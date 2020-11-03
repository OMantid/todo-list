//Get buttons
let saveBtn = document.getElementById('save-btn');
let cancelBtn = document.getElementById('cancel-btn');
let menuBtn = document.getElementById('menu-btn');
let addBtn = document.getElementById('add-btn');

//Get drop down menu windown
let menu = document.getElementById('menu');

//Get modal window and input field
let modal = document.getElementById('myModal'); 
let inputField = document.getElementById('list-name');

// Get containers 
let header = document.getElementById('head-container');
let main = document.getElementById('main-container');
let menuList = document.getElementById('menu');

//Get input field wihtin main and ordered list
let taskList = document.querySelector('ol');
let taskInput = document.querySelector('input');

//Menu animation
//See how this differs from the Save list function below
menuBtn.addEventListener('click', function(){
    saveBtn.disabled = true;
    menuList.className = 'Menu ModalOpen';
    header.className = 'is-blurred';
    main.className = 'is-blurred';
});

//Save list name pop up
//Ask why focus() doesn't work outside of setTimeout, yet works when within it
saveBtn.onclick = function() {
    listName = document.getElementById('list-name');
    modal.className = 'is-visuallyHidden';
    setTimeout(function() {
        listName.focus();
        header.className = 'is-blurred';
        main.className = 'is-blurred';
        modal.className = 'Modal';
    }, 80)
};

//Cancel Save List
cancelBtn.onclick = function() {
    modal.className = 'Modal is-hidden is-visuallyHidden';
    inputField.value = '';
    header.classList.remove('is-blurred');
    main.classList.remove('is-blurred');
};

//If clicked outside of window, close it
//Fix the issue with not being able ot truly click anywhere
window.onclick = function(event) {
    if (event.target == header || event.target == main) {
        saveBtn.disabled = false;
        menuList.className = 'Menu is-hidden';
        header.className = '';
        main.className = '';
    }
};

//Add task to current list
/*
    Ask why let taskInputValue = document.querySelector('input').value
    followed by: newTask.appendChild(document.createTextNode(taskInputValue)); and
    taskInputValue = '' doesn't work when the button is clicked
*/
addBtn.addEventListener('click', function() {
    let newTask = document.createElement('li');

    newTask.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(newTask);
    taskInput.value = '';
});