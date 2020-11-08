//Get buttons
let saveBtn = document.getElementById('save-btn');
let saveListBtn = document.getElementById('save-listName');
let cancelBtn = document.getElementById('cancel-btn');
let deleteBtn = document.getElementById('delete-list-item');
let menuBtn = document.getElementById('menu-btn');
let addBtn = document.getElementById('add-btn');
let deleteListBtn = document.getElementById('delete-list');
let editBtn = document.getElementById('edit-btn');

//Get drop down menu window
let menu = document.getElementById('menu');

//Get modal window and input field
//Get list item
let modal = document.getElementById('myModal'); 
let inputField = document.getElementById('list-name');

// Get containers
let header = document.getElementById('head-container');
let main = document.getElementById('main-container');
let menuList = document.getElementById('menu');
let myListMenu = document.getElementById('myList-menu');

//Get input field within main and ordered list
let taskItem = document.getElementById('text-input');
let taskList = document.querySelector('ol');
let taskInput = document.querySelector('input');

//Menu animation
//See how this differs from the Save list function below
menuBtn.addEventListener('click', function(){
    saveBtn.disabled = true;
    // Originally was menuList.className = 'Menu ModalOpen';
    menuList.className = 'Menu';
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

//Save task list
saveListBtn.addEventListener('click', function() {
    let listItems = document.querySelectorAll('li');

    let arr = [];

    listItems.forEach( temp => arr.push(temp.textContent));
    //Stores Nodelist as a key value pair in local storage
    localStorage.setItem(inputField.value, JSON.stringify(arr));

    //Add inputField.value name to drop down menu list and append
    let savedListName = document.createElement('li');
    savedListName.appendChild(document.createTextNode(inputField.value));
    myListMenu.appendChild(savedListName);

    modal.className = 'Modal is-hidden is-visuallyHidden';
    header.classList.remove('is-blurred');
    main.classList.remove('is-blurred');
    taskList.innerHTML = '';
    inputField.value = '';
});

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

//If Enter key is pushed add to task list
taskItem.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        addBtn.click();
        taskItem.focus();
    }
})

//Highlights list item to be deleted
taskList.addEventListener('click', function(e) {
    if (e.target.tagName != 'LI') return;
    
    e.target.classList.toggle('list-item-selector');
});

//Delete task item from list
deleteBtn.addEventListener('click', function() {
    let taskItems = document.querySelectorAll('ol li');

    for (let i = 0; i < taskItems.length; i++) {
        if (taskItems[i].classList.contains('list-item-selector')){
            taskItems[i].parentNode.removeChild(taskItems[i]);
        }
    };
});

/*
Create a single function for highlighting to be used with tasklist and this
*/
//Highlight List from My List window
myListMenu.addEventListener('click', function(e) {
    if (e.target.tagName != 'LI') return;

    e.target.classList.toggle('list-item-selector');
    // e.target.children.classList.toggle('is-visuallyHidden');
    // document.getElementById('list-deleteBtn').classList.toggle('is-visuallyHidden');
});

//Deletes list from My List drop down and local storage
deleteListBtn.addEventListener('click', function() {
    let listItems = myListMenu.children;

    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].classList.contains('list-item-selector')) {
            localStorage.removeItem(listItems[i].textContent);
            listItems[i].parentNode.removeChild(listItems[i]);
        }
    }
});

//Come back and fix
//Edits list from My List and populates main window with list items
//Be sure to figure out a way to manage multiple highlighted lists from throwing errors
editBtn.addEventListener('click', function() {
    let listItems = myListMenu.children;

    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].classList.contains('list-item-selector')) {
            let items = JSON.parse(localStorage.getItem(listItems[i].textContent));
            console.log(items);
            items.forEach(temp => addItemsList(temp));
            localStorage.removeItem(listItems[i].textContent);
        }
    }
    saveBtn.disabled = false;
    menu.className = 'Menu is-hidden';
    header.classList.remove('is-blurred');
    main.classList.remove('is-blurred');
});

function addItemsList(task) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    taskList.appendChild(li);
}